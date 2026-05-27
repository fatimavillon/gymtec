'use client';

import { AdminShell } from '@/components/AdminShell';
import { AdminCard } from '@/components/AdminCard';
import { Settings } from 'lucide-react';

export default function ConfiguracionPage() {
    const content = (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Configuración</h1>
                <p className="text-slate-400">
                    Ajustes y configuración del sistema GYMTEC Admin.
                </p>
            </div>

            {/* Placeholder */}
            <AdminCard>
                <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                    <Settings size={48} className="text-slate-500 mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Panel de configuración
                    </h2>
                    <p className="text-slate-400">
                        Esta sección está en desarrollo. Próximamente podrás configurar
                        parámetros del sistema.
                    </p>
                </div>
            </AdminCard>
        </div>
    );

    return <AdminShell>{content}</AdminShell>;
}