'use client';

interface DayChipProps {
    label: string;
    active: boolean;
    onClick: () => void;
    className?: string;
}

export function DayChip({ label, active, onClick, className = '' }: DayChipProps) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                active
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            } ${className}`}
        >
            {label}
        </button>
    );
}