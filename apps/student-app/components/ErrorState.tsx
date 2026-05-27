'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export function ErrorState({
                               message = 'No pudimos cargar la información. Intenta nuevamente.',
                               onRetry,
                           }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <p className="text-center text-slate-600 mb-6">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Intentar de nuevo
                </button>
            )}
        </div>
    );
}