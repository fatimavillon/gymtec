import type { OccupancyLevel } from "@/types/gymtec"

export function getOccupancyColor(occupancy: number): string {
    if (occupancy <= 50) return "#22C55E" // success
    if (occupancy <= 65) return "#EA7A00" // warning (naranja)
    return "#EF4444" // danger
}

export function getOccupancyBgColor(occupancy: number): string {
    if (occupancy <= 50) return "#DCFCE7" // bg-success-light
    if (occupancy <= 65) return "#FEF3C7" // bg-warning-light (amarillo claro)
    return "#FEE2E2" // bg-danger-light
}

export function getOccupancyTextColor(occupancy: number): string {
    if (occupancy <= 50) return "#166534" // text-success-dark
    if (occupancy <= 65) return "#B45309" // text-warning-dark (naranja oscuro)
    return "#991B1B" // text-danger-dark
}

export function classifyOccupancy(occupancy: number): OccupancyLevel {
    if (occupancy <= 50) return "bajo"
    if (occupancy <= 65) return "medio"
    return "alto"
}

export function getOccupancyLabel(occupancy: number): string {
    const level = classifyOccupancy(occupancy)
    const labels: Record<OccupancyLevel, string> = {
        bajo: "BAJO",
        medio: "MEDIO",
        alto: "ALTO",
    }
    return labels[level]
}

export function getDayLabel(dayKey: string): string {
    const labels: Record<string, string> = {
        lunes: "Lunes",
        martes: "Martes",
        miercoles: "Miércoles",
        jueves: "Jueves",
        viernes: "Viernes",
        sabado: "Sábado",
        domingo: "Domingo",
    }
    return labels[dayKey] || dayKey
}

export function getDayShortLabel(dayKey: string): string {
    const labels: Record<string, string> = {
        lunes: "Lun",
        martes: "Mar",
        miercoles: "Mié",
        jueves: "Jue",
        viernes: "Vie",
        sabado: "Sáb",
        domingo: "Dom",
    }
    return labels[dayKey] || dayKey
}

export function cn(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}