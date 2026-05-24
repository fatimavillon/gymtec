import type {
    CurrentOccupancyData,
    PredictionPoint,
    WeeklyTrendPoint,
    ScheduleOption,
    UserPreferences,
    SavedSchedule,
} from "@/types/gymtec"
import {
    mockCurrentOccupancy,
    mockTodayPrediction,
    mockWeeklyTrend,
    mockTodaySchedules,
    mockRecommendedSlot,
    mockAlternativeSlots,
    mockAlgorithmFactors,
    mockBlockComparison,
    mockSavedSchedules,
    mockAttendanceHistory,
    mockUserPreferences,
} from "@/data/mock-gymtec"

// Simular delay de network
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getCurrentOccupancy(): Promise<CurrentOccupancyData> {
    await delay(400)
    return mockCurrentOccupancy
}

export async function getTodayPrediction(): Promise<PredictionPoint[]> {
    await delay(400)
    return mockTodayPrediction
}

export async function getWeeklyTrend(): Promise<WeeklyTrendPoint[]> {
    await delay(400)
    return mockWeeklyTrend
}

export async function getTodaySchedules(
    _day: string
): Promise<ScheduleOption[]> {
    await delay(400)
    return mockTodaySchedules
}

export async function getRecommendedSlots(
    _preferences: UserPreferences
): Promise<{ recommended: ScheduleOption; alternatives: ScheduleOption[] }> {
    await delay(600)
    return {
        recommended: mockRecommendedSlot,
        alternatives: mockAlternativeSlots,
    }
}

export async function getAlgorithmFactors(): Promise<string[]> {
    await delay(300)
    return mockAlgorithmFactors
}

export async function getBlockComparison(): Promise<ScheduleOption[]> {
    await delay(400)
    return mockBlockComparison
}

export async function getSavedSchedules(): Promise<SavedSchedule[]> {
    await delay(300)
    return mockSavedSchedules
}

export async function getAttendanceHistory(): Promise<SavedSchedule[]> {
    await delay(400)
    return mockAttendanceHistory
}

export async function getUserPreferences(): Promise<UserPreferences> {
    await delay(300)
    return mockUserPreferences
}

export async function saveSchedule(
    _slot: ScheduleOption
): Promise<{ success: boolean }> {
    await delay(500)
    return { success: true }
}

export async function createAlert(
    _slot: ScheduleOption
): Promise<{ success: boolean }> {
    await delay(400)
    return { success: true }
}