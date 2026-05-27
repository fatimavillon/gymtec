'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, Zap } from 'lucide-react';

export function BottomNav() {
    const pathname = usePathname();

    const getActiveTab = (): 'home' | 'prediccion' | 'recomendacion' => {
        if (pathname === '/home' || pathname === '/') return 'home';
        if (pathname === '/prediccion') return 'prediccion';
        if (pathname === '/recomendacion' || pathname === '/resultado') return 'recomendacion';
        return 'home';
    };

    const activeTab = getActiveTab();

    const navItems = [
        { id: 'home', label: 'Inicio', icon: Home, href: '/home' },
        { id: 'prediccion', label: 'Predicción', icon: BarChart3, href: '/prediccion' },
        { id: 'recomendacion', label: 'Recom.', icon: Zap, href: '/recomendacion' },
    ] as const;

    return (
        <nav className="w-full bg-white border-t border-slate-200 h-24 flex items-center justify-around px-4">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                    <Link
                        key={item.id}
                        href={item.href}
                        className="flex flex-col items-center justify-center gap-1.5 py-3 transition-colors duration-200"
                    >
                        <Icon
                            size={28}
                            className={isActive ? 'text-blue-600' : 'text-slate-500'}
                            strokeWidth={1.5}
                        />
                        <span
                            className={`text-xs font-semibold whitespace-nowrap transition-colors ${
                                isActive ? 'text-blue-600' : 'text-slate-500'
                            }`}
                        >
              {item.label}
            </span>
                    </Link>
                );
            })}
        </nav>
    );
}