'use client';

import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'white' | 'subtle' | 'success' | 'alert';
    onClick?: () => void;
}

export function Card({
                         children,
                         className = '',
                         variant = 'white',
                         onClick,
                     }: CardProps) {
    const baseClasses =
        'rounded-2xl transition-shadow';

    const variantClasses = {
        white: 'bg-white shadow-sm p-5',
        subtle: 'bg-slate-50 border border-slate-200 p-5',
        success: 'bg-green-500 text-white p-6',
        alert: 'bg-red-50 border border-red-200 p-4',
    };

    const interactiveClasses = onClick ? 'cursor-pointer hover:shadow-md' : '';

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
}