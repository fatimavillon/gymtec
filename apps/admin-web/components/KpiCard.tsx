'use client';

import { AdminKpi } from '@/types/admin';
import { getStatusBgClass } from '@/lib/utils';

interface KpiCardProps {
    kpi: AdminKpi;
    className?: string;
}

export function KpiCard({ kpi, className = '' }: KpiCardProps) {
    return (
        <div className={`bg-slate-800 border border-slate-700 rounded-lg p-6 ${className}`}>
            <div className="flex items-end justify-between gap-4">
                <div className="flex-1">
                    <p className="text-3xl font-bold text-white mb-2">{kpi.value}</p>
                    {kpi.source && (
                        <p className="text-xs text-cyan-400 font-semibold">{kpi.source}</p>
                    )}
                </div>
                {kpi.status && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusBgClass(kpi.status)}`}>
            {kpi.status}
          </span>
                )}
            </div>
        </div>
    );
}