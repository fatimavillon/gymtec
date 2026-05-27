import {
    DashboardAforo,
    TodayPredictionsResponse,
    SelectedPredictionResponse,
    WeeklyTrendResponse,
    RecommendationRequest,
    RecommendationResponse,
    SaveRecommendationResponse,
} from '@/types/gymtec';
import {
    mockDashboardAforo,
    mockTodayPredictions,
    mockSelectedPrediction,
    mockWeeklyTrend,
    mockRecommendation,
    mockSaveRecommendation,
} from '@/data/mock';
import { getDataSource, getApiBaseUrl } from '@/lib/env';

const DEFAULT_TIMEOUT = 5000;

async function fetchWithTimeout(url: string, options?: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

/**
 * GET /api/student/dashboard
 * Returns current occupancy summary for Home and Aforo screens
 *
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function getDashboardAforo(): Promise<DashboardAforo> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return mockDashboardAforo;
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return mockDashboardAforo;
        }

        const response = await fetchWithTimeout(`${apiUrl}/api/student/dashboard`);

        if (!response.ok) {
            console.error('Failed to fetch dashboard:', response.statusText);
            return mockDashboardAforo;
        }

        const data: DashboardAforo = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dashboard:', error);
        return mockDashboardAforo;
    }
}

/**
 * GET /api/student/predictions/today
 * Returns hourly predictions for today
 *
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function getTodayPredictions(): Promise<TodayPredictionsResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return mockTodayPredictions;
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return mockTodayPredictions;
        }

        const response = await fetchWithTimeout(`${apiUrl}/api/student/predictions/today`);

        if (!response.ok) {
            console.error('Failed to fetch predictions:', response.statusText);
            return mockTodayPredictions;
        }

        const data: TodayPredictionsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching predictions:', error);
        return mockTodayPredictions;
    }
}

/**
 * GET /api/student/predictions?day=Hoy&hour=14:00
 * Returns prediction for a specific day and hour
 *
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function getSelectedPrediction(
    day: string,
    hour: string
): Promise<SelectedPredictionResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return mockSelectedPrediction;
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return mockSelectedPrediction;
        }

        const params = new URLSearchParams({ day, hour });
        const response = await fetchWithTimeout(`${apiUrl}/api/student/predictions?${params}`);

        if (!response.ok) {
            console.error('Failed to fetch selected prediction:', response.statusText);
            return mockSelectedPrediction;
        }

        const data: SelectedPredictionResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching selected prediction:', error);
        return mockSelectedPrediction;
    }
}

/**
 * GET /api/student/predictions/weekly-trend
 * Returns weekly occupancy trend
 *
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function getWeeklyTrend(): Promise<WeeklyTrendResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return mockWeeklyTrend;
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return mockWeeklyTrend;
        }

        const response = await fetchWithTimeout(`${apiUrl}/api/student/predictions/weekly-trend`);

        if (!response.ok) {
            console.error('Failed to fetch weekly trend:', response.statusText);
            return mockWeeklyTrend;
        }

        const data: WeeklyTrendResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weekly trend:', error);
        return mockWeeklyTrend;
    }
}

/**
 * POST /api/student/recommendations/calculate
 * Calculates recommended schedule based on preferences
 *
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function calculateRecommendation(
    payload: RecommendationRequest
): Promise<RecommendationResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return mockRecommendation;
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return mockRecommendation;
        }

        const response = await fetchWithTimeout(`${apiUrl}/api/student/recommendations/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error('Failed to calculate recommendation:', response.statusText);
            return mockRecommendation;
        }

        const data: RecommendationResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error calculating recommendation:', error);
        return mockRecommendation;
    }
}

/**
 * POST /api/student/recommendations/save
 * Saves the selected recommendation
 *
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function saveRecommendation(
    slot: {
        day: string;
        hour: string;
        occupancy: number;
        status: string;
    }
): Promise<SaveRecommendationResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return mockSaveRecommendation;
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return mockSaveRecommendation;
        }

        const response = await fetchWithTimeout(`${apiUrl}/api/student/recommendations/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slot),
        });

        if (!response.ok) {
            console.error('Failed to save recommendation:', response.statusText);
            return mockSaveRecommendation;
        }

        const data: SaveRecommendationResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving recommendation:', error);
        return mockSaveRecommendation;
    }
}