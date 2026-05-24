"use client"

import { useEffect, useState } from "react" // Eliminado React
import { Bell, Settings } from "lucide-react"
import type { NavigateFn, SavedSchedule, UserPreferences, ScreenName } from "@/types/gymtec"
import StatCard from "@/components/gymtec/StatCard"
import OccupancyBadge from "@/components/gymtec/OccupancyBadge"
import PrimaryButton from "@/components/gymtec/PrimaryButton"
import { getSavedSchedules, getAttendanceHistory, getUserPreferences } from "@/services/gymtec-api"
import { getDayLabel } from "@/lib/utils"

interface MyScheduleScreenProps {
    onNavigate: NavigateFn
}

export default function MyScheduleScreen({
                                             onNavigate,
                                         }: MyScheduleScreenProps) {
    const [upcomingSchedule, setUpcomingSchedule] = useState<SavedSchedule | null>(null)
    const [attendanceHistory, setAttendanceHistory] = useState<SavedSchedule[]>([])
    const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            const [saved, history, prefs] = await Promise.all([
                getSavedSchedules(),
                getAttendanceHistory(),
                getUserPreferences(),
            ])
            setUpcomingSchedule(saved.find(s => s.status === 'upcoming') || null)
            setAttendanceHistory(history)
            setUserPreferences(prefs)
            setIsLoading(false)
        }
        loadData()
    }, [])

    // Listener para navegación desde BottomNav
    useEffect(() => {
        const handleNavigateEvent = (event: Event) => {
            const customEvent = event as CustomEvent<ScreenName>
            onNavigate(customEvent.detail)
        }

        window.addEventListener("navigate", handleNavigateEvent)
        return () => window.removeEventListener("navigate", handleNavigateEvent)
    }, [onNavigate])

    if (isLoading) {
        return (
            <div className="px-5 py-6 space-y-6"> {/* Eliminar pb-28, se maneja en PhoneShell */}
                <p className="text-neutral-500 text-center mt-8">Cargando mis horarios...</p>
            </div>
        )
    }

    return (
        <div className="px-5 py-6 space-y-6"> {/* Eliminar pb-28, se maneja en PhoneShell */}
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-neutral-900">Mis horarios</h1>
                <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                    <Settings className="w-6 h-6 text-neutral-700" /> {/* Icono más grande */}
                </button>
            </div>

            {/* Próximo Entrenamiento */}
            {upcomingSchedule ? (
                <StatCard
                    title="Próximo entrenamiento"
                    highlighted
                    borderColor="border-success"
                >
                    <p className="text-xl font-bold text-neutral-900">
                        {getDayLabel(upcomingSchedule.day)}, {upcomingSchedule.time}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                        <OccupancyBadge
                            occupancy={upcomingSchedule.occupancy}
                            label="Aforo proyectado: Bajo"
                        />
                        <button className="p-2 hover:bg-blue-100 rounded-full transition-colors">
                            <Bell className="w-5 h-5 text-primary" />
                        </button>
                    </div>
                </StatCard>
            ) : (
                <StatCard title="Próximo entrenamiento">
                    <p className="text-neutral-500">No tienes entrenamientos próximos agendados.</p>
                    <PrimaryButton onClick={() => onNavigate("optimize")} className="mt-4">
                        Buscar nuevo horario
                    </PrimaryButton>
                </StatCard>
            )}


            {/* Historial de Asistencia */}
            {attendanceHistory.length > 0 && (
                <StatCard title="Historial de asistencia">
                    <div className="space-y-3 mt-4"> {/* Aumentar space-y */}
                        {attendanceHistory.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 bg-neutral-100 rounded-2xl flex items-center justify-between"
                            >
                                <div>
                                    <p className="font-semibold text-neutral-900">
                                        {getDayLabel(item.day)} {item.time}
                                    </p>
                                    <p className="text-xs text-neutral-600 mt-1">{item.status === 'completed' ? 'Completado' : item.status}</p>
                                </div>
                                <OccupancyBadge occupancy={item.occupancy} size="sm" />
                            </div>
                        ))}
                    </div>
                </StatCard>
            )}

            {/* Preferencia Base */}
            {userPreferences && (
                <StatCard title="Preferencia base activa">
                    <div className="space-y-3 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-success" />
                            <span className="text-sm font-medium text-neutral-700">
                {userPreferences.preference === 'min_occupancy' ? 'Bajo Aforo' : 'Otras preferencias'}
              </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-sm font-medium text-neutral-700">
                Rango: {userPreferences.startTime} a{' '}
                                {userPreferences.endTime}
              </span>
                        </div>
                    </div>
                </StatCard>
            )}
        </div>
    )
}