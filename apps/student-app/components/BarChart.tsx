'use client';

import { PredictionBar, OccupancyStatus } from '@/types/gymtec';

interface BarChartProps {
    bars: PredictionBar[];
    className?: string;
}

function getColorForStatus(status: OccupancyStatus): string {
    switch (status) {
        case 'Bajo':
            return 'bg-green-500';
        case 'Medio':
            return 'bg-yellow-400';
        case 'Alto':
            return 'bg-red-500';
        default:
            return 'bg-blue-500';
    }
}

export function BarChart({ bars, className = '' }: BarChartProps) {
    if (bars.length === 0) {
        return <div className="text-center text-slate-500">Sin datos disponibles</div>;
    }

    const maxValue = Math.max(...bars.map((b) => b.value), 1);

    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-end justify-between gap-1.5 h-48">
                {bars.map((bar, idx) => {
                    const heightPercent = (bar.value / maxValue) * 100;
                    return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                            <div className="relative w-full h-40 flex items-end justify-center">
                                <div
                                    className={`w-2/3 ${getColorForStatus(
                                        bar.status
                                    )} rounded-t-md transition-all hover:opacity-80`}
                                    style={{ height: `${heightPercent}%` }}
                                    title={`${bar.label}: ${bar.value}%`}
                                />
                            </div>
                            <span className="text-xs font-medium text-slate-600 text-center leading-tight">
                {bar.label}
              </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}