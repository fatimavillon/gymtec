import { type ReactNode } from "react" // Eliminado React, importado type ReactNode

interface SectionCardProps {
    title: string
    children: ReactNode // Usar ReactNode directamente
    className?: string
}

export default function SectionCard({
                                        title,
                                        children,
                                        className = "",
                                    }: SectionCardProps) {
    return (
        <div className={`space-y-3 ${className}`}>
            <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                {title}
            </h3>
            <div>{children}</div>
        </div>
    )
}