'use client';

interface FilterBarProps {
    filters: Record<string, string | React.ReactNode>;
    className?: string;
}

export function FilterBar({ filters, className = '' }: FilterBarProps) {
    return (
        <div
            className={`bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6 ${className}`}
        >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(filters).map(([key, value]) => (
                    <div key={key}>
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                            {key}
                        </p>
                        <p className="text-sm font-semibold text-white">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}