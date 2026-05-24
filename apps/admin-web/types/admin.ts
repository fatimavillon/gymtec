export type AdminRole =
    | "Bienestar Universitario"
    | "Administrador de Gimnasio"
    | "Operaciones Campus"

export type AdminScreenName =
    | "login"
    | "register"
    | "dashboard"
    | "demand"
    | "contingency"

export type AdminNavigateFn = (screen: AdminScreenName) => void

export interface AdminSession {
    adminName: string
    email: string
    role: AdminRole
    isAuthenticated: boolean
    loginTime: string // Añadido para hacer la sesión más realista
}

// Nuevas interfaces para los datos de formularios de autenticación
export interface AdminLoginForm {
    email: string
    accessCode: string
    password: string
}

export interface AdminRegisterForm {
    name: string // Cambiado de adminName a name para coincidir con el campo del formulario
    email: string
    role: AdminRole
    accessCode: string
    password: string
    confirmPassword: string
}

export interface AdminMetric {
    label: string
    value: string | number
    accent?: "cyan" | "yellow" | "green" | "red"
}

export type OccupancyLevel = "bajo" | "medio" | "alto"

export interface HeatmapCell {
    day: string
    hour: string
    level: OccupancyLevel
    percentage: number // Añadido para mostrar en el heatmap
}

export interface AccessLog {
    id: string
    studentId: string // Cambio de 'faculty' a 'studentId' para consistencia
    program: string // 'facultad' en el ejemplo, aquí 'program'
    action: "INGRESO" | "SALIDA"
    timestamp: string
}

export interface SystemAlert {
    id: string
    message: string
    severity: "info" | "warning" | "critical"
    timestamp: string // Añadido para el mock
}

export interface DemandPoint {
    hour: string
    baseline: number
    withGymtec: number
}

export interface ImpactMetric {
    label: string
    value: string
    accent?: "cyan" | "green" | "yellow"
}

export interface ContingencyAction {
    id: string;
    title: string;
    description: string;
    type: "proactive" | "emergency";
}