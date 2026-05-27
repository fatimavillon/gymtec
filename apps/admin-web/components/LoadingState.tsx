'use client';

export function LoadingState() {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin">
                <div className="w-8 h-8 border-4 border-slate-700 border-t-cyan-400 rounded-full" />
            </div>
        </div>
    );
}