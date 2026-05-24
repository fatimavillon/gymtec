import { useEffect, useState } from "react" // Eliminado React
// ELIMINADO AlertTriangle y AlertCircle, ya que no se usan
import { Clock, LogIn, LogOut } from "lucide-react" // Mantiene Clock, LogIn, LogOut
import AdminMetricCard from "@/components/admin/AdminMetricCard"
import AdminHeatmap from "@/components/admin/AdminHeatmap"
import AdminStatusBadge from "@/components/admin/AdminStatusBadge"
import {
    getAdminMetrics,
    getHeatmapData,
    getAccessLogs,
    getSystemAlerts,
} from "@/services/admin-api" // Importar las funciones de servicio
import type { AdminMetric, HeatmapCell, AccessLog, SystemAlert } from "@/types/admin" // Importar los tipos

export default function AdminDashboardScreen() {
    const [metrics, setMetrics] = useState<AdminMetric[]>([])
    const [heatmap, setHeatmap] = useState<HeatmapCell[]>([])
    const [accessLogs, setAccessLogs] = useState<AccessLog[]>([])
    const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            const [
                adminMetricsData,
                heatmapData,
                accessLogsData,
                systemAlertsData,
            ] = await Promise.all([
                getAdminMetrics(),
                getHeatmapData(),
                getAccessLogs(),
                getSystemAlerts(),
            ])
            setMetrics(adminMetricsData)
            setHeatmap(heatmapData)
            setAccessLogs(accessLogsData)
            setSystemAlerts(systemAlertsData)
            setIsLoading(false)
        }
        loadData()
    }, [])

    const today = new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
    })

    if (isLoading) {
        return (
            <div className="p-8 text-center text-slate-400">Cargando dashboard...</div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-black text-slate-50">
                    Dashboard Operativo
                    <span className="text-cyan-500"> (Tiempo Real)</span>
                </h1>
                <p className="text-slate-400 font-semibold capitalize">
                    Hoy: {today}
                </p>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((metric) => (
                    <AdminMetricCard
                        key={metric.label}
                        label={metric.label}
                        value={metric.value}
                        accent={metric.accent}
                    />
                ))}
            </div>

            {/* Heatmap */}
            <div className="rounded-2xl p-6 bg-slate-800 border border-slate-700 shadow-dark-sm">
                <h2 className="text-xl font-bold text-slate-50 mb-6">
                    Matriz de Calor de Ocupación Semanal
                </h2>
                <AdminHeatmap data={heatmap} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Access Logs */}
                <div className="rounded-2xl p-6 bg-slate-800 border border-slate-700 shadow-dark-sm">
                    <h2 className="text-xl font-bold text-slate-50 mb-6">
                        Últimos Registros (QR Accesos)
                    </h2>
                    <div className="space-y-3">
                        {accessLogs.map((log) => (
                            <div
                                key={log.id}
                                className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600 shadow-dark-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-slate-600 rounded-lg p-3">
                                        {log.action === "INGRESO" ? (
                                            <LogIn className="w-5 h-5 text-cyan-500" />
                                        ) : (
                                            <LogOut className="w-5 h-5 text-warning-500" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-50">
                                            ID: {log.studentId}
                                        </p>
                                        <p className="text-sm text-slate-400">{log.program}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <AdminStatusBadge
                                        label={log.action}
                                        variant={
                                            log.action === "INGRESO" ? "info" : "warning"
                                        }
                                    />
                                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 justify-end">
                                        <Clock className="w-3 h-3" />
                                        {log.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alerts */}
                <div className="rounded-2xl p-6 bg-slate-800 border border-slate-700 shadow-dark-sm">
                    <h2 className="text-xl font-bold text-slate-50 mb-6">
                        Alertas Automáticas del Sistema
                    </h2>
                    <div className="space-y-3">
                        {systemAlerts.map((alert) => (
                            <div
                                key={alert.id}
                                className="p-4 bg-slate-700 rounded-lg border border-slate-600 shadow-dark-sm"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <AdminStatusBadge
                                            label={alert.severity.toUpperCase()}
                                            variant={
                                                alert.severity === "critical"
                                                    ? "danger"
                                                    : alert.severity === "warning"
                                                        ? "warning"
                                                        : "info"
                                            }
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-50 font-semibold">
                                            {alert.message}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-2">
                                            {alert.timestamp}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}