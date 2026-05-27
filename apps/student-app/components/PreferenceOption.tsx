'use client';

interface PreferenceOptionProps {
    title: string;
    description: string;
    active: boolean;
    onClick: () => void;
}

export function PreferenceOption({
                                     title,
                                     description,
                                     active,
                                     onClick,
                                 }: PreferenceOptionProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                active
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
        >
            <div className="flex items-start gap-3">
                <div
                    className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        active ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}
                >
                    {active && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{description}</p>
                </div>
            </div>
        </button>
    );
}