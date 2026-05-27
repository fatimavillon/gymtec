import {
    DashboardResponse,
    MonitoringDailyResponse,
    PredictionVsRealResponse,
    WeeklyReportResponse,
    OperationalRecommendationsResponse,
} from '@/types/admin';

export const mockDashboard: DashboardResponse = {
    dateLabel: 'Hoy: Lunes universitario',
    updatedAt: '12:45 PM',
    kpis: {
        currentOccupancy: {
            label: 'Aforo actual',
            value: '72%',
            status: 'Alto',
        },
        peopleInRoom: {
            label: 'Personas en sala',
            value: '45/50',
            status: 'Capacidad crítica',
        },
        dailyAverage: {
            label: 'Aforo promedio del día',
            value: '58%',
            status: 'Medio',
        },
        bestRecommendedHour: {
            label: 'Mejor hora recomendada',
            value: '5:00 PM',
            status: 'Bajo',
        },
    },
    heatmap: [
        { day: 'Lun', hour: '09:00', status: 'Medio' },
        { day: 'Lun', hour: '12:00', status: 'Alto' },
        { day: 'Lun', hour: '15:00', status: 'Medio' },
        { day: 'Lun', hour: '17:00', status: 'Bajo' },
        { day: 'Mar', hour: '09:00', status: 'Bajo' },
        { day: 'Mar', hour: '12:00', status: 'Medio' },
        { day: 'Mar', hour: '15:00', status: 'Bajo' },
        { day: 'Mar', hour: '17:00', status: 'Bajo' },
        { day: 'Mié', hour: '09:00', status: 'Alto' },
        { day: 'Mié', hour: '12:00', status: 'Alto' },
        { day: 'Mié', hour: '15:00', status: 'Alto' },
        { day: 'Mié', hour: '17:00', status: 'Medio' },
        { day: 'Jue', hour: '09:00', status: 'Medio' },
        { day: 'Jue', hour: '12:00', status: 'Alto' },
        { day: 'Jue', hour: '15:00', status: 'Medio' },
        { day: 'Jue', hour: '17:00', status: 'Bajo' },
        { day: 'Vie', hour: '09:00', status: 'Bajo' },
        { day: 'Vie', hour: '12:00', status: 'Medio' },
        { day: 'Vie', hour: '15:00', status: 'Bajo' },
        { day: 'Vie', hour: '17:00', status: 'Bajo' },
        { day: 'Sáb', hour: '09:00', status: 'Bajo' },
        { day: 'Sáb', hour: '12:00', status: 'Bajo' },
        { day: 'Sáb', hour: '15:00', status: 'Bajo' },
        { day: 'Sáb', hour: '17:00', status: 'Bajo' },
    ],
    latestLogs: [
        { id: '20224D5F8', career: 'Industrial', type: 'Ingreso', time: '12:41' },
        { id: '2021A8B2C', career: 'Civil', type: 'Salida', time: '12:39' },
        { id: '2023F4E5D', career: 'Data Science', type: 'Ingreso', time: '12:35' },
    ],
    alerts: [
        {
            level: 'critical',
            message:
                'Pico de aforo crítico detectado en los próximos 60 minutos.',
        },
        {
            level: 'warning',
            message:
                'Densidad alta asociada a salida masiva de clases presenciales.',
        },
    ],
};

export const mockMonitoringDaily: MonitoringDailyResponse = {
    filters: {
        day: 'Lunes',
        range: '07:00 AM - 09:00 PM',
        status: 'Todos',
    },
    kpis: {
        peakHour: {
            label: 'Hora pico actual',
            value: '11:00 AM',
            status: 'Alto',
        },
        lowestCongestion: {
            label: 'Menor congestión',
            value: '5:00 PM',
            status: 'Bajo',
        },
        variationVsYesterday: {
            label: 'Variación vs ayer',
            value: '+12%',
            status: 'Incremento',
        },
    },
    hourlyAforo: [
        { hour: '7AM', value: 28, status: 'Bajo' },
        { hour: '9AM', value: 45, status: 'Bajo' },
        { hour: '11AM', value: 75, status: 'Alto' },
        { hour: '1PM', value: 58, status: 'Medio' },
        { hour: '3PM', value: 48, status: 'Medio' },
        { hour: '5PM', value: 34, status: 'Bajo' },
        { hour: '7PM', value: 42, status: 'Bajo' },
        { hour: '9PM', value: 25, status: 'Bajo' },
    ],
    table: [
        {
            hour: '07:00 AM',
            observed: '28%',
            status: 'Bajo',
            observation: 'Baja demanda',
        },
        {
            hour: '11:00 AM',
            observed: '75%',
            status: 'Alto',
            observation: 'Saturación parcial',
        },
        {
            hour: '01:00 PM',
            observed: '58%',
            status: 'Medio',
            observation: 'Flujo estable',
        },
        {
            hour: '05:00 PM',
            observed: '34%',
            status: 'Bajo',
            observation: 'Horario recomendado',
        },
    ],
};

