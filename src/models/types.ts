/**
 * Tipos y interfaces de la aplicación
 */

export interface User {
    id: string
    name: string
    email: string
    preferences: UserPreferences
}

export interface UserPreferences {
    minOccupancy: boolean
    preferredTimeRange: [string, string]
    selectedDays: string[]
}

export interface OccupancyDataPoint {
    time: string
    occupancy: number
}

export interface ScheduleEntry {
    id: string
    userId: string
    day: string
    time: string
    occupancy: number
    status: 'óptimo' | 'congestionado' | 'medio'
}

export interface RecommendedSlot {
    day: string
    time: string
    occupancy: number
    reason: string
    algorithmFactors: string[]
}

export interface APIResponse<T> {
    success: boolean
    data?: T
    error?: string
    message?: string
}