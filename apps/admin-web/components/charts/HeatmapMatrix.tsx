'use client';

import { HeatmapCell } from '@/types/admin';
import { getHeatmapCellColor } from '@/lib/utils';

interface HeatmapMatrixProps {
    data: HeatmapCell[];
}

export function HeatmapMatrix({ data }: HeatmapMatrixProps) {
    const days = [...new Set(data.map((d) => d.day))];
    const hours = [...new Set(data.map((d) => d.hour))];

    const getStatus = (day: string, hour: string) => {
        return data.find((d) => d.day === day && d.hour === hour)?.status || 'Bajo';
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr>
                    <th className="text-left text-xs font-semibold text-slate-400 py-3 px-4">
                        Hora
                    </th>
                    {days.map((day) => (
                        <th
                            key={day}
                            className="text-center text-xs font-semibold text-slate-400 py-3 px-2"
                        >
                            {day}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {hours.map((hour) => (
                    <tr key={hour} className="border-t border-slate-700">
                        <td className="text-xs font-semibold text-slate-400 py-3 px-4">
                            {hour}
                        </td>
                        {days.map((day) => {
                            const status = getStatus(day, hour);
                            return (
                                <td
                                    key={`${day}-${hour}`}
                                    className={`p-2 text-center text-xs font-semibold rounded-lg ${getHeatmapCellColor(status)}`}
                                >
                                    <span className="text-slate-200">{status}</span>
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}