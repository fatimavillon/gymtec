'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Eye,
    TrendingUp,
    FileText,
    Lightbulb,
    Settings,
} from 'lucide-react';

const navItems = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Monitoreo diario',
        href: '/monitoreo',
        icon: Eye,
    },
    {
        label: 'Predicción vs Real',
        href: '/prediccion-real',
        icon: TrendingUp,
    },
    {
        label: 'Reportes',
        href: '/reportes',
        icon: FileText,
    },
    {
        label: 'Recomendaciones',
        href: '/recomendaciones',
        icon: Lightbulb,
    },
    {
        label: 'Configuración',
        href: '/configuracion',
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-800 border-r border-slate-700 px-6 py-8 flex flex-col">
            {/* Logo */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">
                    GYM<span className="text-cyan-400">TEC</span>
                </h1>
                <p className="text-sm text-slate-400 mt-1">Panel Administrativo</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                        pathname === item.href ||
                        (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive
                                    ? 'bg-cyan-400 text-slate-950 font-semibold'
                                    : 'text-slate-300 hover:bg-slate-700'
                            }`}
                        >
                            <Icon size={20} strokeWidth={1.5} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="pt-8 border-t border-slate-700">
                <p className="text-xs text-slate-500 text-center">
                    Proyecto GYMTEC
                </p>
            </div>
        </aside>
    );
}