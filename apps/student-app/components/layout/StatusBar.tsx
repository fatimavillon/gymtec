import { useEffect, useState } from "react" // Eliminado React
import { Wifi, Signal, Battery } from "lucide-react"

export default function StatusBar() {
    const [time, setTime] = useState("9:41")

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            setTime(
                now.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false, // Formato 24 horas
                })
            )
        }

        updateTime() // Ejecutar una vez al inicio
        const timer = setInterval(updateTime, 60000) // Actualizar cada minuto

        return () => clearInterval(timer) // Limpiar intervalo
    }, [])

    return (
        <div className="h-11 bg-white text-neutral-900 flex items-center justify-between px-5 text-sm font-semibold border-b border-neutral-100">
            <span>{time}</span>
            <div className="flex items-center gap-1">
                <Signal className="w-4 h-4 text-neutral-700" />
                <Wifi className="w-4 h-4 text-neutral-700" />
                <Battery className="w-4 h-4 text-neutral-700" />
            </div>
        </div>
    )
}