import type { HeatmapCell, OccupancyLevel } from "@/types/admin"

interface AdminHeatmapProps {
    data: HeatmapCell[]
}

export default function AdminHeatmap({ data }: AdminHeatmapProps) {
    const days = ["Lunes", "Martes", "Miér.", "Jueves", "Vier.", "Sáb."]
    const hours = ["09:00", "12:00", "15:00", "17:00"]

    const getOccupancyColorClasses = (level: OccupancyLevel) => {
        switch (level) {
            case "bajo":
                return "bg-success-600/20 text-success-500" // Verde suave
            case "medio":
                return "bg-warning-500/20 text-warning-500" // Amarillo suave
            case "alto":
                return "bg-danger-500/20 text-danger-500" // Rojo suave
            default:
                return "bg-slate-700 text-slate-400"
        }
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-slate-700"> {/* Contenedor con borde y rounded */}
            <table className="w-full text-left">
                <thead>
                <tr className="bg-slate-800">
                    <th className="px-4 py-3 text-slate-400 font-semibold text-sm w-20">
                        Hora
                    </th>
                    {days.map((day) => (
                        <th
                            key={day}
                            className="text-center px-4 py-3 text-slate-400 font-semibold text-sm"
                        >
                            {day}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {hours.map((hour) => (
                    <tr key={hour} className="border-t border-slate-700">
                        <td className="px-4 py-3 text-slate-300 font-semibold text-sm">
                            {hour}
                        </td>
                        {days.map((day) => {
                            const cell = data.find((d) => d.day === day && d.hour === hour)
                            return (
                                <td key={`${day}-${hour}`} className="text-center px-2 py-2">
                                    {cell ? (
                                        <div
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getOccupancyColorClasses(
                                                cell.level
                                            )}`}
                                        >
                                            {cell.percentage}%
                                        </div>
                                    ) : (
                                        <span className="text-slate-500 text-xs">—</span>
                                    )}
                                </td>
                            )
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}