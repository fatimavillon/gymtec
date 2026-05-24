// import { type ReactNode } from "react" // ELIMINADO: 'ReactNode' no se utiliza en este componente
import { Clock, ChevronRight } from "lucide-react"
import OccupancyBadge from "./OccupancyBadge"

interface ScheduleRowProps {
    time: string
    occupancy: number
    label?: string
    highlighted?: boolean
    onClick?: () => void
    showChevron?: boolean
}

export default function ScheduleRow({
                                        time,
                                        occupancy,
                                        label,
                                        highlighted = false,
                                        onClick,
                                        showChevron = false,
                                    }: ScheduleRowProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 ${
                highlighted
                    ? "bg-success-100 border-2 border-success shadow-sm"
                    : "bg-neutral-100 hover:bg-neutral-200"
            }`}
        >
            <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                <div className="text-left">
                    <p className="font-semibold text-neutral-900">{time}</p>
                    {label && <p className="text-xs text-neutral-600 mt-0.5">{label}</p>}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <OccupancyBadge occupancy={occupancy} size="sm" />
                {showChevron && <ChevronRight className="w-4 h-4 text-neutral-400" />}
            </div>
        </button>
    )
}