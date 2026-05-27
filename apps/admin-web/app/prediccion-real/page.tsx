'use client';

import { useEffect, useState } from 'react';
import { getPredictionVsReal } from '@/services/adminApi';
import { PredictionVsRealResponse } from '@/types/admin';
import { AdminShell } from '@/components/AdminShell';
import { AdminCard } from '@/components/AdminCard';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { RealVsPredictedChart } from '@/components/charts/RealVsPredictedChart';

export default function PrediccionRealPage() {
    const [data, setData] = useState<PredictionVsRealResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            setError(false);
            const result = await getPredictionVsReal();
            setData(result);
        } catch (err) {
            console.error('Error loading prediction vs real:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const content = (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                    Predicción vs Aforo Real
                </h1>
                <p className="text-slate-400">
                    Comparación entre el comportamiento observado y la predicción generada por el
                    modelo.
                </p>
            </div>

            {loading && <LoadingState />}
            {error && <ErrorState onRetry={loadData} />}

            {!loading && !error && data && (
                <>
                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                            <p className="text-sm text-slate-400 mb-2">Precisión estimada</p>
                            <p className="text-3xl font-bold text-white">{data.kpis.estimatedAccuracy}</p>
                        </div>
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                            <p className="text-sm text-slate-400 mb-2">Error promedio</p>
                            <p className="text-3xl font-bold text-white">{data.kpis.meanError}</p>
                        </div>
                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                            <p className="text-sm text-slate-400 mb-2">Bloques correctamente clasificados</p>
                            <p className="text-3xl font-bold text-white">
                                {data.kpis.correctlyClassifiedBlocks}
                            </p>
                        </div>
                    </div>

                    {/* Chart */}
                    <AdminCard variant="chart">
                        <h2 className="text-xl font-bold text-white mb-4">
                            Comparación: Aforo Real vs Predicho
                        </h2>
                        <div className="h-80">
                            <RealVsPredictedChart data={data.series} />
                        </div>

                    </AdminCard>

                    {/* Table */}
                    <AdminCard>
                        <h2 className="text-xl font-bold text-white mb-4">Tabla de comparación</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Hora
                                    </th>
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Aforo real
                                    </th>
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Aforo predicho
                                    </th>
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Diferencia
                                    </th>
                                    <th className="text-left text-xs font-semibold text-slate-400 py-4 px-4">
                                        Evaluación
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.table.map((row, idx) => {
                                    const evalColor =
                                        row.evaluation === 'Correcto'
                                            ? 'text-green-400'
                                            : row.evaluation === 'Aceptable'
                                                ? 'text-yellow-400'
                                                : 'text-red-400';

                                    return (
                                        <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-750">
                                            <td className="py-4 px-4 text-sm font-semibold text-slate-300">
                                                {row.hour}
                                            </td>
                                            <td className="py-4 px-4 text-sm text-white font-semibold">
                                                {row.real}
                                            </td>
                                            <td className="py-4 px-4 text-sm text-cyan-400 font-semibold">
                                                {row.predicted}
                                            </td>
                                            <td className="py-4 px-4 text-sm text-slate-300">{row.difference}</td>
                                            <td className={`py-4 px-4 text-sm font-semibold ${evalColor}`}>
                                                {row.evaluation}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </AdminCard>

                    {/* Interpretation */}
                    <AdminCard>
                        <h2 className="text-xl font-bold text-white mb-4">Interpretación del modelo</h2>
                        <p className="text-slate-300 leading-relaxed">{data.interpretation}</p>
                    </AdminCard>
                </>
            )}
        </div>
    );

    return <AdminShell>{content}</AdminShell>;
}