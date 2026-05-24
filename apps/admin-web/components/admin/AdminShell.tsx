import type { ReactNode } from "react"
import AdminSidebar from "./AdminSidebar"
import type { AdminNavigateFn, AdminScreenName, AdminRole } from "@/types/admin"

interface AdminShellProps {
    children: ReactNode
    currentScreen: AdminScreenName
    onNavigate: AdminNavigateFn
    onLogout: () => void
    adminName?: string
    adminRole?: AdminRole
}

export default function AdminShell({
                                       children,
                                       currentScreen,
                                       onNavigate,
                                       onLogout,
                                       adminName,
                                       adminRole,
                                   }: AdminShellProps) {
    return (
        <div className="flex h-screen bg-slate-900 text-slate-50">
            {/* Sidebar */}
            <AdminSidebar
                currentScreen={currentScreen}
                onNavigate={onNavigate}
                onLogout={onLogout}
                adminName={adminName}
                adminRole={adminRole}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}