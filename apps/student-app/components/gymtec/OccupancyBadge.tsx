// import { type ReactNode } from "react" // ELIMINADO: 'ReactNode' no se utiliza en este componente
import { getOccupancyColor, getOccupancyBgColor, getOccupancyTextColor, getOccupancyLabel } from "@/lib/utils"

interface OccupancyBadgeProps {
    occupancy: number
    size?: "sm" | "md" | "lg"
    label?: string
}

export default function OccupancyBadge({
                                           occupancy,
                                           size = "md",
                                           label,
                                       }: OccupancyBadgeProps) {
    const color = getOccupancyColor(occupancy)
    const bgColor = getOccupancyBgColor(occupancy)
    const textColor = getOccupancyTextColor(occupancy)

    const sizeClasses = {
        sm: "px-2 py-1 text-xs gap-1",
        md: "px-2.5 py-1.5 text-sm gap-1.5",
        lg: "px-3 py-2 text-base gap-2",
    }

    const dotSizes = {
        sm: "6px",
        md: "8px",
        lg: "10px",
    }

    const displayLabel = label || getOccupancyLabel(occupancy)

    return (
        <div
            className={`inline-flex items-center rounded-full font-semibold ${sizeClasses[size]}`}
            style={{
                backgroundColor: bgColor,
                color: textColor,
            }}
        >
            <div
                className="rounded-full flex-shrink-0"
                style={{
                    width: dotSizes[size],
                    height: dotSizes[size],
                    backgroundColor: color,
                }}
            />
            {displayLabel}
        </div>
    )
}