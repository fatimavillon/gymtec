# GYMTEC — Contrato de consumo de los outputs ML

Esta guía describe **cómo el backend (`app/api/`) y los frontends
(`apps/student-app`, `apps/admin-web`) consumen las tablas generadas por
el pipeline `feature/ml`**.

> Todos los archivos viven en `data/processed/` (parquet) y, para los
> que el frontend va a consumir, también en `csv`.

## Mapa rápido: qué necesita cada pantalla

| Pantalla / requerimiento | Tabla fuente | Funciones helper |
|---|---|---|
| `student-app/HomeScreen` aforo actual + predicción de hoy | `predicciones_aforo` | — |
| `student-app/PredictionScreen` curva diaria | `predicciones_aforo` | — |
| `student-app/OptimizeScreen` recomendación personalizada | `predicciones_aforo` + `horarios_expandido_slots` | `recomendar_para_estudiante` |
| `student-app/ResultsScreen` ranking de horarios | `predicciones_aforo` | `franjas_menor_aforo` |
| `admin-web/AdminDashboardScreen` heatmap semanal | `aforo_por_slot` (real) o `predicciones_aforo` (predicho) | — |
| `admin-web/AdminDemandBalanceScreen` baseline vs ajustado | `aforo_por_slot` + `predicciones_aforo` | — |

---

## 1. `predicciones_aforo` — RF-01 / RF-04 / RF-06

Aforo predicho para cada (día, slot) sobre el horario operativo del gym.

**Archivos**

- `data/processed/predicciones_aforo.parquet` (binario, rápido)
- `data/processed/predicciones_aforo.csv` (texto, abrible en Excel)

**Esquema**

| Columna | Tipo | Descripción |
|---|---|---|
| `fecha` | datetime | Fecha de referencia de la predicción (por default, hoy). |
| `dia` | string | Lunes, Martes, ..., Sábado. |
| `dia_num` | int | 0=Lunes ... 5=Sábado. |
| `slot` | string | `HH:MM` inicio del bloque de 30 min. |
| `hora_dec` | float | Hora decimal (`13:30 -> 13.5`). |
| `aforo_predicho` | int | Personas esperadas en ese slot, en `[0, aforo_max]`. |
| `aforo_max` | int | Capacidad máxima (default 50). |
| `ratio_ocupacion_predicho` | float | `aforo_predicho / aforo_max`. |
| `nivel_ocupacion` | string | `bajo` ≤0.50, `medio` ≤0.75, `alto` ≤0.90, `critico` >0.90. |
| `timestamp_generacion` | datetime | Cuándo se generó la predicción. |

**Ejemplo**

```text
fecha       dia    dia_num slot  hora_dec aforo_predicho aforo_max ratio nivel
2026-05-25  Lunes  0       09:00 9.0      3              50        0.06  bajo
2026-05-25  Lunes  0       12:30 12.5     25             50        0.50  bajo
2026-05-25  Martes 1       13:00 13.0     33             50        0.66  medio
```

**Cómo lo consume el backend (FastAPI sugerido)**

```python
# app/api/main.py (esqueleto sugerido para Mish)
from fastapi import FastAPI, Query
import pandas as pd
from src.utils.paths import PREDICCIONES_AFORO_PARQUET

app = FastAPI()

def _load():
    return pd.read_parquet(PREDICCIONES_AFORO_PARQUET)

@app.get("/predictions")
def get_predictions(dia: str | None = None):
    df = _load()
    if dia:
        df = df[df["dia"] == dia]
    return df.to_dict(orient="records")

@app.get("/predictions/today")
def get_today():
    df = _load()
    today = pd.Timestamp.utcnow().day_name()
    map_es = {"Monday":"Lunes","Tuesday":"Martes","Wednesday":"Miércoles",
              "Thursday":"Jueves","Friday":"Viernes","Saturday":"Sábado"}
    return df[df["dia"] == map_es.get(today, "Lunes")].to_dict(orient="records")
```

**Cómo lo consume el frontend (`student-app/services/gymtec-api.ts`)**

```ts
// Reemplaza el mock actual de getTodayPrediction
export async function getTodayPrediction(): Promise<PredictionPoint[]> {
  const res = await fetch("/api/predictions/today")
  const rows = await res.json()
  return rows.map((r: any) => ({
    time: r.slot,
    occupancy: Math.round(r.ratio_ocupacion_predicho * 100), // 0..100
  }))
}
```

---

## 2. `recomendaciones_horario` — RF-02

Top N horarios recomendados por estudiante. Se puede generar de dos formas:

1. **Batch**: leer `data/processed/recomendaciones_horario.parquet` (lo que
   `run_pipeline` deja precomputado para uno o varios estudiantes).
2. **On-demand**: llamar `recomendar_para_estudiante()` cada vez que el
   estudiante pide recomendación. Es lo correcto en producción porque sus
   cursos son distintos.

**Archivos batch**

- `data/processed/recomendaciones_horario.parquet`
- `data/processed/recomendaciones_horario.csv`

**Esquema**

| Columna | Tipo | Descripción |
|---|---|---|
| `student_id` | string | Código del estudiante. |
| `fecha` | datetime | Fecha objetivo de la recomendación. |
| `dia` | string | Día sugerido. |
| `slot` | string | Horario sugerido (`HH:MM`). |
| `aforo_predicho` | int | Aforo esperado en ese slot. |
| `ratio_ocupacion_predicho` | float | Ratio 0..1+. |
| `nivel_ocupacion` | string | `bajo / medio / alto / critico`. |
| `ranking_recomendacion` | int | 1 = mejor opción, 2 = segunda, 3 = tercera. |
| `razon_recomendacion` | string | Texto explicable para mostrar al usuario. |

