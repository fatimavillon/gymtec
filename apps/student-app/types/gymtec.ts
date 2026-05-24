export type OccupancyLevel = "bajo" | "medio" | "alto"

export type ScreenName =
    | "login"
    | "home"
    | "prediction"
    | "optimize"
    | "results"
    | "detail"
    | "my-schedule"

export type NavigateFn = (screen: ScreenName) => void

export interface PredictionPoint {
    time: string
    occupancy: number
}

export interface ScheduleOption {
    day: string
    time: string
    occupancy: number
    level: OccupancyLevel
}

export interface WeeklyTrendPoint {
    day: string
    occupancy: number
}

export interface UserPreferences {
    selectedDays: string[]
    startTime: string
    endTime: string
    preference: "min_occupancy" | "near_classes" | "balanced"
}

export interface CurrentOccupancyData {
    percentage: number
    level: OccupancyLevel
    recommendation: string
}

export interface SavedSchedule {
    id: string
    day: string
    time: string
    occupancy: number
    level: OccupancyLevel
    status: "upcoming" | "completed"
}

export interface UserData {
    name: string
    email: string
}