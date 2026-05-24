"use client"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import type { WeeklyTrendPoint } from "@/types/gymtec"

interface WeeklyTrendChartProps {
    data: WeeklyTrendPoint[]
}

export default function WeeklyTrendChart({
                                             data,
                                         }: WeeklyTrendChartProps) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                    dataKey="day"
                    stroke="#64748B"
                    style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#64748B" style={{ fontSize: "12px" }} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Ocupación"]}
                />
                <Bar dataKey="occupancy" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}