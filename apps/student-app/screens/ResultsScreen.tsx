"use client"

import { useEffect, useState } from "react" // Eliminado React
import { ChevronLeft } from "lucide-react"
import type { NavigateFn, ScheduleOption, UserPreferences, ScreenName } from "@/types/gymtec"
import StatCard from "@/components/gymtec/StatCard"
import OccupancyBadge from "@/components/gymtec/OccupancyBadge"
import PrimaryButton from "@/components/gymtec/PrimaryButton"
import { getRecommendedSlots, getUserPreferences } from "@/services/gymtec-api"
import { getDayLabel } from "@/lib/utils"

interface ResultsScreenProps {
    onNavigate: NavigateFn
}

export default function ResultsScreen({ onNavigate }: ResultsScreenProps) {
    const [recommended, setRecommended] = useState<ScheduleOption | null>(null)
    const [alternatives, setAlternatives] = useState<ScheduleOption[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadRecommendations = async () => {
            setIsLoading(true)
            const userPrefs: UserPreferences = await getUserPreferences(); // Usar las preferencias mockeadas del usuario
            const { recommended, alternatives } = await getRecommendedSlots(userPrefs)
            setRecommended(recommended)
            setAlternatives(alternatives)
            setIsLoading(false)
        }
        loadRecommendations()
    }, [])

    // Listener para navegación desde BottomNav
    useEffect(() => {
        const handleNavigateEvent = (event: Event) => {
            const customEvent = event as CustomEvent<ScreenName>
            // Si el evento no es para ResultsScreen, lo maneja el onNavigate
            if (customEvent.detail !== 'results') {
                onNavigate(customEvent.detail)
            }
        }

        window.addEventListener("navigate", handleNavigateEvent)
        return () => window.removeEventListener("navigate", handleNavigateEvent)
    }, [onNavigate])


    if (isLoading) {
        return (
            <div className="px-5 py-6 space-y-6"> {/* Eliminar pb-28, se maneja en PhoneShell */}
                <p className="text-neutral-500 text-center mt-8">Calculando horarios óptimos...</p>
            </div>
        )
    }

    if (!recommended) {
        return (
            <div className="px-5 py-6 space-y-6"> {/* Eliminar pb-28, se maneja en PhoneShell */}
                <p className="text-danger text-center mt-8">No se encontraron horarios óptimos.</p>
                <PrimaryButton onClick={() => onNavigate("optimize")}>
                    Reajustar preferencias
                </PrimaryButton>
            </div>
        )
    }

    return (
        <div className="px-5 py-6 space-y-6"> {/* Eliminar pb-28, se maneja en PhoneShell */}
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onNavigate("optimize")}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-neutral-700" />
                </button>
                <h1 className="text-2xl font-bold text-neutral-900">
                    Horarios óptimos
                </h1>
            </div>

            {/* Opción Recomendada */}
            <StatCard title="Opción recomendada" highlighted borderColor="border-success">
                <p className="text-2xl font-bold text-neutral-900">
                    {getDayLabel(recommended.day)}, {recommended.time}
                </p>
                <div className="mt-2">
                    <OccupancyBadge
                        occupancy={recommended.occupancy}
                        label={`Aforo esperado: ${recommended.occupancy}%`}
                    />
                </div>
                <PrimaryButton
                    variant="outline"
                    onClick={() => onNavigate("detail")}
                    className="mt-4"
                >
                    Reservar agenda
                </PrimaryButton>
            </StatCard>

            {/* Otras Opciones */}
            {alternatives.length > 0 && (
                <StatCard title="Otras opciones válidas">
                    <div className="space-y-3 mt-4"> {/* Aumentar space-y */}
                        {alternatives.map((option, index) => (
                            <div
                                key={index}
                                className="p-4 bg-neutral-100 rounded-2xl flex items-center justify-between"
                            >
                                <div>
                                    <p className="font-semibold text-neutral-900">
                                        {getDayLabel(option.day)} {option.time}
                                    </p>
                                </div>
                                <OccupancyBadge occupancy={option.occupancy} size="sm" />
                            </div>
                        ))}
                    </div>
                </StatCard>
            )}

            {/* Explicación */}
            <StatCard title="¿Por qué este horario?">
                <p className="text-sm text-neutral-700 leading-relaxed">
                    Cruce analítico óptimo: coincide con tus bloques libres y la densidad
                    de clases presenciales en campus es mínima.
                </p>
            </StatCard>

            {/* Botón Principal */}
            <div className="mt-8"> {/* Margen superior para separarlo */}
                <PrimaryButton onClick={() => onNavigate("detail")}>
                    Ver detalles del bloque
                </PrimaryButton>
            </div>
        </div>
    )
}