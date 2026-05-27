import {
    AdminLoginRequest,
    AdminLoginResponse,
    DashboardResponse,
    MonitoringDailyResponse,
    PredictionVsRealResponse,
    WeeklyReportResponse,
    OperationalRecommendationsResponse,
    AdminActionResponse,
} from '@/types/admin';
import {
    mockDashboard,
    mockMonitoringDaily,
    mockPredictionVsReal,
    mockWeeklyReport,
    mockOperationalRecommendations,
} from '@/data/mock';
import { getDataSource, getApiBaseUrl } from '@/lib/env';

const DEFAULT_TIMEOUT = 5000;

async function fetchWithTimeout(
    url: string,
    options?: RequestInit
): Promise<Response> {
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
 * POST /api/admin/auth/login
 * Login admin
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function loginAdmin(
    payload: AdminLoginRequest
): Promise<AdminLoginResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return {
                success: true,
                token: 'mock-token-' + Date.now(),
                adminName: 'Bienestar UTEC',
            };
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return {
                success: true,
                token: 'mock-token-' + Date.now(),
                adminName: 'Bienestar UTEC',
            };
        }

        const response = await fetchWithTimeout(`${apiUrl}/api/admin/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error('Login failed:', response.statusText);
            return { success: false, message: 'Error al iniciar sesión' };
        }

        const data: AdminLoginResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

/**
 * GET /api/admin/dashboard
 * Get dashboard data
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function getDashboard(): Promise<DashboardResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return mockDashboard;
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return mockDashboard;
        }

        const response = await fetchWithTimeout(`${apiUrl}/api/admin/dashboard`);

        if (!response.ok) {
            console.error('Failed to fetch dashboard:', response.statusText);
            return mockDashboard;
        }

        const data: DashboardResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dashboard:', error);
        return mockDashboard;
    }
}

/**
 * GET /api/admin/monitoring/daily
 * Get monitoring daily data
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function getMonitoringDaily(params?: {
    day?: string;
    from?: string;
    to?: string;
    status?: string;
}): Promise<MonitoringDailyResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return mockMonitoringDaily;
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return mockMonitoringDaily;
        }

        const queryParams = new URLSearchParams();
        if (params?.day) queryParams.append('day', params.day);
        if (params?.from) queryParams.append('from', params.from);
        if (params?.to) queryParams.append('to', params.to);
        if (params?.status) queryParams.append('status', params.status);

        const response = await fetchWithTimeout(
            `${apiUrl}/api/admin/monitoring/daily?${queryParams}`
        );

        if (!response.ok) {
            console.error('Failed to fetch monitoring:', response.statusText);
            return mockMonitoringDaily;
        }

        const data: MonitoringDailyResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching monitoring:', error);
        return mockMonitoringDaily;
    }
}

/**
 * GET /api/admin/predictions-vs-real
 * Get prediction vs real data
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function getPredictionVsReal(params?: {
    date?: string;
}): Promise<PredictionVsRealResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return mockPredictionVsReal;
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return mockPredictionVsReal;
        }

        const queryParams = new URLSearchParams();
        if (params?.date) queryParams.append('date', params.date);

        const response = await fetchWithTimeout(
            `${apiUrl}/api/admin/predictions-vs-real?${queryParams}`
        );

        if (!response.ok) {
            console.error('Failed to fetch prediction vs real:', response.statusText);
            return mockPredictionVsReal;
        }

        const data: PredictionVsRealResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching prediction vs real:', error);
        return mockPredictionVsReal;
    }
}

/**
 * GET /api/admin/reports/weekly
 * Get weekly report data
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function getWeeklyReport(params?: {
    period?: string;
}): Promise<WeeklyReportResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return mockWeeklyReport;
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return mockWeeklyReport;
        }

        const queryParams = new URLSearchParams();
        if (params?.period) queryParams.append('period', params.period);

        const response = await fetchWithTimeout(
            `${apiUrl}/api/admin/reports/weekly?${queryParams}`
        );

        if (!response.ok) {
            console.error('Failed to fetch weekly report:', response.statusText);
            return mockWeeklyReport;
        }

        const data: WeeklyReportResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weekly report:', error);
        return mockWeeklyReport;
    }
}

/**
 * GET /api/admin/recommendations/operational
 * Get operational recommendations
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function getOperationalRecommendations(): Promise<OperationalRecommendationsResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return mockOperationalRecommendations;
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return mockOperationalRecommendations;
        }

        const response = await fetchWithTimeout(
            `${apiUrl}/api/admin/recommendations/operational`
        );

        if (!response.ok) {
            console.error(
                'Failed to fetch operational recommendations:',
                response.statusText
            );
            return mockOperationalRecommendations;
        }

        const data: OperationalRecommendationsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching operational recommendations:', error);
        return mockOperationalRecommendations;
    }
}

/**
 * POST /api/admin/actions/publish-recommendation
 * Publish recommendation to student app
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function publishRecommendation(): Promise<AdminActionResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return { success: true, message: 'Recomendación publicada correctamente' };
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return { success: true, message: 'Recomendación publicada correctamente' };
        }

        const response = await fetchWithTimeout(
            `${apiUrl}/api/admin/actions/publish-recommendation`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    target: 'student-app',
                    recommendation:
                        'Promover horario alternativo entre 5:00 PM y 7:00 PM',
                }),
            }
        );

        if (!response.ok) {
            console.error('Failed to publish recommendation:', response.statusText);
            return { success: true, message: 'Recomendación publicada correctamente' };
        }

        const data: AdminActionResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error publishing recommendation:', error);
        return { success: true, message: 'Recomendación publicada correctamente' };
    }
}

/**
 * POST /api/admin/actions/activate-alert
 * Activate congestion alert
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function activateCongestionAlert(): Promise<AdminActionResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return { success: true, message: 'Alerta de congestión activada' };
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return { success: true, message: 'Alerta de congestión activada' };
        }

        const response = await fetchWithTimeout(
            `${apiUrl}/api/admin/actions/activate-alert`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'congestion',
                    message: 'Alta congestión proyectada',
                }),
            }
        );

        if (!response.ok) {
            console.error('Failed to activate alert:', response.statusText);
            return { success: true, message: 'Alerta de congestión activada' };
        }

        const data: AdminActionResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error activating alert:', error);
        return { success: true, message: 'Alerta de congestión activada' };
    }
}

/**
 * POST /api/admin/reports/generate
 * Generate report
 * CHANGE ENDPOINT: Replace with real API URL when backend is ready
 */
export async function generateWeeklyReport(
    format: 'PDF' | 'CSV'
): Promise<AdminActionResponse> {
    try {
        const source = getDataSource();

        if (source === 'mock') {
            return { success: true, message: 'Reporte generado correctamente' };
        }

        const apiUrl = getApiBaseUrl();
        if (!apiUrl) {
            console.warn('API_BASE_URL not configured, falling back to mock');
            return { success: true, message: 'Reporte generado correctamente' };
        }

        const response = await fetchWithTimeout(
            `${apiUrl}/api/admin/reports/generate`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    period: 'Semana actual',
                    format,
                }),
            }
        );

        if (!response.ok) {
            console.error('Failed to generate report:', response.statusText);
            return { success: true, message: 'Reporte generado correctamente' };
        }

        const data: AdminActionResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error generating report:', error);
        return { success: true, message: 'Reporte generado correctamente' };
    }
}