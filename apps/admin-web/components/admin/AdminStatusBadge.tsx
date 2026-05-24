// import type { ReactNode } from "react" // ELIMINADO: ReactNode no se usa

interface AdminStatusBadgeProps {
    label: string // Etiqueta del badge
    variant?: "success" | "warning" | "danger" | "info" | "neutral" // Tipo de color
}

export default function AdminStatusBadge({
                                             label,
                                             variant = "neutral",
                                         }: AdminStatusBadgeProps) {
    const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold"

    // Clases específicas para cada variante, utilizando la paleta de Tailwind
    const variantClasses = {
        success: "bg-success-600/20 text-success-500 border border-success-500",
        warning: "bg-warning-500/20 text-warning-500 border border-warning-500",
        danger: "bg-danger-500/20 text-danger-500 border border-danger-500",
        info: "bg-cyan-500/20 text-cyan-500 border border-cyan-500",
        neutral: "bg-slate-700 text-slate-300 border border-slate-600",
    }

    // Color del punto circular dentro del badge
    const dotColor = {
        success: "bg-success-500",
        warning: "bg-warning-500",
        danger: "bg-danger-500",
        info: "bg-cyan-500",
        neutral: "bg-slate-400",
    }

    return (
        <span className={`${baseClasses} ${variantClasses[variant]}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor[variant]}`} />
            {label}
    </span>
    )
}