'use client';

import React from 'react';

interface AdminCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'dark' | 'chart';
}

export function AdminCard({
                              children,
                              className = '',
                              variant = 'default',
                          }: AdminCardProps) {
    const baseClasses = 'rounded-lg p-6 border transition-colors';

    const variantClasses = {
        default: 'bg-slate-800 border-slate-700',
        dark: 'bg-slate-850 border-slate-700/50',
        chart: 'bg-slate-800 border-slate-700 h-96',
    };

    return (
        <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {children}
        </div>
    );
}