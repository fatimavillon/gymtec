"use client"

import React, { useEffect } from "react"
import StatusBar from "./StatusBar"
import BottomNav from "./BottomNav"
import type { ScreenName } from "@/types/gymtec"

interface PhoneShellProps {
    children: React.ReactNode
    currentScreen: ScreenName
    showBottomNav?: boolean
}

export default function PhoneShell({
                                       children,
                                       currentScreen,
                                       showBottomNav = true,
                                   }: PhoneShellProps) {
    // Listener para eventos de navegación global despachados por BottomNav
    // La función `onNavigate` que realmente cambia el estado está en `app/page.tsx`.
    // Este `useEffect` es un placeholder para capturar el evento si el PhoneShell necesitara reaccionar.
    // Es importante destacar que `customEvent` dentro del `useEffect` ya no es directamente "leído"
    // para cambiar el estado, por lo que el error TS6133 es válido para esa variable.
    // Se ha adaptado el listener para no usar la variable `event` directamente si no se necesita.
    useEffect(() => {
        const handleNavEvent = () => { // Corregido: 'event' ya no es un parámetro si no se usa
            // Lógica si PhoneShell necesitara reaccionar a un evento de navegación
        }

        // `window.addEventListener` es solo para la demostración.
        window.addEventListener("navigate", handleNavEvent)
        return () => window.removeEventListener("navigate", handleNavEvent)
    }, []) // Dependencias vacías para que se ejecute solo una vez.

    return (
        <div className="w-full max-w-[430px] h-full min-h-screen bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col mx-auto my-0">
            {/* Status Bar */}
            <StatusBar />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="animate-slide-in">
                    {children}
                </div>
            </div>

            {/* Bottom Navigation */}
            {showBottomNav && (
                <BottomNav
                    currentScreen={currentScreen}
                    onNavigate={(screen) =>
                        window.dispatchEvent(new CustomEvent("navigate", { detail: screen }))
                    } // Pasa el manejador de eventos a BottomNav
                />
            )}
        </div>
    )
}