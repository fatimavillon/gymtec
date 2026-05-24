import { useEffect, useState } from "react" // Eliminado React
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import { getDemandBalanceData, getImpactMetrics } from "@/services/admin-api"
import type { DemandPoint, ImpactMetric } from "@/types/admin"
import AdminMetricCard from "@/components/admin/AdminMetricCard" // Importar componente

export default function AdminDemandBalanceScreen() {
    const [demandData, setDemandData] = useState<DemandPoint[]>([])
    const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            const [demandBalance, impact] = await Promise.all([
                getDemandBalanceData(),
                getImpactMetrics(),
            ])
            setDemandData(demandBalance)
            setImpactMetrics(impact)
            setIsLoading(false)
        }
        loadData()
    }, [])

    const progressAnalysis =
        "Al mantener la Línea Base Histórica como comparativo permanente, el sistema demuestra un aplanamiento efectivo de la curva en las horas pico tradicionales de UTEC (11:00 AM y 01:00 PM), desplazando exitosamente la demanda sobrante hacia bloques tradicionalmente subutilizados (03:00 PM). Esto valida el impacto del algoritmo de recomendación personalizada en el cambio conductual del alumnado."

    if (isLoading) {
        return (
            <div className="p-8 text-center text-slate-400">Cargando balance de demanda...</div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-slate-50">
                    Métricas de Impacto Académico y
                    <span className="text-cyan-500"> Evolución</span>
                </h1>
            </div>

            {/* Main Chart */}
            <div className="rounded-2xl p-6 bg-slate-800 border border-slate-700 shadow-dark-sm">
                <h2 className="text-xl font-bold text-slate-50 mb-6">
                    EVALUACIÓN OPERATIVA: Línea Base Histórica vs. Semana Actual con GYMTEC
                </h2>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={demandData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="hour" stroke="#94A3B8" />
                        <YAxis stroke="#94A3B8" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1E293B",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                            }}
                            labelStyle={{ color: "#F8FAFC" }}
                        />
                        <Legend wrapperStyle={{ color: "#94A3B8" }} />
                        <Bar
                            dataKey="baseline"
                            fill="#6B7280"
                            name="Demanda Línea Base (Sin GYMTEC)"
                            radius={[8, 8, 0, 0]}
                        />
                        <Bar
                            dataKey="withGymtec"
                            fill="#22D3EE"
                            name="Demanda Controlada (Con GYMTEC)"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {impactMetrics.map((metric) => (
                    <AdminMetricCard
                        key={metric.label}
                        label={metric.label}
                        value={metric.value}
                        accent={metric.accent}
                    />
                ))}
            </div>

            {/* Analysis */}
            <div className="rounded-2xl p-6 bg-slate-800 border border-slate-700 shadow-dark-sm">
                <h2 className="text-xl font-bold text-slate-50 mb-4">
                    Análisis de Progreso Operativo
                </h2>
                <p className="text-slate-300 leading-relaxed">
                    {progressAnalysis}
                </p>
            </div>
        </div>
    )
}