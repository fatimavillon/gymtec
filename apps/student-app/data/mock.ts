import {
    DashboardAforo,
    TodayPredictionsResponse,
    SelectedPredictionResponse,
    WeeklyTrendResponse,
    RecommendationResponse,
    SaveRecommendationResponse,
} from '@/types/gymtec';

export const mockDashboardAforo: DashboardAforo = {
    currentOccupancy: 72,
    status: 'Alto',
    message: 'Alta demanda en este momento',
    bestNearbyHour: '5:00 PM',
    peopleInRoom: '45 / 50',
    updatedAt: '12:45 PM',
};

export const mockTodayPredictions: TodayPredictionsResponse = {
    bars: [
        { label: '7AM', value: 28, status: 'Bajo' },
        { label: '9AM', value: 45, status: 'Bajo' },
        { label: '11AM', value: 75, status: 'Alto' },
        { label: '1PM', value: 58, status: 'Medio' },
        { label: '3PM', value: 72, status: 'Alto' },
        { label: '5PM', value: 80, status: 'Alto' },
        { label: '7PM', value: 50, status: 'Bajo' },
        { label: '9PM', value: 30, status: 'Bajo' },
    ],
};

export const mockSelectedPrediction: SelectedPredictionResponse = {
    day: 'Hoy',
    hour: '02:00 PM',
    value: 58,
    status: 'Medio',
};

export const mockWeeklyTrend: WeeklyTrendResponse = {
    trend: [
        { day: 'L', value: 58, status: 'Medio' },
        { day: 'M', value: 76, status: 'Alto' },
        { day: 'X', value: 52, status: 'Medio' },
        { day: 'J', value: 61, status: 'Medio' },
        { day: 'V', value: 49, status: 'Medio' },
        { day: 'S', value: 34, status: 'Bajo' },
    ],
};

export const mockRecommendation: RecommendationResponse = {
    recommended: {
        day: 'Martes',
        hour: '10:00 AM',
        occupancy: 34,
        status: 'Bajo',
    },
    alternatives: [
        {
            day: 'Jueves',
            hour: '08:30 AM',
            occupancy: 40,
            status: 'Bajo',
        },
        {
            day: 'Viernes',
            hour: '02:00 PM',
            occupancy: 48,
            status: 'Medio',
        },
    ],
    reason: 'Este bloque coincide con menor densidad de clases presenciales y menor ocupación histórica del gimnasio.',
};

export const mockSaveRecommendation: SaveRecommendationResponse = {
    success: true,
    message: 'Horario guardado correctamente',
};