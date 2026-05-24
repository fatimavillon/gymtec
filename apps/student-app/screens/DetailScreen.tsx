"use client"

import { useEffect, useState } from "react" // Eliminado React
import { ChevronLeft, Check } from "lucide-react"
import type { NavigateFn, ScheduleOption, ScreenName, UserPreferences } from "@/types/gymtec"
import StatCard from "@/components/gymtec/StatCard"
import OccupancyBadge from "@/components/gymtec/OccupancyBadge"
import ScheduleRow from "@/components/gymtec/ScheduleRow"
import PrimaryButton from "@/components/gymtec/PrimaryButton"
import { getAlgorithmFactors, getBlockComparison, getRecommendedSlots, getUserPreferences } from "@/services/gymtec-api"
import { getDayLabel } from "@/lib/utils"

interface DetailScreenProps {
    onNavigate: NavigateFn
}

export default function DetailScreen({ onNavigate }: DetailScreenProps) {
    const [showAlert, setShowAlert] = useState(false)
    const [algorithmFactors, setAlgorithmFactors] = useState<string[]>([])
    const [blockComparison, setBlockComparison] = useState<ScheduleOption[]>([])
    const [recommendedSlot, setRecommendedSlot] = useState<ScheduleOption | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            const factors = await getAlgorithmFactors()
            const comparison = await getBlockComparison()
            // Simular que obtenemos preferencias reales para la recomendación
            const userPrefs: UserPreferences = await getUserPreferences(); // Usar las preferencias mockeadas del usuario
            const { recommended } = await getRecommendedSlots(userPrefs)

            setAlgorithmFactors(factors)
            setBlockComparison(comparison)
            setRecommendedSlot(recommended)
            setIsLoading(false)
        }
        loadData()
    }, [])

    // Listener para navegación desde BottomNav
    useEffect(() => {
        const handleNavigateEvent = (event: Event) => {
            const customEvent = event as CustomEvent<ScreenName>
            // Si el evento no es para DetailScreen, lo maneja el onNavigate
            if (customEvent.detail !== 'detail') {
                onNavigate(customEvent.detail)
            }
        }

        window.addEventListener("navigate", handleNavigateEvent)
        return () => window.removeEventListener("navigate", handleNavigateEvent)
    }, [onNavigate])

    const handleCreateAlert = () => {
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 2000)
        // Aquí se podría llamar a services.createAlert(recommendedSlot)
    }

    if (isLoading) {
        return (
            <div className="px-5 py-6 space-y-6"> {/* Eliminar pb-32, se maneja en PhoneShell */}
                <p className="text-neutral-500 text-center mt-8">Cargando detalles...</p>
            </div>
        )
    }

    if (!recommendedSlot) {
        return (
            <div className="px-5 py-6 space-y-6"> {/* Eliminar pb-32, se maneja en PhoneShell */}
                <p className="text-danger text-center mt-8">No se pudo cargar el slot recomendado.</p>
                <PrimaryButton onClick={() => onNavigate("results")}>
                    Volver a resultados
                </PrimaryButton>
            </div>
        )
    }

    return (
        <div className="px-5 py-6 space-y-6"> {/* Eliminar pb-32, se maneja en PhoneShell */}
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onNavigate("results")}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-neutral-700" />
                </button>
                <h1 className="text-2xl font-bold text-neutral-900">
                    Detalle del bloque
                </h1>
            </div>

            {/* Encabezado Central */}
            <div className="text-center space-y-3 mt-8">
                <p className="text-2xl font-bold text-neutral-900">
                    {getDayLabel(recommendedSlot.day)}, {recommendedSlot.time}
                </p>
                <OccupancyBadge
                    occupancy={recommendedSlot.occupancy}
                    size="lg"
                    label="Ocupación proyectada: Baja"
                />
            </div>

            {/* Factores del Algoritmo */}
            <StatCard title="Factores del algoritmo">
                <div className="space-y-3 mt-4">
                    {algorithmFactors.map((factor, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-neutral-700">{factor}</span>
                        </div>
                    ))}
                </div>
            </StatCard>

            {/* Comparativa de Bloques */}
            <StatCard title="Comparativa de bloques">
                <div className="space-y-2 mt-4">
                    {blockComparison.map((item, index) => (
                        <ScheduleRow
                            key={index}
                            time={item.time}
                            occupancy={item.occupancy}
                            highlighted={item.time === recommendedSlot.time} // Resaltar el slot actual
                            label={item.time === recommendedSlot.time ? "(Tu slot)" : ""}
                        />
                    ))}
                </div>
            </StatCard>

            {/* Toast de alerta */}
            {showAlert && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-11/12 max-w-sm bg-success border border-green-600 text-white px-4 py-3 rounded-xl shadow-lg z-50 animate-slide-in flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold">Alerta creada para {getDayLabel(recommendedSlot.day)} {recommendedSlot.time}</span>
                </div>
            )}

            {/* Botones Inferiores (scrollable) */}
            <div className="mt-8 space-y-3">
                <PrimaryButton
                    variant="outline"
                    onClick={handleCreateAlert}
                >
                    Crear alerta
                </PrimaryButton>
                <PrimaryButton onClick={() => onNavigate("my-schedule")}>
                    Confirmar slot
                </PrimaryButton>
            </div>
        </div>
    )
}