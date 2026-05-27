export type OccupancyStatus = 'Bajo' | 'Medio' | 'Alto';

export interface DashboardAforo {
    currentOccupancy: number;
    status: OccupancyStatus;
    message: string;
    bestNearbyHour: string;
    peopleInRoom?: string;
    updatedAt?: string;
}

export interface PredictionBar {
    label: string;
    value: number;
    status: OccupancyStatus;
}

export interface SelectedPrediction {
    day: string;
    hour: string;
    value: number;
    status: OccupancyStatus;
}

export interface WeeklyTrendItem {
    day: string;
    value: number;
    status: OccupancyStatus;
}

export interface RecommendationRequest {
    availableDays: string[];
    startHour: string;
    endHour: string;
    preference: string;
}

export interface RecommendedSlot {
    day: string;
    hour: string;
    occupancy: number;
    status: OccupancyStatus;
}

export interface RecommendationResponse {
    recommended: RecommendedSlot;
    alternatives: RecommendedSlot[];
    reason: string;
}

export interface SaveRecommendationResponse {
    success: boolean;
    message: string;
}

export interface TodayPredictionsResponse {
    bars: PredictionBar[];
}

export interface SelectedPredictionResponse {
    day: string;
    hour: string;
    value: number;
    status: OccupancyStatus;
}

export interface WeeklyTrendResponse {
    trend: WeeklyTrendItem[];
}