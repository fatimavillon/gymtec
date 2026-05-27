'use client';

import React, { useEffect, useState } from 'react';
import { BottomNav } from './BottomNav';
import { usePathname } from 'next/navigation';

interface StudentAppShellProps {
    children: React.ReactNode;
}

export function StudentAppShell({ children }: StudentAppShellProps) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Hide bottom nav on welcome screen
    const showBottomNav = pathname !== '/';

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 p-2 sm:p-4">
            <div className="relative w-full max-w-[430px] bg-slate-50 min-h-screen flex flex-col overflow-hidden">
                {/* Main content area with scroll */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className={showBottomNav ? 'pb-32' : ''}>
                        {children}
                    </div>
                </main>

                {/* Fixed Bottom Nav */}
                {showBottomNav && (
                    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2">
                        <BottomNav />
                    </div>
                )}
            </div>
        </div>
    );
}