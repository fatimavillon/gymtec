'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { PredictionRealPoint } from '@/types/admin';

interface RealVsPredictedChartProps {
    data: PredictionRealPoint[];
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
    label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm">
                <p className="text-white font-semibold">{label}</p>
                {payload.map((item, idx) => (
                    <p key={idx} style={{ color: item.color }}>
                        {item.name}: <span className="font-bold">{item.value}%</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
}

export function RealVsPredictedChart({
                                         data,
                                     }: RealVsPredictedChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis
                    dataKey="hour"
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                />
                <YAxis
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    domain={[0, 80]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line
                    type="monotone"
                    dataKey="real"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Aforo real"
                />
                <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={{ fill: '#22d3ee', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Aforo predicho"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}