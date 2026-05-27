"""
FastAPI — backend de GYMTEC.

Sirve las predicciones de aforo (RF-01) y recomendaciones de horarios
(RF-02) que generó el pipeline ML en `data/processed/` y aplica los
modelos `.pkl` de `models_artifacts/` cuando hace falta scoring on-demand.

Endpoints:
  GET  /health
  GET  /predictions/today
  GET  /predictions
  GET  /low-occupancy
  POST /recommendations
  GET  /occupancy/heatmap
  GET  /occupancy/current
  GET  /admin/metrics

Para correrlo:
    pip install fastapi uvicorn
    uvicorn app.api.main:app --reload --port 8000
"""
from __future__ import annotations

import logging
from datetime import datetime
from typing import Literal

import pandas as pd
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.recommendation.recommend_schedule import (
    franjas_menor_aforo,
    recomendar_para_estudiante,
)
from src.utils.paths import (
    AFORO_POR_SLOT_PARQUET,
    PREDICCIONES_AFORO_PARQUET,
)

logger = logging.getLogger(__name__)

app = FastAPI(
    title="GYMTEC API",
    description="Predicción de aforo y recomendación de horarios para UTEC.",
    version="0.1.0",
)

# CORS para que las apps Next.js (admin-web, student-app) puedan llamar.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# -----------------------------------------------------------------------------
#  Helpers
# -----------------------------------------------------------------------------
DIA_EN_A_ES = {
    "Monday": "Lunes",
    "Tuesday": "Martes",
    "Wednesday": "Miércoles",
    "Thursday": "Jueves",
    "Friday": "Viernes",
    "Saturday": "Sábado",
    "Sunday": "Domingo",
}

DIAS_VALIDOS = {"Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"}


def _load_predicciones() -> pd.DataFrame:
    if not PREDICCIONES_AFORO_PARQUET.exists():
        raise HTTPException(
            status_code=503,
            detail="predicciones_aforo no disponible. Ejecutá `python -m src.run_pipeline`.",
        )
    return pd.read_parquet(PREDICCIONES_AFORO_PARQUET)


def _load_aforo() -> pd.DataFrame:
    if not AFORO_POR_SLOT_PARQUET.exists():
        raise HTTPException(
            status_code=503,
            detail="aforo_por_slot no disponible. Ejecutá `python -m src.run_pipeline`.",
        )
    return pd.read_parquet(AFORO_POR_SLOT_PARQUET)


def _df_to_records(df: pd.DataFrame) -> list[dict]:
    """Serializa DataFrame a JSON-friendly (datetimes → ISO)."""
    return df.to_dict(orient="records")


# -----------------------------------------------------------------------------
#  Models (request bodies)
# -----------------------------------------------------------------------------
class RecommendationsRequest(BaseModel):
    student_id: str
    cursos: list[str]
    top_n: int = 3


# -----------------------------------------------------------------------------
#  Endpoints
# -----------------------------------------------------------------------------
@app.get("/health")
def health() -> dict:
    """Liveness probe simple."""
    return {"status": "ok", "service": "gymtec-api", "version": "0.1.0"}


@app.get("/predictions/today")
def predictions_today() -> list[dict]:
    """
    Predicciones de aforo para el día actual (RF-01).
    Lee `data/processed/predicciones_aforo.parquet`.
    """
    df = _load_predicciones()
    today_en = datetime.now().strftime("%A")
    today_es = DIA_EN_A_ES.get(today_en, "Lunes")
    out = df[df["dia"] == today_es].copy()
    return _df_to_records(out)


@app.get("/predictions")
def predictions(
    dia: str | None = Query(default=None, description="Lunes, Martes, ..."),
) -> list[dict]:
    """
    Predicciones de aforo para todos los slots o un día específico (RF-01).
    """
    df = _load_predicciones()
    if dia:
        if dia not in DIAS_VALIDOS:
            raise HTTPException(
                status_code=400,
                detail=f"`dia` debe ser uno de {sorted(DIAS_VALIDOS)}",
            )
        df = df[df["dia"] == dia]
    return _df_to_records(df)


