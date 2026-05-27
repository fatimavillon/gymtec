'use client';

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
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <p className="text-center text-slate-300 mb-6">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2 bg-cyan-400 text-slate-950 rounded-lg font-semibold hover:bg-cyan-300 transition-colors"
                >
                    Intentar de nuevo
                </button>
            )}
        </div>
    );
}