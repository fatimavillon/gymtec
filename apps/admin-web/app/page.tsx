'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/services/adminApi';
import { Dumbbell } from 'lucide-react';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('admin.bienestar@utec.edu.pe');
    const [accessCode, setAccessCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await loginAdmin({
                email,
                accessCode,
            });

            if (response.success) {
                router.push('/dashboard');
            } else {
                setError(response.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-400 rounded-xl mb-6">
                        <Dumbbell size={32} className="text-slate-950" strokeWidth={2} />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        GYM<span className="text-cyan-400">TEC</span>
                    </h1>
                    <p className="text-slate-400">Panel Administrativo & Analytics</p>
                </div>

                {/* Description */}
                <p className="text-center text-slate-300 text-sm mb-8">
                    Monitorea el aforo del gimnasio UTEC, revisa predicciones y gestiona
                    recomendaciones operativas.
                </p>

                {/* Form Card */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                                Correo institucional (UTEC)
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                autoComplete="email"
                                suppressHydrationWarning
                                className="w-full bg-slate-750 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled:opacity-50"
                                placeholder="admin@utec.edu.pe"
                            />
                        </div>

                        {/* Access Code Field */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                                Código de acceso
                            </label>
                            <input
                                type="password"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                disabled={loading}
                                autoComplete="current-password"
                                suppressHydrationWarning
                                className="w-full bg-slate-750 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled:opacity-50"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            suppressHydrationWarning
                            className="w-full bg-cyan-400 text-slate-950 font-bold py-3 rounded-lg hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Ingresando...' : 'Ingresar al sistema'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-500">
                    Proyecto GYMTEC ·  2026-1
                </p>
            </div>
        </div>
    );
}