@app.get("/low-occupancy")
def low_occupancy(
    dia: str = Query(..., description="Día de la semana"),
    top: int = Query(default=5, ge=1, le=20),
) -> list[dict]:
    """
    Top N franjas con menor aforo predicho para un día (RF-04).
    """
    if dia not in DIAS_VALIDOS:
        raise HTTPException(
            status_code=400,
            detail=f"`dia` debe ser uno de {sorted(DIAS_VALIDOS)}",
        )
    df = franjas_menor_aforo(dia, top_n=top)
    return _df_to_records(df)


@app.post("/recommendations")
def recommendations(payload: RecommendationsRequest) -> list[dict]:
    """
    Recomendación personalizada (RF-02). Usa Modelo 2 (Ridge) para puntuar.

    Body:
        { "student_id": "20224D5F8",
          "cursos": ["CS2023_2", "HH1011_5"],
          "top_n": 3 }
    """
    df = recomendar_para_estudiante(
        student_id=payload.student_id,
        cursos_estudiante=payload.cursos,
        top_n=payload.top_n,
    )
    return _df_to_records(df)


@app.get("/occupancy/heatmap")
def occupancy_heatmap() -> dict:
    """
    Matriz día × slot del aforo histórico real (RF-03).
    Listo para alimentar el AdminHeatmap del admin-web.
    """
    df = _load_aforo()
    pivot = (
        df.pivot_table(
            index="dia", columns="slot", values="ratio_ocupacion", aggfunc="mean"
        )
        .fillna(0)
    )
    return {
        "dias": pivot.index.tolist(),
        "slots": pivot.columns.tolist(),
        "matriz": pivot.round(3).values.tolist(),
    }


@app.get("/occupancy/current")
def occupancy_current() -> dict:
    """
    Aforo del último slot histórico registrado.
    Para el HomeScreen del student-app.
    """
    df = _load_aforo()
    last = df.sort_values(["fecha", "hora_dec"]).iloc[-1]
    return {
        "fecha": last["fecha"].isoformat() if hasattr(last["fecha"], "isoformat") else str(last["fecha"]),
        "dia": last["dia"],
        "slot": last["slot"],
        "aforo": int(last["aforo"]),
        "aforo_max": int(last["aforo_max"]),
        "ratio_ocupacion": float(last["ratio_ocupacion"]),
        "nivel_ocupacion": last["nivel_ocupacion"],
    }


@app.get("/admin/metrics")
def admin_metrics() -> list[dict]:
    """
    Métricas resumidas para el panel admin: aforo actual, próxima hora,
    nivel general del día.
    """
    pred = _load_predicciones()
    today_en = datetime.now().strftime("%A")
    today_es = DIA_EN_A_ES.get(today_en, "Lunes")
    hoy = pred[pred["dia"] == today_es]
    if hoy.empty:
        return []

    hora_actual = datetime.now().hour
    proximas = hoy[hoy["hora_dec"] >= hora_actual].head(2)
    valor_proximo = (
        int(proximas["aforo_predicho"].iloc[0]) if len(proximas) else 0
    )
    nivel_proximo = (
        proximas["nivel_ocupacion"].iloc[0] if len(proximas) else "desconocido"
    )

    return [
        {
            "label": "AFORO ACTUAL EN SALA",
            "value": f"{valor_proximo} / {int(hoy['aforo_max'].iloc[0])}",
            "accent": "cyan" if nivel_proximo in {"bajo", "medio"} else "yellow",
        },
        {
            "label": "PRÓXIMA HORA (PREDICHO)",
            "value": str(int(proximas["aforo_predicho"].mean()) if len(proximas) else 0),
            "accent": "cyan",
        },
        {
            "label": "NIVEL GENERAL HOY",
            "value": hoy["nivel_ocupacion"].mode().iloc[0],
            "accent": "yellow",
        },
    ]
