'use client';

import { useEffect, useState } from 'react';
import { getMonitoringDaily } from '@/services/adminApi';
import { MonitoringDailyResponse } from '@/types/admin';
import { AdminShell } from '@/components/AdminShell';
import { AdminCard } from '@/components/AdminCard';
import { KpiCard } from '@/components/KpiCard';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { HourlyBarChart } from '@/components/charts/HourlyBarChart';

export default function MonitoreoPage() {
    const [data, setData] = useState<MonitoringDailyResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            setError(false);
            const result = await getMonitoringDaily();
            setData(result);
        } catch (err) {
            console.error('Error loading monitoring:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const content = (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Monitoreo Diario de Aforo</h1>
                <p className="text-slate-400">
                    Seguimiento por hora del comportamiento del gimnasio durante el día.
                </p>
            </div>

            {/* Filter Bar */}
            <AdminCard>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Día</p>
                        {data && <p className="text-sm font-semibold text-white">{data.filters.day}</p>}
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                            Rango horario
                        </p>
                        {data && <p className="text-sm font-semibold text-white">{data.filters.range}</p>}
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Estado</p>
                        {data && <p className="text-sm font-semibold text-white">{data.filters.status}</p>}
                    </div>
                </div>
            </AdminCard>

            {loading && <LoadingState />}
            {error && <ErrorState onRetry={loadData} />}

            {!loading && !error && data && (
                <>
                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <KpiCard kpi={data.kpis.peakHour} />
                        <KpiCard kpi={data.kpis.lowestCongestion} />
                        <KpiCard kpi={data.kpis.variationVsYesterday} />
                    </div>

                    {/* Chart */}
                    <AdminCard variant="chart">
                        <h2 className="text-xl font-bold text-white mb-4">Aforo por hora</h2>
                        <div className="h-80">
                            <HourlyBarChart data={data.hourlyAforo} />
                        </div>
                    </AdminCard>

                    {/* Table */}
                    <AdminCard>
                        <h2 className="text-xl font-bold text-white mb-4">Detalle por horario</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Hora
                                    </th>
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Aforo observado
                                    </th>
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Estado
                                    </th>
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Observación operativa
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.table.map((row, idx) => (
                                    <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-750">
                                        <td className="py-4 px-4 text-sm text-slate-300 font-semibold">
                                            {row.hour}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-white font-semibold">
                                            {row.observed}
                                        </td>
                                        <td className="py-4 px-4">
                        <span
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-block ${
                                row.status === 'Bajo'
                                    ? 'bg-green-500/20 text-green-400'
                                    : row.status === 'Medio'
                                        ? 'bg-yellow-500/20 text-yellow-400'
                                        : 'bg-red-500/20 text-red-400'
                            }`}
                        >
                          {row.status}
                        </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-slate-400">
                                            {row.observation}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </AdminCard>
                </>
            )}
        </div>
    );

    return <AdminShell>{content}</AdminShell>;
}