'use client';

import { OccupancyStatus } from '@/types/gymtec';

interface StatusBadgeProps {
    status: OccupancyStatus;
    className?: string;
    size?: 'sm' | 'md';
}

export function StatusBadge({
                                status,
                                className = '',
                                size = 'md',
                            }: StatusBadgeProps) {
    const baseClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

    const statusClasses = {
        Bajo: 'bg-green-100 text-green-700',
        Medio: 'bg-yellow-100 text-yellow-700',
        Alto: 'bg-red-100 text-red-700',
    };

    return (
        <span
            className={`${baseClasses} rounded-full font-semibold inline-block ${statusClasses[status]} ${className}`}
        >
      {status}
    </span>
    );
}