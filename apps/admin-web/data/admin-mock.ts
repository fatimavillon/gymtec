import type {
    AdminMetric,
    HeatmapCell,
    AccessLog,
    SystemAlert,
    DemandPoint,
    ImpactMetric,
    ContingencyAction,
} from "@/types/admin"
import { classifyOccupancy } from "@/lib/utils"

// Métricas en tiempo real
export const adminMetrics: AdminMetric[] = [
    {
        label: "AFORO ACTUAL EN SALA",
        value: "45 / 50",
        accent: "cyan",
    },
    {
        label: "RESERVAS PRÓXIMA HORA",
        value: "38",
        accent: "cyan",
    },
    {
        label: "ALUMNOS EN CAMINO",
        value: "22",
        accent: "yellow",
    },
]

// Matriz de calor de ocupación
// Helper para generar datos de heatmap de forma consistente
const generateHeatmapCell = (
    day: string,
    hour: string,
    percentage: number
): HeatmapCell => ({
    day,
    hour,
    percentage,
    level: classifyOccupancy(percentage),
})

export const heatmapData: HeatmapCell[] = [
    // Lunes
    generateHeatmapCell("Lunes", "09:00", 35),
    generateHeatmapCell("Lunes", "12:00", 55),
    generateHeatmapCell("Lunes", "15:00", 78),
    generateHeatmapCell("Lunes", "17:00", 60),
    // Martes
    generateHeatmapCell("Martes", "09:00", 40),
    generateHeatmapCell("Martes", "12:00", 72),
    generateHeatmapCell("Martes", "15:00", 85),
    generateHeatmapCell("Martes", "17:00", 58),
    // Miércoles
    generateHeatmapCell("Miér.", "09:00", 30),
    generateHeatmapCell("Miér.", "12:00", 52),
    generateHeatmapCell("Miér.", "15:00", 65),
    generateHeatmapCell("Miér.", "17:00", 45),
    // Jueves
    generateHeatmapCell("Jueves", "09:00", 38),
    generateHeatmapCell("Jueves", "12:00", 58),
    generateHeatmapCell("Jueves", "15:00", 75),
    generateHeatmapCell("Jueves", "17:00", 62),
    // Viernes
    generateHeatmapCell("Vier.", "09:00", 45),
    generateHeatmapCell("Vier.", "12:00", 80),
    generateHeatmapCell("Vier.", "15:00", 88),
    generateHeatmapCell("Vier.", "17:00", 65),
    // Sábado
    generateHeatmapCell("Sáb.", "09:00", 25),
    generateHeatmapCell("Sáb.", "12:00", 35),
    generateHeatmapCell("Sáb.", "15:00", 50),
    generateHeatmapCell("Sáb.", "17:00", 30),
]

// Registros de acceso QR
export const accessLogs: AccessLog[] = [
    {
        id: "20224D5F8",
        studentId: "20224D5F8",
        program: "Industrial",
        action: "INGRESO",
        timestamp: "12:41",
    },
    {
        id: "2021A8B2C",
        studentId: "2021A8B2C",
        program: "Civil",
        action: "SALIDA",
        timestamp: "12:39",
    },
    {
        id: "2023F4E5D",
        studentId: "2023F4E5D",
        program: "Data Science",
        action: "INGRESO",
        timestamp: "12:35",
    },
    {
        id: "2022C7G9H",
        studentId: "2022C7G9H",
        program: "Ingeniería",
        action: "INGRESO",
        timestamp: "12:32",
    },
    {
        id: "2020K3L5M",
        studentId: "2020K3L5M",
        program: "Biología",
        action: "SALIDA",
        timestamp: "12:28",
    },
]

// Alertas del sistema
export const adminAlerts: SystemAlert[] = [
    {
        id: "alert-1",
        message: "Pico de aforo crítico detectado en los próximos 60 minutos.",
        severity: "critical",
        timestamp: "12:41",
    },
    {
        id: "alert-2",
        message: "Densidad alta: Salida masiva de clases presenciales de Ingeniería.",
        severity: "warning",
        timestamp: "12:38",
    },
]

// Datos de balance de demanda
export const demandBalanceData: DemandPoint[] = [
    { hour: "09:00", baseline: 100, withGymtec: 75 },
    { hour: "11:00", baseline: 140, withGymtec: 95 },
    { hour: "01:00 PM", baseline: 150, withGymtec: 105 },
    { hour: "03:00 PM", baseline: 92, withGymtec: 130 },
]

// Métricas de impacto
export const impactMetrics: ImpactMetric[] = [
    {
        label: "VOLUMEN DE ALUMNOS REDISTRIBUIDOS",
        value: "150 Estudiantes",
        accent: "cyan",
    },
    {
        label: "MEJORA PERCIBIDA EN BIENESTAR",
        value: "+25%",
        accent: "green",
    },
    {
        label: "ASISTENCIA ACUMULADA SEMANAL",
        value: "580 Visitas",
        accent: "cyan",
    },
]

// Análisis de progreso
export const progressAnalysis =
    "Al mantener la Línea Base Histórica como comparativo permanente, el sistema demuestra un aplanamiento efectivo de la curva en las horas pico tradicionales de UTEC (11:00 AM y 01:00 PM), desplazando exitosamente la demanda sobrante hacia bloques tradicionalmente subutilizados (03:00 PM). Esto valida el impacto del algoritmo de recomendación personalizada en el cambio conductual del alumnado."

// Recomendaciones activas
export const activeRecommendations = [
    "Evitar 11:00 AM → sugerir 10:00 AM",
    "Evitar 06:00 PM → sugerir 04:30 PM",
    "Evitar 01:00 PM → sugerir 02:30 PM",
]

// Acciones de contingencia
export const contingencyActions: ContingencyAction[] = [
    {
        id: "suggest-time-change",
        title: "Lanzar Sugerencia de Cambio de Hora",
        description: "Enviar notificación a estudiantes recomendando horarios alternativos",
        type: "proactive",
    },
    {
        id: "force-incentive",
        title: "Forzar Incentivo en App Estudiante",
        description: "Activar popup con incentivos para redistribuir demanda",
        type: "proactive",
    },
    {
        id: "declare-critical-saturation",
        title: "Declarar Alerta: Saturación Crítica Inmediata",
        description: "Bloquear nuevas reservas en horarios críticos",
        type: "emergency",
    },
    {
        id: "request-campus-support",
        title: "Solicitar Asistencia / Soporte de Campus",
        description: "Notificar a personal físico del gimnasio",
        type: "emergency",
    },
]