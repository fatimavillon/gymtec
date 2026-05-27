'use client';

import { useEffect, useState } from 'react';
import { StudentAppShell } from '@/components/StudentAppShell';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { BackButton } from '@/components/BackButton';
import { HeaderBlue } from '@/components/HeaderBlue';
import { DayChip } from '@/components/DayChip';
import { TimeSelect } from '@/components/TimeSelect';
import { BarChart } from '@/components/BarChart';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import {
    getTodayPredictions,
    getSelectedPrediction,
    getWeeklyTrend,
} from '@/services/gymtecApi';
import {
    TodayPredictionsResponse,
    SelectedPredictionResponse,
    WeeklyTrendResponse,
} from '@/types/gymtec';

const DAYS = ['Hoy', 'Mañana', 'Miércoles', 'Jueves'];

export default function Prediccion() {
    const [selectedDay, setSelectedDay] = useState('Hoy');
    const [selectedHour, setSelectedHour] = useState('02:00 PM');
    const [predictions, setPredictions] = useState<TodayPredictionsResponse | null>(null);
    const [selectedPrediction, setSelectedPrediction] =
        useState<SelectedPredictionResponse | null>(null);
    const [weeklyTrend, setWeeklyTrend] = useState<WeeklyTrendResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            setError(false);
            const [predData, selectedData, trendData] = await Promise.all([
                getTodayPredictions(),
                getSelectedPrediction(selectedDay, selectedHour),
                getWeeklyTrend(),
            ]);
            setPredictions(predData);
            setSelectedPrediction(selectedData);
            setWeeklyTrend(trendData);
        } catch (err) {
            console.error('Error loading predictions:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    async function handleHourChange(hour: string) {
        setSelectedHour(hour);
        try {
            const data = await getSelectedPrediction(selectedDay, hour);
            setSelectedPrediction(data);
        } catch (err) {
            console.error('Error fetching selected prediction:', err);
        }
    }

    if (loading) {
        return (
            <StudentAppShell>
                <LoadingState />
            </StudentAppShell>
        );
    }

    if (error || !predictions || !selectedPrediction || !weeklyTrend) {
        return (
            <StudentAppShell>
                <div className="p-6">
                    <ErrorState onRetry={loadData} />
                </div>
            </StudentAppShell>
        );
    }

    // Filter predictions for "horarios de hoy"
    const todaySchedule = predictions.bars.slice(0, 5).filter((_, idx) => idx % 2 === 0);

    return (
        <StudentAppShell>
            {/* Header */}
            <HeaderBlue
                title="Predicción de aforo"
            >
                <BackButton href="/home" />
            </HeaderBlue>

            <div className="px-6 py-6 space-y-6">
                {/* Day Selection */}
                <Card>
                    <p className="text-sm font-semibold text-slate-700 mb-4">Seleccionar día</p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {DAYS.map((day) => (
                            <DayChip
                                key={day}
                                label={day}
                                active={selectedDay === day}
                                onClick={() => setSelectedDay(day)}
                            />
                        ))}
                    </div>
                    <div className="h-1 bg-gradient-to-r from-blue-600 to-transparent mt-4 rounded-full" />
                </Card>

                {/* Hour Selection */}
                <Card>
                    <p className="text-sm font-semibold text-slate-700 mb-3">Seleccionar hora</p>
                    <TimeSelect value={selectedHour} onChange={handleHourChange} />
                </Card>

                {/* Result */}
                <Card className="border-l-4 border-l-yellow-400">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-4xl font-bold text-yellow-500 mb-2">
                                {selectedPrediction.value}%
                            </div>
                            <StatusBadge status={selectedPrediction.status} />
                        </div>
                        <p className="text-sm text-slate-600 text-right font-medium">
                            {selectedPrediction.day} • {selectedPrediction.hour}
                        </p>
                    </div>
                </Card>

                {/* Today's Schedule */}
                <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Horarios de hoy</h2>
                    <div className="space-y-3">
                        {todaySchedule.map((bar, idx) => (
                            <Card key={idx} className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-slate-900">{bar.label}</p>
                                    <p className="text-sm text-slate-600">{bar.value}%</p>
                                </div>
                                <StatusBadge status={bar.status} size="sm" />
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Weekly Trend */}
                <Card>
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Tendencia semanal</h2>
                    <BarChart
                        bars={weeklyTrend.trend.map((t) => ({
                            label: t.day,
                            value: t.value,
                            status: t.status,
                        }))}
                    />
                </Card>
            </div>
        </StudentAppShell>
    );
}