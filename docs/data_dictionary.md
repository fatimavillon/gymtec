# Diccionario de datos de GYMTEC

Este documento describe las variables utilizadas para el análisis, predicción de aforo y recomendación personalizada de horarios.

## Dataset de horarios académicos

| Variable | Tipo | Descripción |
|---|---|---|
| facultad | Texto | Facultad asociada al curso. |
| cod_curso | Texto | Código del curso. |
| nombre_curso | Texto | Nombre del curso. |
| seccion | Texto | Sección del curso. |
| modalidad | Texto | Modalidad de clase: presencial, virtual o híbrida. |
| dia | Texto | Día de la semana en que se dicta la clase. |
| hora_inicio | Hora | Hora de inicio de la clase. |
| hora_fin | Hora | Hora de término de la clase. |
| matriculados | Numérico | Cantidad de estudiantes matriculados en la sección. |

## Variables transformadas

| Variable | Tipo | Descripción |
|---|---|---|
| slot | Hora | Bloque horario generado a partir del intervalo de clase. |
| dia_num | Numérico | Día codificado numéricamente. Lunes = 0, Domingo = 6. |
| hora_dec | Numérico | Hora convertida a formato decimal. |
| estudiantes_presencial | Numérico | Cantidad estimada de estudiantes en clases presenciales durante un bloque. |
| estudiantes_virtual | Numérico | Cantidad estimada de estudiantes en clases virtuales durante un bloque. |
| estudiantes_libres | Numérico | Estudiantes potencialmente disponibles para asistir al gimnasio. |
| ratio_libres | Numérico | Proporción de estudiantes libres respecto a la población total. |
| carga_academica | Numérico | Proporción de estudiantes en clases presenciales respecto a la población total. |
| ratio_virtual | Numérico | Proporción de estudiantes en modalidad virtual respecto al total del bloque. |

## Variable objetivo

| Variable | Tipo | Descripción |
|---|---|---|
| aforo_gimnasio | Numérico | Cantidad de personas presentes en el gimnasio en un bloque horario determinado. |

## Variables para recomendación

| Variable | Tipo | Descripción |
|---|---|---|
| aforo_predicho | Numérico | Aforo estimado por el modelo. |
| disponibilidad_usuario | Categórico | Horarios en los que el usuario puede asistir. |
| preferencia_horaria | Categórico | Preferencia del usuario: mañana, tarde o noche. |
| score_recomendacion | Numérico | Puntaje calculado para ordenar los mejores horarios. |
