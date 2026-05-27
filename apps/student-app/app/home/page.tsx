'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentAppShell } from '@/components/StudentAppShell';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { BarChart } from '@/components/BarChart';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { getDashboardAforo, getTodayPredictions } from '@/services/gymtecApi';
import { DashboardAforo, TodayPredictionsResponse } from '@/types/gymtec';
import { Clock, Users, TrendingUp, ChevronRight } from 'lucide-react';

export default function Home() {
    const [dashboard, setDashboard] = useState<DashboardAforo | null>(null);
    const [predictions, setPredictions] = useState<TodayPredictionsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            setError(false);
            const [dashData, predData] = await Promise.all([
                getDashboardAforo(),
                getTodayPredictions(),
            ]);
            setDashboard(dashData);
            setPredictions(predData);
        } catch (err) {
            console.error('Error loading home data:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <StudentAppShell>
                <LoadingState />
            </StudentAppShell>
        );
    }

    if (error || !dashboard || !predictions) {
        return (
            <StudentAppShell>
                <div className="p-6">
                    <ErrorState onRetry={loadData} />
                </div>
            </StudentAppShell>
        );
    }

    return (
        <StudentAppShell>
            {/* Blue Header */}
            <div className="bg-gradient-to-b from-blue-900 to-blue-800 rounded-b-3xl pt-8 pb-32 px-6">
                <div className="text-center">
                    <p className="text-sm text-blue-100 mb-2">Hola, estudiante 👋</p>
                    <h1 className="text-3xl font-bold text-white">GYMTEC</h1>
                </div>
            </div>

            {/* Main Aforo Card - Overlapping */}
            <div className="px-6 -mt-24 mb-6 relative z-10">
                <Link href="/aforo">
                    <Card className="cursor-pointer hover:shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Aforo actual</h2>
                            </div>
                            <ChevronRight size={24} className="text-blue-600" strokeWidth={2} />
                        </div>

                        <div className="mb-4">
                            <div className="text-5xl font-bold text-red-500 mb-3">
                                {dashboard.currentOccupancy}%
                            </div>
                            <StatusBadge status={dashboard.status} />
                        </div>

                        <p className="text-slate-600 text-sm mb-6">{dashboard.message}</p>

                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <p className="text-xs text-slate-600 mb-2 font-medium">Mejor hora cercana</p>
                            <div className="flex items-center gap-3">
                                <Clock size={20} className="text-green-500" strokeWidth={2} />
                                <span className="text-2xl font-bold text-green-600">
                  {dashboard.bestNearbyHour}
                </span>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>

            {/* Predictions Card */}
            <div className="px-6 mb-6">
                <Card>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">Predicción de hoy</h2>
                    </div>
                    <BarChart bars={predictions.bars} />
                </Card>
            </div>

            {/* Quick Action Cards */}
            <div className="px-6 grid grid-cols-2 gap-4 mb-8">
                <Link href="/aforo">
                    <Card className="h-full cursor-pointer hover:shadow-md">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Users size={24} className="text-blue-600" strokeWidth={1.5} />
                            </div>
                        </div>
                        <p className="text-xs text-slate-600 mb-2 font-medium">Estado actual</p>
                        <h3 className="font-bold text-slate-900 text-lg">Ver aforo</h3>
                    </Card>
                </Link>

                <Link href="/prediccion">
                    <Card className="h-full cursor-pointer hover:shadow-md">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <TrendingUp size={24} className="text-yellow-600" strokeWidth={1.5} />
                            </div>
                        </div>
                        <p className="text-xs text-slate-600 mb-2 font-medium">Ver tendencias</p>
                        <h3 className="font-bold text-slate-900 text-lg">Predicción</h3>
                    </Card>
                </Link>
            </div>
        </StudentAppShell>
    );
}