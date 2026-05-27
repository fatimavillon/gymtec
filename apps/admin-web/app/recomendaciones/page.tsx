'use client';

import { useEffect, useState } from 'react';
import {
    getOperationalRecommendations,
    publishRecommendation,
    activateCongestionAlert,
    generateWeeklyReport,
} from '@/services/adminApi';
import { OperationalRecommendationsResponse } from '@/types/admin';
import { AdminShell } from '@/components/AdminShell';
import { AdminCard } from '@/components/AdminCard';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { getPriorityColor } from '@/lib/utils';
import { AlertCircle, Check, Zap } from 'lucide-react';

export default function RecomendacionesPage() {
    const [data, setData] = useState<OperationalRecommendationsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            setError(false);
            const result = await getOperationalRecommendations();
            setData(result);
        } catch (err) {
            console.error('Error loading recommendations:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    async function handlePublish() {
        setActionLoading(true);
        try {
            await publishRecommendation();
            setSuccessMessage('Recomendación publicada correctamente');
            setTimeout(() => setSuccessMessage(''), 3000);
        } finally {
            setActionLoading(false);
        }
    }

    async function handleActivateAlert() {
        setActionLoading(true);
        try {
            await activateCongestionAlert();
            setSuccessMessage('Alerta de congestión activada');
            setTimeout(() => setSuccessMessage(''), 3000);
        } finally {
            setActionLoading(false);
        }
    }

    async function handleGenerateReport() {
        setActionLoading(true);
        try {
            await generateWeeklyReport('PDF');
            setSuccessMessage('Reporte generado correctamente');
            setTimeout(() => setSuccessMessage(''), 3000);
        } finally {
            setActionLoading(false);
        }
    }

    const content = (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                    Recomendaciones Operativas
                </h1>
                <p className="text-slate-400">
                    Acciones sugeridas para reducir congestión y mejorar la experiencia del
                    estudiante.
                </p>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-sm text-green-400 flex items-center gap-2">
                    <Check size={18} />
                    {successMessage}
                </div>
            )}

            {loading && <LoadingState />}
            {error && <ErrorState onRetry={loadData} />}

            {!loading && !error && data && (
                <>
                    {/* Automatic Recommendations */}
                    <AdminCard>
                        <h2 className="text-xl font-bold text-white mb-6">Recomendaciones automáticas</h2>
                        <div className="space-y-4">
                            {data.automaticRecommendations.map((rec, idx) => (
                                <div
                                    key={idx}
                                    className="bg-slate-750 border border-slate-700 rounded-lg p-5"
                                >
                                    <div className="flex items-start gap-4">
                                        <Zap size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white mb-1">{rec.title}</h3>
                                            <p className="text-sm text-slate-300 mb-3">{rec.message}</p>
                                            <div className="flex items-center justify-between">
                        <span
                            className={`text-xs font-semibold ${getPriorityColor(rec.priority)}`}
                        >
                          {rec.priority}
                        </span>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AdminCard>

                    {/* Administrative Actions */}
                    <AdminCard>
                        <h2 className="text-xl font-bold text-white mb-6">Acciones administrativas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={handlePublish}
                                disabled={actionLoading}
                                className="bg-cyan-400 text-slate-950 font-bold py-3 rounded-lg hover:bg-cyan-300 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <Check size={18} />
                                Publicar recomendación
                            </button>
                            <button
                                onClick={handleActivateAlert}
                                disabled={actionLoading}
                                className="bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <AlertCircle size={18} />
                                Activar alerta
                            </button>
                            <button
                                onClick={handleGenerateReport}
                                disabled={actionLoading}
                                className="bg-slate-700 text-white font-bold py-3 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <Zap size={18} />
                                Generar reporte
                            </button>
                        </div>
                    </AdminCard>

                    {/* Justification */}
                    <AdminCard>
                        <h2 className="text-xl font-bold text-white mb-4">
                            Justificación de la recomendación
                        </h2>
                        <p className="text-slate-300 leading-relaxed">{data.justification}</p>
                    </AdminCard>

                    {/* Impact */}
                    <AdminCard>
                        <h2 className="text-xl font-bold text-white mb-6">Impacto esperado</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-750 rounded-lg p-5">
                                <p className="text-sm text-slate-400 mb-2">Reducción de congestión</p>
                                <p className="text-3xl font-bold text-red-400">
                                    {data.impact.congestionReduction}
                                </p>
                            </div>
                            <div className="bg-slate-750 rounded-lg p-5">
                                <p className="text-sm text-slate-400 mb-2">Mejor distribución horaria</p>
                                <p className="text-3xl font-bold text-green-400">
                                    {data.impact.scheduleDistributionImprovement}
                                </p>
                            </div>
                            <div className="bg-slate-750 rounded-lg p-5">
                                <p className="text-sm text-slate-400 mb-2">Mayor satisfacción esperada</p>
                                <p className="text-xl font-bold text-cyan-400">
                                    {data.impact.expectedSatisfaction}
                                </p>
                            </div>
                        </div>
                    </AdminCard>
                </>
            )}
        </div>
    );

    return <AdminShell>{content}</AdminShell>;
}