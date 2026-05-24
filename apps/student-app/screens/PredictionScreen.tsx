"use client"

import { useEffect, useState } from "react" // Eliminado React
import { ChevronLeft } from "lucide-react"
import StatCard from "@/components/gymtec/StatCard"
import ScheduleRow from "@/components/gymtec/ScheduleRow"
import SectionCard from "@/components/gymtec/SectionCard"
import WeeklyTrendChart from "@/components/charts/WeeklyTrendChart"
import type { NavigateFn, ScheduleOption, WeeklyTrendPoint, ScreenName } from "@/types/gymtec"
import { getTodaySchedules, getWeeklyTrend } from "@/services/gymtec-api"
import { getDayLabel } from "@/lib/utils"

interface PredictionScreenProps {
    onNavigate: NavigateFn
}

export default function PredictionScreen({
                                             onNavigate,
                                         }: PredictionScreenProps) {
    const [selectedDay, setSelectedDay] = useState("lunes")
    const [schedules, setSchedules] = useState<ScheduleOption[]>([])
    const [weeklyTrend, setWeeklyTrend] = useState<WeeklyTrendPoint[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const dayKeys = [
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
    ]

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            const [sched, weekly] = await Promise.all([
                getTodaySchedules(selectedDay),
                getWeeklyTrend(),
            ])
            setSchedules(sched)
            setWeeklyTrend(weekly)
            setIsLoading(false)
        }

        loadData()
    }, [selectedDay])

    // Listener para navegación desde BottomNav
    useEffect(() => {
        const handleNavigateEvent = (event: Event) => {
            const customEvent = event as CustomEvent<ScreenName>
            onNavigate(customEvent.detail)
        }

        window.addEventListener("navigate", handleNavigateEvent)
        return () => window.removeEventListener("navigate", handleNavigateEvent)
    }, [onNavigate])


    return (
        <div className="px-5 py-6 space-y-6"> {/* Eliminar pb-28, ya se maneja en PhoneShell */}
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onNavigate("home")}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-neutral-700" /> {/* Icono más grande */}
                </button>
                <h1 className="text-2xl font-bold text-neutral-900">
                    Predicción de aforo
                </h1>
            </div>

            {/* Day Selector */}
            <SectionCard title="Selecciona un día">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {dayKeys.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                                selectedDay === day
                                    ? "bg-primary text-white shadow-sm"
                                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            }`}
                        >
                            {getDayLabel(day)}
                        </button>
                    ))}
                </div>
            </SectionCard>

            {/* Horarios de Hoy */}
            <StatCard title={`Horarios de ${getDayLabel(selectedDay)}`}>
                {isLoading ? (
                    <p className="text-neutral-500">Cargando horarios...</p>
                ) : schedules.length > 0 ? (
                    <div className="space-y-2 mt-4">
                        {schedules.map((item, index) => (
                            <ScheduleRow
                                key={index}
                                time={item.time}
                                occupancy={item.occupancy}
                                label={`${getDayLabel(item.day)} - ${item.level}`}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-neutral-500">No hay horarios disponibles para este día.</p>
                )}
            </StatCard>

            {/* Tendencia Semanal */}
            <StatCard title="Tendencia semanal">
                {isLoading ? (
                    <p className="text-neutral-500">Cargando tendencia...</p>
                ) : weeklyTrend.length > 0 ? (
                    <WeeklyTrendChart data={weeklyTrend} />
                ) : (
                    <p className="text-neutral-500">No hay datos de tendencia semanal disponibles.</p>
                )}
            </StatCard>
        </div>
    )
}