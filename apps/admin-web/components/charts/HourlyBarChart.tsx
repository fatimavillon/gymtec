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
import { HourlyAforoPoint } from '@/types/admin';

interface HourlyBarChartProps {
    data: HourlyAforoPoint[];
    dataKey?: string;
    color?: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number; payload: HourlyAforoPoint }>;
    label?: string;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm">
                <p className="text-white font-semibold">{data.hour}</p>
                <p className="text-cyan-400">
                    Aforo: <span className="font-bold">{data.value}%</span>
                </p>
                <p className="text-slate-400 text-xs mt-1">{data.status}</p>
            </div>
        );
    }
    return null;
}

export function HourlyBarChart({
                                   data,
                                   dataKey = 'value',
                                   color = '#22d3ee',
                               }: HourlyBarChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="hour" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    domain={[0, 80]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(34, 211, 238, 0.1)' }} />
                <Bar
                    dataKey={dataKey}
                    fill={color}
                    radius={[8, 8, 0, 0]}
                    isAnimationActive={true}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}