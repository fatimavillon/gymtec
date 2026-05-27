"""
Smoke test del pipeline ML.

No verifica calidad del modelo, solo que las piezas se cargan y los outputs
tienen las columnas esperadas. Útil para CI o pre-commit.
"""
from __future__ import annotations

import pandas as pd
import pytest

from src.utils import paths


REQUIRED_FEATURES_COLS = {
    "fecha", "dia", "dia_num", "slot", "hora_dec",
    "aforo", "aforo_max", "ratio_ocupacion", "nivel_ocupacion",
    "aforo_lag1", "aforo_lag2", "aforo_prom_hist", "aforo_max_hist",
    "hora_sin", "hora_cos", "dia_sin", "dia_cos", "es_finde",
    "es_dia_academico",
    "estudiantes_presencial", "estudiantes_libres",
    "ratio_libres", "carga_academica", "ratio_virtual",
    "n_secciones_activas", "modalidad_predominante",
}

REQUIRED_PREDICCIONES_COLS = {
    "fecha", "dia", "slot", "aforo_predicho", "aforo_max",
    "ratio_ocupacion_predicho", "nivel_ocupacion", "timestamp_generacion",
}

REQUIRED_RECOS_COLS = {
    "student_id", "fecha", "dia", "slot",
    "aforo_predicho", "ratio_ocupacion_predicho", "nivel_ocupacion",
    "score_recomendacion",
    "ranking_recomendacion", "razon_recomendacion",
}


def _require(p):
    if not p.exists():
        pytest.skip(f"{p} no existe; corre `python -m src.run_pipeline` primero.")


def test_features_aforo_rf01_schema():
    _require(paths.FEATURES_AFORO_PARQUET)
    df = pd.read_parquet(paths.FEATURES_AFORO_PARQUET)
    assert REQUIRED_FEATURES_COLS.issubset(df.columns)
    assert len(df) > 0
    assert df["nivel_ocupacion"].isin(
        {"bajo", "medio", "alto", "critico", "desconocido"}
    ).all()


def test_predicciones_aforo_schema():
    _require(paths.PREDICCIONES_AFORO_PARQUET)
    df = pd.read_parquet(paths.PREDICCIONES_AFORO_PARQUET)
    assert REQUIRED_PREDICCIONES_COLS.issubset(df.columns)
    assert (df["aforo_predicho"] >= 0).all()
    assert (df["aforo_predicho"] <= df["aforo_max"]).all()


def test_recomendaciones_top3():
    _require(paths.RECOMENDACIONES_PARQUET)
    df = pd.read_parquet(paths.RECOMENDACIONES_PARQUET)
    assert REQUIRED_RECOS_COLS.issubset(df.columns)
    if len(df) > 0:
        # El ranking máximo nunca debería superar 3 para el demo
        assert df.groupby("student_id")["ranking_recomendacion"].max().le(3).all()
