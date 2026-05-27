'use client';

import { useEffect, useState } from 'react';
import { getDashboard } from '@/services/adminApi';
import { DashboardResponse } from '@/types/admin';
import { AdminShell } from '@/components/AdminShell';
import { AdminCard } from '@/components/AdminCard';
import { KpiCard } from '@/components/KpiCard';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { HeatmapMatrix } from '@/components/charts/HeatmapMatrix';
import { AlertCircle } from 'lucide-react';

export default function DashboardPage() {
    const [data, setData] = useState<DashboardResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            setError(false);
            const result = await getDashboard();
            setData(result);
        } catch (err) {
            console.error('Error loading dashboard:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const content = (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Operativo</h1>
                <p className="text-slate-400">
                    Vista general del aforo del gimnasio UTEC en tiempo real.
                </p>
            </div>

            {/* Filter Header */}
            <AdminCard>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        {data && (
                            <>
                                <p className="text-sm font-semibold text-slate-300">
                                    Última actualización: {data.updatedAt}
                                </p>
                            </>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-cyan-400 text-slate-950 rounded-lg font-semibold text-sm hover:bg-cyan-300 transition-colors">
                            Hoy
                        </button>
                        <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-semibold text-sm hover:bg-slate-600 transition-colors">
                            Semana
                        </button>
                        <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-semibold text-sm hover:bg-slate-600 transition-colors">
                            Mes
                        </button>
                    </div>
                </div>
            </AdminCard>

            {loading && <LoadingState />}
            {error && <ErrorState onRetry={loadData} />}

            {!loading && !error && data && (
                <>
                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <KpiCard kpi={data.kpis.currentOccupancy} />
                        <KpiCard kpi={data.kpis.peopleInRoom} />
                        <KpiCard kpi={data.kpis.dailyAverage} />
                        <KpiCard kpi={data.kpis.bestRecommendedHour} />
                    </div>

                    {/* Heatmap */}
                    <AdminCard>
                        <h2 className="text-xl font-bold text-white mb-4">
                            Matriz de calor de ocupación semanal
                        </h2>
                        <HeatmapMatrix data={data.heatmap} />
                    </AdminCard>

                    {/* Bottom Section - 2 columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Latest Logs */}
                        <AdminCard>
                            <h2 className="text-xl font-bold text-white mb-4">Últimos registros</h2>
                            <div className="space-y-3">
                                {data.latestLogs.map((log, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between py-3 px-4 bg-slate-750 rounded-lg border border-slate-700"
                                    >
                                        <div className="flex-1 text-sm">
                                            <p className="text-slate-300">
                                                <span className="font-semibold">{log.id}</span> ·{' '}
                                                <span className="text-slate-400">{log.career}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                                                    log.type === 'Ingreso'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                }`}
                                            >
                                                {log.type}
                                            </div>
                                            <p className="text-sm text-slate-400 whitespace-nowrap">
                                                {log.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AdminCard>

                        {/* Alerts */}
                        <AdminCard>
                            <h2 className="text-xl font-bold text-white mb-4">
                                Alertas automáticas del sistema
                            </h2>
                            <div className="space-y-3">
                                {data.alerts.map((alert, idx) => {
                                    const bgClass =
                                        alert.level === 'critical'
                                            ? 'border-l-4 border-l-red-500 bg-red-500/10'
                                            : alert.level === 'warning'
                                                ? 'border-l-4 border-l-yellow-500 bg-yellow-500/10'
                                                : 'border-l-4 border-l-cyan-400 bg-cyan-400/10';

                                    const iconClass =
                                        alert.level === 'critical'
                                            ? 'text-red-400'
                                            : alert.level === 'warning'
                                                ? 'text-yellow-400'
                                                : 'text-cyan-400';

                                    return (
                                        <div key={idx} className={`${bgClass} rounded-lg p-4 flex gap-3`}>
                                            <AlertCircle
                                                size={20}
                                                className={`flex-shrink-0 mt-0.5 ${iconClass}`}
                                            />
                                            <p className="text-sm text-slate-200">{alert.message}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </AdminCard>
                    </div>
                </>
            )}
        </div>
    );

    return <AdminShell>{content}</AdminShell>;
}