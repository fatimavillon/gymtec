'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudentAppShell } from '@/components/StudentAppShell';
import { Card } from '@/components/Card';
import { BackButton } from '@/components/BackButton';
import { HeaderBlue } from '@/components/HeaderBlue';
import { DayChip } from '@/components/DayChip';
import { TimeSelect } from '@/components/TimeSelect';
import { PreferenceOption } from '@/components/PreferenceOption';
import { LoadingState } from '@/components/LoadingState';
import { Calendar, Clock, Settings, Sparkles } from 'lucide-react';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const PREFERENCES = [
    {
        id: 'min-occupancy',
        title: 'Mínimo aforo proyectado',
        description: 'Prioriza horarios menos congestionados',
    },
    {
        id: 'classes',
        title: 'Cercano a mis clases UTEC',
        description: 'Optimiza según tu horario académico',
    },
    {
        id: 'balanced',
        title: 'Balanceado',
        description: 'Combina disponibilidad y aforo',
    },
];

export default function Recomendacion() {
    const router = useRouter();
    const [selectedDays, setSelectedDays] = useState(['Lun', 'Mié', 'Vie']);
    const [startHour, setStartHour] = useState('08:00 AM');
    const [endHour, setEndHour] = useState('08:00 PM');
    const [selectedPreference, setSelectedPreference] = useState('min-occupancy');
    const [loading, setLoading] = useState(false);

    function toggleDay(day: string) {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    }

    async function handleCalculate() {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 800));
            router.push('/resultado');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <StudentAppShell>
                <div className="p-6">
                    <LoadingState />
                </div>
            </StudentAppShell>
        );
    }

    return (
        <StudentAppShell>
            {/* Header */}
            <HeaderBlue
                title="Optimizar horario"
            >
                <BackButton href="/home" />
                <p className="text-sm text-blue-100 mt-4">
                    Encuentra el mejor bloque para entrenar según tus preferencias
                </p>
            </HeaderBlue>

            <div className="px-6 py-6 space-y-6">
                {/* Days Selection */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar size={20} className="text-blue-600" strokeWidth={2} />
                        <h3 className="font-bold text-slate-900">Días disponibles</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {DAYS.map((day) => (
                            <DayChip
                                key={day}
                                label={day}
                                active={selectedDays.includes(day)}
                                onClick={() => toggleDay(day)}
                            />
                        ))}
                    </div>
                </Card>

                {/* Time Range */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Clock size={20} className="text-blue-600" strokeWidth={2} />
                        <h3 className="font-bold text-slate-900">Rango horario</h3>
                    </div>
                    <div className="space-y-4">
                        <TimeSelect label="Desde" value={startHour} onChange={setStartHour} />
                        <TimeSelect label="Hasta" value={endHour} onChange={setEndHour} />
                    </div>
                </Card>

                {/* Preferences */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <Settings size={20} className="text-blue-600" strokeWidth={2} />
                        <h3 className="font-bold text-slate-900">Preferencia principal</h3>
                    </div>
                    <div className="space-y-3">
                        {PREFERENCES.map((pref) => (
                            <PreferenceOption
                                key={pref.id}
                                title={pref.title}
                                description={pref.description}
                                active={selectedPreference === pref.id}
                                onClick={() => setSelectedPreference(pref.id)}
                            />
                        ))}
                    </div>
                </Card>

                {/* Calculate Button */}
                <button
                    onClick={handleCalculate}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Sparkles size={20} strokeWidth={2} />
                    Calcular horario perfecto
                </button>
            </div>
        </StudentAppShell>
    );
}