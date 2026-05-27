import { OccupancyStatus, AlertLevel } from '@/types/admin';

export function getStatusColor(status: OccupancyStatus): string {
    switch (status) {
        case 'Bajo':
            return '#22c55e'; // green
        case 'Medio':
            return '#facc15'; // yellow
        case 'Alto':
            return '#ef4444'; // red
        default:
            return '#94a3b8'; // gray
    }
}

export function getStatusBgClass(status: OccupancyStatus | string): string {
    const normalizedStatus = status as OccupancyStatus;
    switch (normalizedStatus) {
        case 'Bajo':
            return 'bg-green-500/20 text-green-400 border border-green-500/30';
        case 'Medio':
            return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
        case 'Alto':
            return 'bg-red-500/20 text-red-400 border border-red-500/30';
        default:
            return 'bg-slate-500/20 text-slate-400 border border-slate-500/30';
    }
}

export function getAlertBgClass(level: AlertLevel): string {
    switch (level) {
        case 'critical':
            return 'border-l-4 border-l-red-500 bg-red-500/10';
        case 'warning':
            return 'border-l-4 border-l-yellow-500 bg-yellow-500/10';
        case 'info':
        default:
            return 'border-l-4 border-l-cyan-400 bg-cyan-400/10';
    }
}

export function getHeatmapCellColor(status: OccupancyStatus): string {
    switch (status) {
        case 'Bajo':
            return 'bg-green-600/40';
        case 'Medio':
            return 'bg-yellow-600/40';
        case 'Alto':
            return 'bg-red-600/40';
        default:
            return 'bg-slate-600/40';
    }
}

export function getPriorityColor(priority: string): string {
    if (priority.includes('Óptimo')) return 'text-cyan-400';
    if (priority.includes('alta')) return 'text-red-400';
    if (priority.includes('media')) return 'text-yellow-400';
    return 'text-cyan-400';
}