**Endpoint sugerido (on-demand)**

```python
# app/api/main.py
from src.recommendation.recommend_schedule import recomendar_para_estudiante

@app.post("/recommendations")
def post_recommendations(payload: dict):
    """
    body: { "student_id": "20224D5F8", "cursos": ["CS2023_2","HH1011_5"], "top_n": 3 }
    """
    df = recomendar_para_estudiante(
        student_id=payload["student_id"],
        cursos_estudiante=payload["cursos"],
        top_n=payload.get("top_n", 3),
    )
    return df.to_dict(orient="records")
```

**Frontend (`OptimizeScreen`)**

```ts
const res = await fetch("/api/recommendations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    student_id: user.code,
    cursos: user.clases,           // ["CS2023_2", "HH1011_5", ...]
    top_n: 3,
  }),
})
const recos = await res.json()
// recos[0].dia, recos[0].slot, recos[0].razon_recomendacion, ...
```

---

## 3. `aforo_por_slot` — RF-03

Serie temporal de aforo histórico real por (fecha, slot). Útil para el
heatmap del admin y para alimentar visualizaciones de tendencias.

**Archivo**: `data/processed/aforo_por_slot.parquet`

**Esquema**

| Columna | Tipo | Descripción |
|---|---|---|
| `fecha` | datetime | Día calendario. |
| `dia` | string | Día de la semana. |
| `dia_num` | int | 0..6. |
| `slot` | string | `HH:MM`. |
| `hora_dec` | float | Hora decimal. |
| `aforo` | int | Pico de personas en ese slot ese día. |
| `aforo_max` | int | Capacidad máxima. |
| `ratio_ocupacion` | float | `aforo / aforo_max`. |
| `nivel_ocupacion` | string | `bajo / medio / alto / critico`. |

**Endpoint sugerido**

```python
@app.get("/occupancy/heatmap")
def get_heatmap():
    df = pd.read_parquet(AFORO_POR_SLOT_PARQUET)
    pivot = df.pivot_table(
        index="dia", columns="slot", values="ratio_ocupacion", aggfunc="mean",
    )
    return {
        "dias": pivot.index.tolist(),
        "slots": pivot.columns.tolist(),
        "matriz": pivot.fillna(0).round(2).values.tolist(),
    }
```

**Admin frontend** (`AdminHeatmap`) ya está preparado para recibir una matriz
`{day, hour, level, percentage}`. Solo hay que mapear `ratio_ocupacion` a
`percentage = ratio*100` y `nivel_ocupacion` a `level`.

---

## 4. `features_aforo_rf01` — feature store (uso interno)

No se expone al frontend. Sirve para reentrenar el modelo o hacer análisis
exploratorio. El backend solo la usaría si decide reentrenar.

**Archivo**: `data/processed/features_aforo_rf01.parquet` (370 filas × 30 col).

---

## 5. Niveles y umbrales (RF-06)

Definidos en `src/utils/paths.py::NIVEL_THRESHOLDS`:

```python
"bajo":  ratio <= 0.50
"medio": ratio <= 0.75
"alto":  ratio <= 0.90
"critico": ratio > 0.90
```

Si Bienestar Universitario quiere ajustar los umbrales, es cambiar ese dict.
La función pública es `src.utils.helpers.clasificar_nivel(ratio)`.

---

## 6. Refrescar los datos (RF-07)

El pipeline es idempotente. Para actualizar predicciones con nuevos logs:

```bash
# 1. Reemplazar/actualizar data/raw/log_gym.xlsx con los nuevos registros
# 2. Reejecutar todo
python -m src.run_pipeline
```

Esto regenera `data/interim/`, `data/processed/` y `models_artifacts/`.
Sugerido: armar un cron job o hook de FastAPI para que corra cada noche.

---

## 7. Convenciones que el frontend ya usa

Cuidado al integrar:

- `student-app/types/gymtec.ts::OccupancyLevel` está como `"bajo" | "medio" | "alto"`.
  El backend devuelve también `"critico"` y `"desconocido"`. Hay que extender
  el tipo en `gymtec.ts` o mapear `critico -> alto` en el adaptador.
- Los slots en el frontend están como `"10:00 AM"` (formato 12h). El backend
  los devuelve como `"10:00"` (24h). El adaptador debe formatear.
- El campo `dia` viene en español (`"Miércoles"` con tilde). Asegurarse de
  mantener UTF-8 en el JSON de respuesta.

---

## 8. Checklist para integrar (Mish)

- [ ] Crear `app/api/main.py` con FastAPI y los 4 endpoints sugeridos.
- [ ] Agregar `fastapi` y `uvicorn` a `requirements.txt`.
- [ ] Reemplazar mocks en `apps/student-app/services/gymtec-api.ts` por
      llamadas `fetch("/api/...")`.
- [ ] Reemplazar mocks en `apps/admin-web/services/admin-api.ts`.
- [ ] Configurar `next.config.ts` con `rewrites` para que las apps Next.js
      proxyeen `/api/*` a `http://localhost:8000` (FastAPI).
- [ ] Cron / agent hook para correr `python -m src.run_pipeline` periódicamente.
