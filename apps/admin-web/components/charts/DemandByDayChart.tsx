'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { DemandByDayPoint } from '@/types/admin';

interface DemandByDayChartProps {
    data: DemandByDayPoint[];
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number; payload: DemandByDayPoint }>;
    label?: string;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm">
                <p className="text-white font-semibold">{data.day}</p>
                <p className="text-blue-400">
                    Demanda: <span className="font-bold">{data.value}%</span>
                </p>
            </div>
        );
    }
    return null;
}

export function DemandByDayChart({
                                     data,
                                 }: DemandByDayChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    domain={[0, 80]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(37, 99, 235, 0.1)' }} />
                <Bar
                    dataKey="value"
                    fill="#2563eb"
                    radius={[8, 8, 0, 0]}
                    isAnimationActive={true}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}