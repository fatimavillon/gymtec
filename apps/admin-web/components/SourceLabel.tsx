'use client';

interface SourceLabelProps {
    source: string;
    className?: string;
}

export function SourceLabel({ source, className = '' }: SourceLabelProps) {
    return (
        <p className={`text-xs text-cyan-400 font-semibold ${className}`}>
            Fuente: {source}
        </p>
    );
}