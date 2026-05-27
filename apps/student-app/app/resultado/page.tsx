'use client';

import { useState } from 'react';
import { StudentAppShell } from '@/components/StudentAppShell';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { BackButton } from '@/components/BackButton';
import { HeaderBlue } from '@/components/HeaderBlue';
import { saveRecommendation } from '@/services/gymtecApi';
import { Calendar, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function Resultado() {
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const recommended = {
        day: 'Martes',
        hour: '10:00 AM',
        occupancy: 34,
        status: 'Bajo' as const,
    };

    const alternatives = [
        { day: 'Jueves', hour: '08:30 AM', occupancy: 40, status: 'Bajo' as const },
        { day: 'Viernes', hour: '02:00 PM', occupancy: 48, status: 'Medio' as const },
    ];

    async function handleSave() {
        setLoading(true);
        try {
            await saveRecommendation(recommended);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error('Error saving recommendation:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <StudentAppShell>
            {/* Header */}
            <HeaderBlue
                title="Horario recomendado"
            >
                <BackButton href="/recomendacion" />
            </HeaderBlue>

            <div className="px-6 py-6 space-y-6">
                {/* Success Message */}
                {saved && (
                    <Card variant="success" className="flex gap-3 items-center">
                        <CheckCircle size={20} className="flex-shrink-0" strokeWidth={2} />
                        <p className="text-sm font-semibold">Horario guardado correctamente</p>
                    </Card>
                )}

                {/* Recommended Card */}
                <Card variant="success">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={24} strokeWidth={2} />
                            <h2 className="text-xl font-bold">Opción recomendada</h2>
                        </div>
                        <Sparkles size={24} strokeWidth={2} />
                    </div>

                    <div className="bg-green-400 bg-opacity-30 rounded-xl p-5 space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                            <Calendar size={20} strokeWidth={2} />
                            <span className="font-semibold text-lg">{recommended.day}</span>
                        </div>
                        <div className="text-3xl font-bold">{recommended.hour}</div>
                        <div className="text-sm font-medium">
                            {recommended.occupancy}% — {recommended.status}
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full bg-white text-green-600 font-bold py-3 rounded-xl hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Guardando...' : 'Guardar horario'}
                    </button>
                </Card>

                {/* Alternative Options */}
                <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Otras opciones válidas</h3>
                    <div className="space-y-3">
                        {alternatives.map((alt, idx) => (
                            <Card key={idx} className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-slate-900">{alt.day}</p>
                                    <p className="text-sm text-slate-600">
                                        {alt.hour} • {alt.occupancy}%
                                    </p>
                                </div>
                                <StatusBadge status={alt.status} size="sm" />
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Why This Schedule */}
                <Card>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">¿Por qué este horario?</h3>
                    <p className="text-slate-600 text-sm mb-4">
                        Este bloque coincide con menor densidad de clases presenciales y menor ocupación
                        histórica del gimnasio.
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2 transition-colors">
                        Ver detalle <ArrowRight size={16} strokeWidth={2} />
                    </button>
                </Card>
            </div>
        </StudentAppShell>
    );
}