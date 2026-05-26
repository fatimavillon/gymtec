"""
Orquestador end-to-end del pipeline ML de GYMTEC (branch feature/ml).

Ejecuta secuencialmente:
  1. Limpieza (BRONZE -> SILVER)
       data/raw/log_gym.xlsx        -> data/interim/logs_limpios.parquet
       data/raw/horarios_clases.xlsx -> data/interim/horarios_limpios.parquet

  2. Feature engineering (SILVER -> GOLD)
       horarios_expandido_slots.parquet
       aforo_por_slot.parquet
       features_aforo_rf01.parquet

  3. Modelo baseline RF-01
       models_artifacts/rf01_aforo_baseline.joblib
       models_artifacts/rf01_aforo_metrics.json

  4. Predicciones GOLD
       data/processed/predicciones_aforo.parquet (+ csv)

  5. Recomendaciones (RF-02 demo)
       data/processed/recomendaciones_horario.parquet (+ csv)

Uso:
    python -m src.run_pipeline
"""
from __future__ import annotations

import logging

from src.data.clean_data import clean_horarios, clean_logs_gym
from src.features.build_features import (
    construir_aforo_por_slot,
    construir_features_aforo_rf01,
    expandir_horarios_a_slots,
)
from src.models.predict_model import generar_predicciones
from src.models.train_model import train_baseline
from src.recommendation.recommend_schedule import generar_recomendaciones


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )
    log = logging.getLogger("gymtec.pipeline")

    log.info("[1/5] Limpieza SILVER")
    clean_horarios()
    clean_logs_gym()

    log.info("[2/5] Feature engineering GOLD")
    expandir_horarios_a_slots()
    construir_aforo_por_slot()
    construir_features_aforo_rf01()

    log.info("[3/5] Entrenamiento baseline RF-01")
    metrics = train_baseline()
    log.info("Métricas: MAE=%.2f RMSE=%.2f R2=%.3f", metrics.mae, metrics.rmse, metrics.r2)

    log.info("[4/5] Generación de predicciones")
    generar_predicciones()

    log.info("[5/5] Recomendaciones demo (RF-02)")
    generar_recomendaciones()

    log.info("Pipeline finalizado.")


if __name__ == "__main__":
    main()
