import { type ReactNode } from "react" // Eliminado React, importado type ReactNode

interface StatCardProps {
    title: string
    children?: ReactNode // Usar ReactNode directamente
    className?: string
    highlighted?: boolean
    borderColor?: string // Usado para card-highlighted
}

export default function StatCard({
                                     title,
                                     children,
                                     className = "",
                                     highlighted = false,
                                     borderColor = "",
                                 }: StatCardProps) {
    const baseClasses = `bg-white rounded-3xl shadow-md p-5 border border-neutral-300` // Borde suave
    const highlightClasses = highlighted ? `bg-gradient-to-br from-success-50 to-white ${borderColor}` : ""

    return (
        <div className={`${baseClasses} ${highlightClasses} ${className}`}>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                {title}
            </p>
            {children && <div className="mt-4">{children}</div>}
        </div>
    )
}