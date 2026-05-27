'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { OccupancyDistributionPoint } from '@/types/admin';
import { getStatusColor } from '@/lib/utils';

interface OccupancyDistributionChartProps {
    data: OccupancyDistributionPoint[];
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ name: string; value: number }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm">
                <p className="text-white font-semibold">{data.name}</p>
                <p className="text-cyan-400">
                    Porcentaje: <span className="font-bold">{data.value}%</span>
                </p>
            </div>
        );
    }
    return null;
}

export function OccupancyDistributionChart({
                                               data,
                                           }: OccupancyDistributionChartProps) {
    const colors = data.map((item) => getStatusColor(item.name as any));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#22d3ee"
                    dataKey="value"
                >
                    {colors.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}