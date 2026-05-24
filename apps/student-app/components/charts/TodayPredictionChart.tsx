"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import type { PredictionPoint } from "@/types/gymtec"

interface TodayPredictionChartProps {
    data: PredictionPoint[]
}

export default function TodayPredictionChart({
                                                 data,
                                             }: TodayPredictionChartProps) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                    dataKey="time"
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
                <Line
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#2563EB"
                    dot={{ fill: "#2563EB", r: 4 }}
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}