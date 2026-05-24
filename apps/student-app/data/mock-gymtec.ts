import type {
    PredictionPoint,
    ScheduleOption,
    WeeklyTrendPoint,
    CurrentOccupancyData,
    SavedSchedule,
    UserPreferences,
} from "@/types/gymtec"
import { classifyOccupancy } from "@/lib/utils"

export const mockCurrentOccupancy: CurrentOccupancyData = {
    percentage: 72,
    level: classifyOccupancy(72),
    recommendation: "Mejor hora recomendada cercana: 5:00 PM",
}

export const mockTodayPrediction: PredictionPoint[] = [
    { time: "10:00", occupancy: 45 },
    { time: "12:00", occupancy: 60 },
    { time: "14:00", occupancy: 72 },
    { time: "16:00", occupancy: 68 },
    { time: "18:00", occupancy: 80 },
    { time: "20:00", occupancy: 35 },
]

export const mockTodaySchedules: ScheduleOption[] = [
    { day: "Lunes", time: "07:00 AM", occupancy: 25, level: "bajo" },
    { day: "Lunes", time: "11:00 AM", occupancy: 75, level: "alto" },
    { day: "Lunes", time: "01:00 PM", occupancy: 55, level: "medio" },
]

export const mockWeeklyTrend: WeeklyTrendPoint[] = [
    { day: "L", occupancy: 40 },
    { day: "M", occupancy: 65 },
    { day: "Mi", occupancy: 52 },
    { day: "J", occupancy: 48 },
    { day: "V", occupancy: 72 },
    { day: "S", occupancy: 30 },
]

export const mockRecommendedSlot: ScheduleOption = {
    day: "Martes",
    time: "10:00 AM",
    occupancy: 34,
    level: "bajo",
}

export const mockAlternativeSlots: ScheduleOption[] = [
    { day: "Jueves", time: "08:30 AM", occupancy: 40, level: "bajo" },
    { day: "Viernes", time: "02:00 PM", occupancy: 48, level: "medio" },
]

export const mockAlgorithmFactors = [
    "Menos clases presenciales salientes",
    "Patrón histórico libre en molinetes",
    "Ventana de holgura de 90 min",
]

export const mockBlockComparison: ScheduleOption[] = [
    { day: "Lunes", time: "09:00 AM", occupancy: 58, level: "medio" },
    { day: "Lunes", time: "10:00 AM", occupancy: 34, level: "bajo" },
    { day: "Lunes", time: "11:00 AM", occupancy: 70, level: "alto" },
]

export const mockSavedSchedules: SavedSchedule[] = [
    {
        id: "1",
        day: "Martes",
        time: "10:00 AM",
        occupancy: 34,
        level: "bajo",
        status: "upcoming",
    },
]

export const mockAttendanceHistory: SavedSchedule[] = [
    {
        id: "2",
        day: "Jueves",
        time: "08:30 AM",
        occupancy: 40,
        level: "bajo",
        status: "completed",
    },
    {
        id: "3",
        day: "Viernes",
        time: "02:00 PM",
        occupancy: 72,
        level: "alto",
        status: "completed",
    },
]

export const mockUserPreferences: UserPreferences = {
    selectedDays: ["lunes", "martes", "jueves"],
    startTime: "08:00",
    endTime: "20:00",
    preference: "min_occupancy",
}