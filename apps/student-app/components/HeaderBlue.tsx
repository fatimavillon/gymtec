'use client';

import React from 'react';

interface HeaderBlueProps {
    title: string;
    subtitle?: string;
    label?: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}

export function HeaderBlue({
                               title,
                               subtitle,
                               label,
                               description,
                               children,
                               className = '',
                           }: HeaderBlueProps) {
    return (
        <div
            className={`bg-gradient-to-b from-blue-900 to-blue-800 rounded-b-3xl pt-8 pb-12 px-6 ${className}`}
        >
            {children}
            {label && <p className="text-xs font-semibold text-blue-100 mb-2">{label}</p>}
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            {subtitle && <p className="text-sm text-blue-100 mb-4">{subtitle}</p>}
            {description && <p className="text-sm text-blue-100">{description}</p>}
        </div>
    );
}