export const mockPredictionVsReal: PredictionVsRealResponse = {
    kpis: {
        estimatedAccuracy: '87%',
        meanError: '6.2%',
        correctlyClassifiedBlocks: '8/10',
    },
    series: [
        { hour: '09:00', real: 35, predicted: 38 },
        { hour: '11:00', real: 72, predicted: 75 },
        { hour: '13:00', real: 55, predicted: 58 },
        { hour: '15:00', real: 48, predicted: 50 },
        { hour: '17:00', real: 34, predicted: 40 },
    ],
    table: [
        {
            hour: '09:00 AM',
            real: '35%',
            predicted: '38%',
            difference: '+3%',
            evaluation: 'Correcto',
        },
        {
            hour: '11:00 AM',
            real: '72%',
            predicted: '75%',
            difference: '+3%',
            evaluation: 'Correcto',
        },
        {
            hour: '01:00 PM',
            real: '55%',
            predicted: '58%',
            difference: '+3%',
            evaluation: 'Correcto',
        },
        {
            hour: '05:00 PM',
            real: '34%',
            predicted: '40%',
            difference: '+6%',
            evaluation: 'Aceptable',
        },
    ],
    interpretation:
        'El modelo identifica patrones de congestión asociados a horarios académicos, densidad de clases presenciales y comportamiento histórico de asistencia. Esto permite anticipar bloques críticos y recomendar horarios alternativos.',
};

export const mockWeeklyReport: WeeklyReportResponse = {
    filters: {
        period: 'Semana actual',
        day: 'Todos',
    },
    kpis: {
        weeklyAverage: {
            label: 'Aforo promedio semanal',
            value: '54%',
            status: 'Medio',
        },
        highestDemandDay: {
            label: 'Día con mayor demanda',
            value: 'Miércoles',
            status: 'Alto',
        },
        frequentPeakHour: {
            label: 'Hora pico frecuente',
            value: '11:00 AM',
            status: 'Alto',
        },
        mostRecommendedSlot: {
            label: 'Horario más recomendado',
            value: 'Mar 10:00 AM',
            status: 'Bajo',
        },
    },
    demandByDay: [
        { day: 'Lun', value: 58 },
        { day: 'Mar', value: 42 },
        { day: 'Mié', value: 76 },
        { day: 'Jue', value: 62 },
        { day: 'Vie', value: 49 },
        { day: 'Sáb', value: 28 },
    ],
    occupancyDistribution: [
        { name: 'Bajo', value: 35 },
        { name: 'Medio', value: 42 },
        { name: 'Alto', value: 23 },
    ],
    summary: [
        {
            day: 'Lunes',
            average: '58%',
            peakHour: '11:00 AM',
            recommendation: 'Reforzar comunicación',
        },
        {
            day: 'Martes',
            average: '42%',
            peakHour: '10:00 AM',
            recommendation: 'Promover asistencia',
        },
        {
            day: 'Miércoles',
            average: '76%',
            peakHour: '12:00 PM',
            recommendation: 'Activar recomendación alternativa',
        },
        {
            day: 'Viernes',
            average: '49%',
            peakHour: '05:00 PM',
            recommendation: 'Mantener operación normal',
        },
    ],
    conclusion:
        'Durante la semana se identificaron picos recurrentes entre 11:00 AM y 1:00 PM. Se recomienda incentivar bloques de menor ocupación para redistribuir la demanda.',
};

export const mockOperationalRecommendations: OperationalRecommendationsResponse =
    {
        automaticRecommendations: [
            {
                title: 'Promover horario alternativo',
                message:
                    'Enviar sugerencia a estudiantes para asistir entre 5:00 PM y 7:00 PM.',
                priority: 'Prioridad media',
                source: 'recomendaciones_horario',
            },
            {
                title: 'Evitar pico crítico',
                message: 'Bloque de 11:00 AM presenta alta demanda proyectada.',
                priority: 'Prioridad alta',
                source: 'predicciones_aforo',
            },
            {
                title: 'Mejor bloque del día',
                message: 'Martes 10:00 AM presenta ocupación esperada de 34%.',
                priority: 'Óptimo',
                source: 'recomendaciones_horario',
            },
        ],
        justification:
            'La recomendación combina predicción de aforo, horarios académicos y patrones históricos para identificar bloques con menor congestión y mejor disponibilidad operativa.',
        impact: {
            congestionReduction: '-18%',
            scheduleDistributionImprovement: '+25%',
            expectedSatisfaction: 'Alto',
        },
    };