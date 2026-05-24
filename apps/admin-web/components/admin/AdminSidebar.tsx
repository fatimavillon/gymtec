import { BarChart3, TrendingUp, AlertCircle, LogOut } from "lucide-react"
import type { AdminNavigateFn, AdminScreenName, AdminRole } from "@/types/admin" // Importar AdminRole

interface AdminSidebarProps {
    currentScreen: AdminScreenName
    onNavigate: AdminNavigateFn
    onLogout: () => void
    adminName?: string
    adminRole?: AdminRole // Añadir rol
}

export default function AdminSidebar({
                                         currentScreen,
                                         onNavigate,
                                         onLogout,
                                         adminName,
                                         adminRole,
                                     }: AdminSidebarProps) {
    const menuItems = [
        {
            id: "dashboard",
            label: "Vista Operativa",
            icon: BarChart3,
        },
        {
            id: "demand",
            label: "Balance de Demanda",
            icon: TrendingUp,
        },
        {
            id: "contingency",
            label: "Gestión de Contingencias",
            icon: AlertCircle,
        },
    ]

    return (
        <aside className="w-64 flex-shrink-0 flex flex-col h-screen bg-slate-800 border-r border-slate-700">
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-2xl font-black">
                    <span className="text-slate-50">GYMTEC</span>
                    <span className="text-cyan-500"> Admin</span>
                </h1>
                {adminName && (
                    <>
                        <p className="text-sm text-slate-300 mt-2">Bienvenido, {adminName}</p>
                        {adminRole && <p className="text-xs text-slate-400">{adminRole}</p>}
                    </>
                )}
            </div>

            {/* Menu */}
            <nav className="flex-1 p-6 space-y-2">
                {menuItems.map((item) => {
                    const isActive = currentScreen === item.id
                    const Icon = item.icon
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id as AdminScreenName)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                                isActive
                                    ? "bg-cyan-700 text-white shadow-dark-sm"
                                    : "text-slate-300 hover:bg-slate-700"
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-semibold">{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-slate-700 space-y-3">
                <p className="text-xs text-slate-500 text-center">
                    Fase de Datos 2026-1
                </p>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-danger-600 text-white border border-danger-500 rounded-lg hover:bg-danger-700 transition-colors duration-200 font-semibold shadow-dark-sm"
                >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                </button>
            </div>
        </aside>
    )
}