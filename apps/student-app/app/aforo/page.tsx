'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentAppShell } from '@/components/StudentAppShell';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { BackButton } from '@/components/BackButton';
import { HeaderBlue } from '@/components/HeaderBlue';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { getDashboardAforo } from '@/services/gymtecApi';
import { DashboardAforo } from '@/types/gymtec';
import { Users, AlertCircle } from 'lucide-react';

export default function Aforo() {
    const [dashboard, setDashboard] = useState<DashboardAforo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            setError(false);
            const data = await getDashboardAforo();
            setDashboard(data);
        } catch (err) {
            console.error('Error loading aforo:', err);
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

    if (error || !dashboard) {
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
            {/* Header */}
            <HeaderBlue
                title="Aforo actual"
            >
                <BackButton href="/home" />
            </HeaderBlue>

            <div className="px-6 py-6 space-y-6">
                {/* Main Occupancy Card */}
                <Card>
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <Users size={40} className="text-red-500" strokeWidth={1.5} />
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <div className="text-6xl font-bold text-red-500 mb-3">
                            {dashboard.currentOccupancy}%
                        </div>
                        <StatusBadge status={dashboard.status} />
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 transition-all"
                                style={{ width: `${dashboard.currentOccupancy}%` }}
                            />
                        </div>
                    </div>

                    {/* Alert */}
                    <Card variant="alert" className="flex gap-3">
                        <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <p className="text-sm text-red-700 font-medium">
                            {dashboard.message}. Te recomendamos revisar horarios alternativos.
                        </p>
                    </Card>
                </Card>

                {/* Next Hours */}
                <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Próximas horas</h2>

                    <div className="space-y-3">
                        {/* 4:00 PM */}
                        <Card className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-slate-900">4:00 PM</p>
                                <p className="text-sm text-slate-600">78%</p>
                            </div>
                            <StatusBadge status="Alto" size="sm" />
                        </Card>

                        {/* 5:00 PM */}
                        <Card className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-slate-900">5:00 PM</p>
                                <p className="text-sm text-slate-600">58%</p>
                            </div>
                            <StatusBadge status="Medio" size="sm" />
                        </Card>

                        {/* 6:00 PM - Highlighted */}
                        <Card className="border-2 border-green-500 bg-green-50 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-slate-900">6:00 PM</p>
                                <p className="text-sm text-slate-600">35%</p>
                            </div>
                            <StatusBadge status="Bajo" size="sm" />
                        </Card>
                    </div>
                </div>

                {/* CTA Button */}
                <Link
                    href="/recomendacion"
                    className="block w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-center hover:bg-blue-700 transition-colors mt-8"
                >
                    Ver recomendación personalizada
                </Link>
            </div>
        </StudentAppShell>
    );
}