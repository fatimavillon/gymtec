"use client"

import React, { useEffect, useState } from "react"
import { ChevronLeft } from "lucide-react"
import StatCard from "@/components/gymtec/StatCard"
import PrimaryButton from "@/components/gymtec/PrimaryButton"
// import SectionCard from "@/components/gymtec/SectionCard" // ELIMINADO: 'SectionCard' no se utiliza en este componente
import type { NavigateFn, UserPreferences, ScreenName } from "@/types/gymtec"
import { getUserPreferences } from "@/services/gymtec-api"
import { getDayLabel } from "@/lib/utils"

interface OptimizeScreenProps {
    onNavigate: NavigateFn
}

export default function OptimizeScreen({
                                           onNavigate,
                                       }: OptimizeScreenProps) {
    const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const availableDays = [
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
    ]
    const timeOptions = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
    ]

    useEffect(() => {
        const loadPreferences = async () => {
            setIsLoading(true)
            const preferences = await getUserPreferences()
            setUserPreferences(preferences)
            setIsLoading(false)
        }
        loadPreferences()
    }, [])

    const toggleDay = (day: string) => {
        if (!userPreferences) return
        setUserPreferences((prev) => {
            if (!prev) return null
            const selectedDays = prev.selectedDays.includes(day)
                ? prev.selectedDays.filter((d) => d !== day)
                : [...prev.selectedDays, day]
            return { ...prev, selectedDays }
        })
    }

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!userPreferences) return
        setUserPreferences((prev) => (prev ? { ...prev, startTime: e.target.value } : null))
    }

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!userPreferences) return
        setUserPreferences((prev) => (prev ? { ...prev, endTime: e.target.value } : null))
    }

    const handlePreferenceChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!userPreferences) return
        setUserPreferences((prev) => (prev ? { ...prev, preference: e.target.value as UserPreferences["preference"] } : null))
    }

    // Listener para navegación desde BottomNav
    useEffect(() => {
        const handleNavigateEvent = (event: Event) => {
            const customEvent = event as CustomEvent<ScreenName>
            // Si el evento no es para OptimizeScreen, lo maneja el onNavigate
            if (customEvent.detail !== 'optimize') {
                onNavigate(customEvent.detail)
            }
        }

        window.addEventListener("navigate", handleNavigateEvent)
        return () => window.removeEventListener("navigate", handleNavigateEvent)
    }, [onNavigate])


    if (isLoading) {
        return (
            <div className="px-5 py-6 space-y-6 pb-32">
                <p className="text-neutral-500 text-center mt-8">Cargando preferencias...</p>
            </div>
        )
    }

    if (!userPreferences) {
        return (
            <div className="px-5 py-6 space-y-6 pb-32">
                <p className="text-danger text-center mt-8">Error al cargar las preferencias.</p>
            </div>
        )
    }

    return (
        <div className="px-5 py-6 space-y-6 pb-32">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onNavigate("home")}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-neutral-700" />
                </button>
                <h1 className="text-2xl font-bold text-neutral-900">
                    Optimizar horario
                </h1>
            </div>

            {/* Días Disponibles */}
            <StatCard title="Días disponibles">
                <div className="flex gap-2 mt-4 flex-wrap">
                    {availableDays.map((day) => (
                        <button
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`px-3 py-2 rounded-full font-semibold text-sm transition-all ${
                                userPreferences.selectedDays.includes(day)
                                    ? "bg-primary text-white"
                                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            }`}
                        >
                            {getDayLabel(day)}
                        </button>
                    ))}
                </div>
            </StatCard>

            {/* Rango Horario */}
            <StatCard title="Rango horario">
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div>
                        <label className="text-xs font-semibold text-neutral-600 block mb-2">
                            Desde
                        </label>
                        <select
                            value={userPreferences.startTime}
                            onChange={handleStartTimeChange}
                            className="w-full px-3 py-2 rounded-xl border-2 border-neutral-300 focus:border-primary focus:outline-none text-sm text-neutral-900"
                        >
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-neutral-600 block mb-2">
                            Hasta
                        </label>
                        <select
                            value={userPreferences.endTime}
                            onChange={handleEndTimeChange}
                            className="w-full px-3 py-2 rounded-xl border-2 border-neutral-300 focus:border-primary focus:outline-none text-sm text-neutral-900"
                        >
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </StatCard>

            {/* Preferencia Principal */}
            <StatCard title="Preferencia principal">
                <div className="space-y-3 mt-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="preference"
                            value="min_occupancy"
                            checked={userPreferences.preference === "min_occupancy"}
                            onChange={handlePreferenceChange}
                            className="w-4 h-4 accent-primary"
                        />
                        <span className="font-medium text-neutral-700 text-sm">
              Mínimo aforo proyectado
            </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="preference"
                            value="near_classes"
                            checked={userPreferences.preference === "near_classes"}
                            onChange={handlePreferenceChange}
                            className="w-4 h-4 accent-primary"
                        />
                        <span className="font-medium text-neutral-700 text-sm">
              Cercano a mis clases (UTEC)
            </span>
                    </label>
                </div>
            </StatCard>

            {/* Botón Floating */}
            <div className="fixed bottom-5 left-5 right-5 max-w-[calc(430px-40px)]">
                <PrimaryButton onClick={() => onNavigate("results")}>
                    Calcular horario perfecto
                </PrimaryButton>
            </div>
        </div>
    )
}