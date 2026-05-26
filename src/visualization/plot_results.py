"""
Utilidades de visualización para el pipeline ML.

Stub mínimo: el frontend ya consume tablas (parquet/csv) generadas por las
otras capas. Estos helpers se usan únicamente desde notebooks para QA del
modelo, no se invocan en el pipeline productivo.
"""
from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

from src.utils.paths import (
    AFORO_POR_SLOT_PARQUET,
    PREDICCIONES_AFORO_PARQUET,
)


def heatmap_aforo_real(path: Path = AFORO_POR_SLOT_PARQUET) -> None:
    """Heatmap de aforo real (dia × slot) — RF-03."""
    df = pd.read_parquet(path)
    pivot = df.pivot_table(index="dia", columns="slot", values="aforo", aggfunc="mean")
    plt.figure(figsize=(14, 4))
    sns.heatmap(pivot, cmap="YlOrRd", annot=True, fmt=".0f")
    plt.title("Aforo histórico promedio por día y slot")
    plt.tight_layout()
    plt.show()


def heatmap_aforo_predicho(path: Path = PREDICCIONES_AFORO_PARQUET) -> None:
    """Heatmap de aforo predicho (dia × slot) — RF-01."""
    df = pd.read_parquet(path)
    pivot = df.pivot_table(index="dia", columns="slot", values="aforo_predicho", aggfunc="mean")
    plt.figure(figsize=(14, 4))
    sns.heatmap(pivot, cmap="YlOrRd", annot=True, fmt=".0f")
    plt.title("Aforo predicho por día y slot")
    plt.tight_layout()
    plt.show()
