import type { AdminSession, AdminRole } from "@/types/admin"

const ADMIN_SESSION_KEY = "gymtec_admin_session"
const VALID_ACCESS_CODE = "GYMTEC-ADMIN-2026"
const MIN_PASSWORD_LENGTH = 6

const VALID_ROLES: AdminRole[] = [
    "Bienestar Universitario",
    "Administrador de Gimnasio",
    "Operaciones Campus",
]

export const validateAdminEmail = (email: string): boolean => {
    return email.toLowerCase().endsWith("@utec.edu.pe")
}

export const validateAccessCode = (code: string): boolean => {
    return code.trim() === VALID_ACCESS_CODE
}

export const validatePassword = (password: string): boolean => {
    return password.length >= MIN_PASSWORD_LENGTH
}

export const validateRole = (role: string): boolean => {
    return VALID_ROLES.includes(role as AdminRole)
}

// Nueva interfaz para la entrada de createMockAdminSession
interface CreateMockAdminSessionInput {
    adminName: string
    email: string
    role: AdminRole
}

/**
 * Crea una sesión mock de administrador sin guardarla en localStorage.
 * @param input Datos para la sesión.
 * @returns Objeto AdminSession.
 */
export function createMockAdminSession(input: CreateMockAdminSessionInput): AdminSession {
    return {
        adminName: input.adminName,
        email: input.email,
        role: input.role,
        isAuthenticated: true,
        loginTime: new Date().toLocaleTimeString("es-ES"), // Agregado para el mock, si no estaba
    }
}

/**
 * Guarda una sesión de administrador en localStorage.
 * @param session Objeto AdminSession a guardar.
 */
export const saveMockAdminSession = (session: AdminSession): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
    }
}

/**
 * Obtiene la sesión actual de localStorage.
 * @returns Objeto AdminSession o null si no existe.
 */
export const getMockAdminSession = (): AdminSession | null => {
    if (typeof window === "undefined") return null

    const sessionData = localStorage.getItem(ADMIN_SESSION_KEY)
    if (!sessionData) return null

    try {
        return JSON.parse(sessionData) as AdminSession
    } catch {
        return null
    }
}

/**
 * Limpia la sesión del admin de localStorage.
 */
export const clearMockAdminSession = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(ADMIN_SESSION_KEY)
    }
}

export interface LoginValidation {
    valid: boolean
    errors: string[]
}

export const validateAdminLogin = (
    email: string,
    accessCode: string,
    password: string
): LoginValidation => {
    const errors: string[] = []

    if (!email.trim()) {
        errors.push("El correo es obligatorio.")
    } else if (!validateAdminEmail(email)) {
        errors.push("El correo debe terminar en @utec.edu.pe")
    }

    if (!accessCode.trim()) {
        errors.push("El código de acceso es obligatorio.")
    } else if (!validateAccessCode(accessCode)) {
        errors.push("El código de acceso es incorrecto.")
    }

    if (!password.trim()) {
        errors.push("La contraseña es obligatoria.")
    } else if (!validatePassword(password)) {
        errors.push(`La contraseña debe tener mínimo ${MIN_PASSWORD_LENGTH} caracteres.`)
    }

    return {
        valid: errors.length === 0,
        errors,
    }
}

export interface RegisterValidation {
    valid: boolean
    errors: string[]
}

export const validateAdminRegister = (
    name: string,
    email: string,
    role: AdminRole,
    accessCode: string,
    password: string,
    confirmPassword: string
): RegisterValidation => {
    const errors: string[] = []

    if (!name.trim()) {
        errors.push("El nombre completo es obligatorio.")
    }

    if (!email.trim()) {
        errors.push("El correo es obligatorio.")
    } else if (!validateAdminEmail(email)) {
        errors.push("El correo debe terminar en @utec.edu.pe")
    }

    if (!role) {
        errors.push("Debe seleccionar un rol administrativo.")
    } else if (!validateRole(role)) {
        errors.push("El rol seleccionado no es válido.")
    }

    if (!accessCode.trim()) {
        errors.push("El código de acceso es obligatorio.")
    } else if (!validateAccessCode(accessCode)) {
        errors.push("El código de acceso es incorrecto.")
    }

    if (!password.trim()) {
        errors.push("La contraseña es obligatoria.")
    } else if (!validatePassword(password)) {
        errors.push(`La contraseña debe tener mínimo ${MIN_PASSWORD_LENGTH} caracteres.`)
    }

    if (password !== confirmPassword) {
        errors.push("Las contraseñas no coinciden.")
    }

    return {
        valid: errors.length === 0,
        errors,
    }
}