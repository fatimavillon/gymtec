"use client"

import { useEffect, useState } from "react"
import { Bell, User, LogOut } from "lucide-react"
import StatCard from "@/components/gymtec/StatCard"
import OccupancyBadge from "@/components/gymtec/OccupancyBadge"
import PrimaryButton from "@/components/gymtec/PrimaryButton"
import TodayPredictionChart from "@/components/charts/TodayPredictionChart"
import type { NavigateFn, CurrentOccupancyData, PredictionPoint, UserData, ScreenName } from "@/types/gymtec"
import {
    getCurrentOccupancy,
    getTodayPrediction,
} from "@/services/gymtec-api"
// import { cn } from "@/lib/utils" // ELIMINADO: 'cn' no se utiliza en este componente

interface HomeScreenProps {
    user: UserData | null
    onNavigate: NavigateFn
    onLogout: () => void
}

export default function HomeScreen({
                                       user,
                                       onNavigate,
                                       onLogout,
                                   }: HomeScreenProps) {
    const [currentOccupancy, setCurrentOccupancy] =
        useState<CurrentOccupancyData | null>(null)
    const [prediction, setPrediction] = useState<PredictionPoint[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            const [occupancy, pred] = await Promise.all([
                getCurrentOccupancy(),
                getTodayPrediction(),
            ])
            setCurrentOccupancy(occupancy)
            setPrediction(pred)
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

    const today = new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
    })

    // Usar un usuario mock si `user` es null (para el saludo)
    const displayUser = user || { name: "Fátima", email: "fatima@utec.edu.pe" };

    return (
        <div className="px-5 py-6 space-y-6"> {/* Eliminar pb-28, ya se maneja en PhoneShell */}
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">
                        Hola, {displayUser.name} 👋
                    </h1>
                    <p className="text-xs text-neutral-500 mt-1 capitalize">{today}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                        <Bell className="w-5 h-5 text-neutral-700" />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                        <User className="w-5 h-5 text-neutral-700" />
                    </button>
                    <button
                        onClick={onLogout}
                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                        title="Cerrar sesión"
                    >
                        <LogOut className="w-5 h-5 text-neutral-700" />
                    </button>
                </div>
            </div>

            {/* Logo */}
            <div className="text-center my-4"> {/* Margen vertical mejorado */}
                <p className="text-3xl font-black text-primary">GYMTEC</p>
            </div>

            {/* Current Occupancy Card */}
            {isLoading ? (
                <StatCard title="Aforo actual">
                    <p className="text-neutral-500">Cargando aforo...</p>
                </StatCard>
            ) : (
                currentOccupancy && (
                    <StatCard title="Aforo actual">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-5xl font-black text-neutral-900"> {/* Aforo más grande */}
                                    {currentOccupancy.percentage}%
                                </p>
                                <p className="text-sm text-neutral-600 mt-2"> {/* Texto más legible */}
                                    {currentOccupancy.recommendation}
                                </p>
                            </div>
                            <OccupancyBadge
                                occupancy={currentOccupancy.percentage}
                                size="lg"
                            />
                        </div>
                    </StatCard>
                )
            )}

            {/* Prediction Card */}
            {isLoading ? (
                <StatCard title="Predicción de hoy">
                    <p className="text-neutral-500">Cargando predicción...</p>
                </StatCard>
            ) : (
                prediction.length > 0 && (
                    <StatCard title="Predicción de hoy">
                        <TodayPredictionChart data={prediction} />
                    </StatCard>
                )
            )}

            {/* Button */}
            <PrimaryButton onClick={() => onNavigate("optimize")}>
                Ver recomendación
            </PrimaryButton>
        </div>
    )
}