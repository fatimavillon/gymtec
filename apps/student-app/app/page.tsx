'use client';

import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { StudentAppShell } from '@/components/StudentAppShell';

export default function Welcome() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-6">
            <div className="w-full max-w-[430px] flex flex-col items-center justify-center text-center space-y-8">
                {/* Icon */}
                <div className="w-24 h-24 bg-blue-700 rounded-3xl flex items-center justify-center">
                    <Dumbbell size={56} className="text-white" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h1 className="text-5xl font-bold text-white">GYMTEC</h1>

                {/* Subtitle */}
                <p className="text-xl text-blue-100">Consulta el aforo del gimnasio UTEC</p>

                {/* Description Card */}
                <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
                    <p className="text-base text-blue-50 leading-relaxed">
                        Predice la ocupación, encuentra mejores horarios y entrena con menos congestión.
                    </p>
                </div>

                {/* Buttons */}
                <div className="w-full space-y-4 pt-4">
                    <Link
                        href="/home"
                        className="flex items-center justify-center w-full bg-white text-blue-900 font-bold py-4 rounded-2xl hover:bg-blue-50 transition-colors"
                    >
                        Continuar →
                    </Link>

                    <Link
                        href="/home"
                        className="flex items-center justify-center w-full bg-white/20 text-white font-bold py-4 rounded-2xl border border-white/30 hover:bg-white/30 transition-colors"
                    >
                        Ingresar con UTEC
                    </Link>
                </div>

                {/* Footer */}
                <p className="text-sm text-blue-200 mt-12">Proyecto universitario UTEC</p>
            </div>
        </div>
    );
}