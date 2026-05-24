"use client"

// import { useEffect } from "react" // ELIMINADO: 'useEffect' no se utiliza en este componente
import { Home, TrendingUp, Calendar } from "lucide-react"
import type { ScreenName, NavigateFn } from "@/types/gymtec"

interface BottomNavProps {
    currentScreen: ScreenName
    onNavigate: NavigateFn
}

export default function BottomNav({
                                      currentScreen,
                                      onNavigate,
                                  }: BottomNavProps) {
    const navItems = [
        { id: "home", label: "Inicio", icon: Home, targetScreen: "home" as const },
        {
            id: "prediction",
            label: "Predicción",
            icon: TrendingUp,
            targetScreen: "prediction" as const,
        },
        {
            id: "schedule",
            label: "Recom.",
            icon: Calendar,
            targetScreen: "my-schedule" as const,
        },
    ]

    return (
        <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-neutral-300 shadow-lg">
            <div className="flex justify-around items-center h-full px-4">
                {navItems.map((item) => {
                    // Determina si el ítem de navegación está activo
                    const isActive =
                        currentScreen === item.targetScreen ||
                        (item.id === "schedule" &&
                            ["my-schedule", "detail", "results", "optimize"].includes(
                                currentScreen
                            ))

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.targetScreen)}
                            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                                isActive
                                    ? "text-primary"
                                    : "text-neutral-500 hover:text-neutral-700"
                            }`}
                        >
                            <item.icon className="w-6 h-6" /> {/* Iconos más grandes */}
                            <span className="text-xs font-medium">{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}