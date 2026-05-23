# GYMTEC

GYMTEC es un producto de datos orientado a la **predicción y visualización del aforo del gimnasio de UTEC**, junto con un módulo de **recomendación personalizada de horarios de asistencia**.

El proyecto busca ayudar a los estudiantes a tomar mejores decisiones sobre cuándo asistir al gimnasio, evitando horarios saturados y aprovechando mejor los espacios disponibles.

---

## Objetivo del proyecto

Construir un sistema que permita:

- Predecir el aforo del gimnasio por día y franja horaria.
- Visualizar patrones de uso del gimnasio.
- Recomendar horarios convenientes para los estudiantes.
- Integrar datos académicos, horarios y registros de asistencia.
- Apoyar la toma de decisiones para estudiantes y responsables del gimnasio.

---

## Problema

Actualmente, los estudiantes no siempre saben cuáles son los mejores horarios para asistir al gimnasio. Esto puede generar:

- Saturación en ciertos horarios.
- Baja asistencia en otros bloques disponibles.
- Mala distribución del uso de las instalaciones.
- Pérdida de tiempo para los estudiantes.
- Dificultad para planificar la capacidad del gimnasio.

GYMTEC propone una solución basada en datos para anticipar el aforo y recomendar horarios más convenientes.

---

## Solución propuesta

La solución se divide en dos funcionalidades principales:

### RF-01: Predicción y visualización del aforo del gimnasio

El sistema debe permitir visualizar y predecir el aforo del gimnasio según día, hora y variables relevantes como carga académica, disponibilidad estudiantil y modalidad de clases.

### RF-02: Recomendación personalizada de horarios de asistencia

El sistema debe recomendar horarios convenientes para asistir al gimnasio considerando disponibilidad, aforo estimado y preferencias del usuario.

---

## Estructura del repositorio

```text
GYMTEC/
├── data/
│   ├── raw/              # Datos originales sin modificar
│   ├── interim/          # Datos intermedios luego de primeras transformaciones
│   ├── processed/        # Datos finales listos para modelado
│   └── external/         # Datos externos o complementarios
│
├── notebooks/
│   ├── eda/              # Análisis exploratorio de datos
│   ├── modeling/         # Entrenamiento y evaluación de modelos
│   └── recommendation/   # Experimentos del sistema de recomendación
│
├── src/
│   ├── data/             # Scripts de carga, limpieza y validación
│   ├── features/         # Feature engineering
│   ├── models/           # Entrenamiento, predicción y evaluación
│   ├── recommendation/   # Lógica del recomendador de horarios
│   ├── visualization/    # Gráficos y visualizaciones
│   └── utils/            # Funciones auxiliares
│
├── app/
│   ├── frontend/         # Interfaz de usuario
│   ├── backend/          # Backend del sistema
│   └── api/              # Endpoints o servicios
│
├── dashboard/            # Dashboard o prototipo visual
├── docs/                 # Documentación del proyecto
├── reports/              # Figuras, reportes y slides
├── tests/                # Pruebas del proyecto
├── config/               # Archivos de configuración
└── assets/               # Logos, imágenes y recursos visuales
```

---

## Equipo

### Mish

Responsable de liderazgo, integración, planificación, revisión de calidad y coordinación general del prototipo.

Tareas principales:

- Organizar el repositorio.
- Coordinar el avance del equipo.
- Integrar los módulos del proyecto.
- Revisar calidad del prototipo.
- Asegurar coherencia entre datos, modelo, dashboard y documentación.

### Fátima

Responsable de UX/UI, wireframes, diseño visual, experiencia de usuario y comunicación gráfica.

Tareas principales:

- Diseñar wireframes.
- Proponer flujo de usuario.
- Definir estilo visual de la aplicación.
- Apoyar en la presentación del producto.
- Mejorar la comunicación visual del dashboard o prototipo.

### Bihonda

Responsable del análisis de datos, selección de modelo, entrenamiento, evaluación y soporte del sistema predictivo.

