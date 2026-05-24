interface AdminMetricCardProps {
    label: string
    value: string | number
    accent?: "cyan" | "yellow" | "green" | "red"
}

export default function AdminMetricCard({
                                            label,
                                            value,
                                            accent = "cyan",
                                        }: AdminMetricCardProps) {
    const accentColorClasses = {
        cyan: "border-cyan-500 text-cyan-500",
        yellow: "border-warning-500 text-warning-500",
        green: "border-success-500 text-success-500",
        red: "border-danger-500 text-danger-500",
    }

    return (
        <div className={`border-l-4 rounded-lg p-6 space-y-2 bg-slate-800 border-slate-700 shadow-dark-sm ${accentColorClasses[accent]}`}>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                {label}
            </p>
            <p className="text-4xl font-bold">
                {value}
            </p>
        </div>
    )
}