// Función simple para combinar clases de Tailwind si fuera necesario
export function cn(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(" ")
}

export type OccupancyLevel = "bajo" | "medio" | "alto"

export function classifyOccupancy(occupancy: number): OccupancyLevel {
    if (occupancy <= 50) return "bajo"
    if (occupancy <= 75) return "medio" // Ajustado umbral para "medio"
    return "alto"
}