Tareas principales:

- Preparar datos para el modelo.
- Entrenar modelos predictivos.
- Evaluar métricas de desempeño.
- Analizar importancia de variables.
- Apoyar en el módulo de recomendación.

---

## Pipeline general

El flujo propuesto del proyecto es:

1. Ingesta de datos desde archivos CSV o Excel.
2. Limpieza y validación de datos.
3. Transformación de horarios en bloques de tiempo.
4. Feature engineering.
5. Entrenamiento del modelo predictivo.
6. Evaluación del modelo.
7. Generación de predicciones.
8. Visualización en dashboard o aplicación.
9. Recomendación personalizada de horarios.
10. Documentación y presentación del producto.

---

## Datos esperados

El proyecto puede trabajar con fuentes como:

- Horarios académicos.
- Cantidad de matriculados por curso.
- Modalidad de clase.
- Día y hora de clase.
- Registros históricos de asistencia al gimnasio, si están disponibles.
- Logs o archivos CSV provenientes de una carpeta compartida.

---

## Variables relevantes

Algunas variables que pueden utilizarse para el modelo son:

- Día de la semana.
- Hora de inicio.
- Bloque horario.
- Cantidad de estudiantes en clases presenciales.
- Cantidad de estudiantes en clases virtuales.
- Ratio de estudiantes libres.
- Carga académica.
- Modalidad predominante.
- Aforo histórico del gimnasio.
- Aforo estimado para el siguiente bloque horario.

---

## Tecnologías sugeridas

### Análisis y modelado

- Python
- pandas
- numpy
- scikit-learn
- matplotlib
- seaborn
- plotly
- Jupyter Notebook

### Dashboard o prototipo

- Streamlit
- Power BI
- React
- Vercel

### Automatización e integración

- Power Automate
- Google Drive
- CSV / Excel
- APIs

### Control de versiones

- Git
- GitHub
- GitHub Projects
- GitHub Issues

---

## Instalación del proyecto

Clonar el repositorio:

```bash
git clone https://github.com/usuario/nombre-repo.git
```

Entrar al proyecto:

```bash
cd nombre-repo
```

Crear entorno virtual:

```bash
python -m venv .venv
```

Activar entorno virtual en Windows:

```bash
source .venv/Scripts/activate
```

Activar entorno virtual en Mac/Linux:

```bash
source .venv/bin/activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

---

## Flujo de trabajo con Git

Crear una nueva rama:

```bash
git checkout -b nombre-de-la-rama
```

Ver cambios:

```bash
git status
```

Agregar cambios:

```bash
git add .
```

Crear commit:

```bash
git commit -m "mensaje claro del cambio"
```

Subir cambios:

```bash
git push -u origin nombre-de-la-rama
```

---

## Convención de ramas

Se recomienda usar nombres claros:

```text
chore/project-structure
feature/data-cleaning
feature/model-training
feature/recommendation-system
feature/dashboard
docs/update-readme
fix/data-validation
```

---

## Convención de commits

Se recomienda usar mensajes como:

```text
chore: create initial project structure
docs: update project documentation
feat: add data cleaning script
feat: train baseline model
feat: add schedule recommendation logic
fix: correct feature engineering calculation
test: add pipeline tests
```

---

## Estado del proyecto

Actualmente el proyecto se encuentra en fase de organización inicial del repositorio, definición del pipeline y preparación del prototipo.

---

## Próximos pasos

- Organizar el repositorio en GitHub.
- Subir la estructura base del proyecto.
- Documentar requerimientos funcionales y no funcionales.
- Preparar el pipeline de datos.
- Definir el flujo de predicción de aforo.
- Diseñar el módulo de recomendación personalizada.
- Integrar el dashboard o prototipo visual.
- Preparar la presentación final del producto.

---

## Licencia

Este proyecto fue desarrollado con fines académicos para el curso de Data Product Development.
