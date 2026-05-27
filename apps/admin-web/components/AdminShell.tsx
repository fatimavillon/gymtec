'use client';

import React from 'react';
import { Sidebar } from './Sidebar';

interface AdminShellProps {
    children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
    return (
        <div className="flex h-screen bg-slate-950">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 ml-64 overflow-y-auto">
                <div className="min-h-full px-8 py-8">{children}</div>
            </main>
        </div>
    );
}