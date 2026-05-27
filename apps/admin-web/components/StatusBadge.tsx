'use client';

import { OccupancyStatus } from '@/types/admin';
import { getStatusBgClass } from '@/lib/utils';

interface StatusBadgeProps {
    status: OccupancyStatus | string;
    className?: string;
    size?: 'sm' | 'md';
}

export function StatusBadge({
                                status,
                                className = '',
                                size = 'md',
                            }: StatusBadgeProps) {
    const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

    return (
        <span
            className={`${sizeClass} rounded-full font-semibold inline-block ${getStatusBgClass(status)} ${className}`}
        >
      {status}
    </span>
    );
}