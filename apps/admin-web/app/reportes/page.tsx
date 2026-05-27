'use client';

import { useEffect, useState } from 'react';
import { getWeeklyReport, generateWeeklyReport } from '@/services/adminApi';
import { WeeklyReportResponse } from '@/types/admin';
import { AdminShell } from '@/components/AdminShell';
import { AdminCard } from '@/components/AdminCard';
import { KpiCard } from '@/components/KpiCard';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { DemandByDayChart } from '@/components/charts/DemandByDayChart';
import { OccupancyDistributionChart } from '@/components/charts/OccupancyDistributionChart';
import { Download } from 'lucide-react';

export default function ReportesPage() {
    const [data, setData] = useState<WeeklyReportResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [exportLoading, setExportLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            setError(false);
            const result = await getWeeklyReport();
            setData(result);
        } catch (err) {
            console.error('Error loading reports:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    async function handleExport(format: 'PDF' | 'CSV') {
        setExportLoading(true);
        try {
            await generateWeeklyReport(format);
            setSuccessMessage('Reporte generado correctamente');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            console.error('Error exporting:', err);
        } finally {
            setExportLoading(false);
        }
    }

    const content = (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Reportes Básicos</h1>
                <p className="text-slate-400">
                    Resumen semanal para análisis administrativo y toma de decisiones.
                </p>
            </div>

            {/* Filter Bar with Export */}
            <AdminCard>
                <div className="flex items-center justify-between">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                                Período
                            </p>
                            {data && <p className="text-sm font-semibold text-white">{data.filters.period}</p>}
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Día</p>
                            {data && <p className="text-sm font-semibold text-white">{data.filters.day}</p>}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleExport('PDF')}
                            disabled={exportLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-slate-950 rounded-lg font-semibold text-sm hover:bg-cyan-300 transition-colors disabled:opacity-50"
                        >
                            <Download size={16} />
                            Exportar PDF
                        </button>
                        <button
                            onClick={() => handleExport('CSV')}
                            disabled={exportLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg font-semibold text-sm hover:bg-slate-600 transition-colors disabled:opacity-50"
                        >
                            <Download size={16} />
                            Exportar CSV
                        </button>
                    </div>
                </div>
            </AdminCard>

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-sm text-green-400">
                    {successMessage}
                </div>
            )}

            {loading && <LoadingState />}
            {error && <ErrorState onRetry={loadData} />}

            {!loading && !error && data && (
                <>
                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <KpiCard kpi={data.kpis.weeklyAverage} />
                        <KpiCard kpi={data.kpis.highestDemandDay} />
                        <KpiCard kpi={data.kpis.frequentPeakHour} />
                        <KpiCard kpi={data.kpis.mostRecommendedSlot} />
                    </div>

                    {/* Charts - 2 columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <AdminCard variant="chart">
                            <h2 className="text-xl font-bold text-white mb-4">Demanda por día</h2>
                            <div className="h-80">
                                <DemandByDayChart data={data.demandByDay} />
                            </div>
                        </AdminCard>

                        <AdminCard variant="chart">
                            <h2 className="text-xl font-bold text-white mb-4">
                                Distribución por nivel de ocupación
                            </h2>
                            <div className="h-80">
                                <OccupancyDistributionChart data={data.occupancyDistribution} />
                            </div>
                        </AdminCard>
                    </div>

                    {/* Weekly Summary Table */}
                    <AdminCard>
                        <h2 className="text-xl font-bold text-white mb-4">Resumen semanal</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Día
                                    </th>
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Aforo promedio
                                    </th>
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Hora pico
                                    </th>
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Recomendación
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.summary.map((row, idx) => (
                                    <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-750">
                                        <td className="py-4 px-4 text-sm font-semibold text-slate-300">
                                            {row.day}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-white font-semibold">
                                            {row.average}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-slate-300">{row.peakHour}</td>
                                        <td className="py-4 px-4 text-sm text-slate-400">
                                            {row.recommendation}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </AdminCard>

                    {/* Conclusion */}
                    <AdminCard>
                        <h2 className="text-xl font-bold text-white mb-4">Conclusión semanal</h2>
                        <p className="text-slate-300 leading-relaxed">{data.conclusion}</p>
                    </AdminCard>
                </>
            )}
        </div>
    );

    return <AdminShell>{content}</AdminShell>;
}