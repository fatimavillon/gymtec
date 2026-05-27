export type OccupancyStatus = 'Bajo' | 'Medio' | 'Alto';
export type PriorityStatus =
    | 'Prioridad baja'
    | 'Prioridad media'
    | 'Prioridad alta'
    | 'Óptimo';
export type AlertLevel = 'info' | 'warning' | 'critical';
export type AccessType = 'Ingreso' | 'Salida';

export interface AdminLoginRequest {
    email: string;
    accessCode: string;
}

export interface AdminLoginResponse {
    success: boolean;
    token?: string;
    adminName?: string;
    message?: string;
}

export interface AdminKpi {
    label: string;
    value: string;
    status?: string;
    source?: string;
}

export interface DashboardKpis {
    currentOccupancy: AdminKpi;
    peopleInRoom: AdminKpi;
    dailyAverage: AdminKpi;
    bestRecommendedHour: AdminKpi;
}

export interface HeatmapCell {
    day: string;
    hour: string;
    status: OccupancyStatus;
}

export interface AccessLog {
    id: string;
    career: string;
    type: AccessType;
    time: string;
}

export interface AdminAlert {
    level: AlertLevel;
    message: string;
}

export interface DashboardResponse {
    dateLabel: string;
    updatedAt: string;
    kpis: DashboardKpis;
    heatmap: HeatmapCell[];
    latestLogs: AccessLog[];
    alerts: AdminAlert[];
}

export interface HourlyAforoPoint {
    hour: string;
    value: number;
    status: OccupancyStatus;
}

export interface MonitoringTableRow {
    hour: string;
    observed: string;
    status: OccupancyStatus;
    observation: string;
}

export interface MonitoringDailyResponse {
    filters: {
        day: string;
        range: string;
        status: string;
    };
    kpis: Record<string, AdminKpi>;
    hourlyAforo: HourlyAforoPoint[];
    table: MonitoringTableRow[];
}

export interface PredictionRealPoint {
    hour: string;
    real: number;
    predicted: number;
}

export interface PredictionComparisonRow {
    hour: string;
    real: string;
    predicted: string;
    difference: string;
    evaluation: 'Correcto' | 'Aceptable' | 'Revisar';
}

export interface PredictionVsRealResponse {
    kpis: {
        estimatedAccuracy: string;
        meanError: string;
        correctlyClassifiedBlocks: string;
    };
    series: PredictionRealPoint[];
    table: PredictionComparisonRow[];
    interpretation: string;
}

export interface DemandByDayPoint {
    day: string;
    value: number;
}

export interface OccupancyDistributionPoint {
    name: string;
    value: number;
}

export interface WeeklySummaryRow {
    day: string;
    average: string;
    peakHour: string;
    recommendation: string;
}

export interface WeeklyReportResponse {
    filters: {
        period: string;
        day: string;
    };
    kpis: Record<string, AdminKpi>;
    demandByDay: DemandByDayPoint[];
    occupancyDistribution: OccupancyDistributionPoint[];
    summary: WeeklySummaryRow[];
    conclusion: string;
}

export interface OperationalRecommendation {
    title: string;
    message: string;
    priority: PriorityStatus;
    source: string;
}

export interface OperationalRecommendationsResponse {
    automaticRecommendations: OperationalRecommendation[];
    justification: string;
    impact: {
        congestionReduction: string;
        scheduleDistributionImprovement: string;
        expectedSatisfaction: string;
    };
}

export interface AdminActionResponse {
    success: boolean;
    message: string;
}