"use client"

import { useState, useEffect } from "react"
import AdminAuthScreen from "@/screens/admin/AdminAuthScreen"
import AdminRegisterScreen from "@/screens/admin/AdminRegisterScreen"
import AdminDashboardScreen from "@/screens/admin/AdminDashboardScreen"
import AdminDemandBalanceScreen from "@/screens/admin/AdminDemandBalanceScreen"
import AdminContingencyScreen from "@/screens/admin/AdminContingencyScreen"
import AdminShell from "@/components/admin/AdminShell"
import AdminToast from "@/components/admin/AdminToast"

import {
  getMockAdminSession,
  clearMockAdminSession,
  createMockAdminSession,
  saveMockAdminSession,
} from "@/lib/admin-auth"
import type { AdminScreenName, AdminSession, AdminRole, AdminLoginForm, AdminRegisterForm } from "@/types/admin" // AÑADIDO: Importar AdminLoginForm y AdminRegisterForm

export default function AdminPage() {
  const [currentScreen, setCurrentScreen] = useState<AdminScreenName>("login")
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<"success" | "warning" | "danger" | "info">("info")

  // Verificar sesión al cargar
  useEffect(() => {
    const session = getMockAdminSession()
    if (session && session.isAuthenticated) {
      setAdminSession(session)
      setCurrentScreen("dashboard")
      setToastMessage(`Bienvenido de nuevo, ${session.adminName}!`);
      setToastType("success");
    }
    setIsLoading(false)
  }, [])

  const handleLoginSuccess = (formData: AdminLoginForm) => { // CAMBIADO: Recibe un objeto AdminLoginForm
    // Se asume un rol por defecto para el login, ya que no se pide en el formulario de login.
    // En una implementación real, el rol vendría del backend tras la autenticación.
    const mockRole: AdminRole = "Administrador de Gimnasio";
    const adminName = (formData.email.split('.')[0] || 'Admin').charAt(0).toUpperCase() + (formData.email.split('.')[0] || 'Admin').slice(1);

    const session = createMockAdminSession({ adminName: adminName, email: formData.email, role: mockRole });
    saveMockAdminSession(session);
    setAdminSession(session);
    setCurrentScreen("dashboard");
    setToastMessage(`¡Inicio de sesión exitoso como ${adminName}!`);
    setToastType("success");
  }

  const handleRegisterSuccess = (formData: AdminRegisterForm) => { // CAMBIADO: Recibe un objeto AdminRegisterForm
    const session = createMockAdminSession({ adminName: formData.name, email: formData.email, role: formData.role });
    saveMockAdminSession(session);
    setAdminSession(session);
    setCurrentScreen("dashboard");
    setToastMessage(`¡Registro exitoso para ${formData.name}!`);
    setToastType("success");
  }

  const handleLogout = () => {
    clearMockAdminSession()
    setAdminSession(null)
    setCurrentScreen("login")
    setToastMessage("Sesión cerrada correctamente.");
    setToastType("info");
  }

  if (isLoading) {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-black text-slate-50">
              <span>GYMTEC</span>
              <span className="text-cyan-500"> Admin</span>
            </h1>
            <p className="text-slate-400 mt-4">Cargando...</p>
          </div>
        </div>
    )
  }

  // Renderizar pantallas de autenticación si no hay sesión
  if (!adminSession) {
    return (
        <>
          {currentScreen === "login" && (
              <AdminAuthScreen
                  onLoginSuccess={handleLoginSuccess} // Pasa el handler modificado
                  onRegisterClick={() => setCurrentScreen("register")}
              />
          )}

          {currentScreen === "register" && (
              <AdminRegisterScreen
                  onRegisterSuccess={handleRegisterSuccess} // Pasa el handler modificado
                  onBackClick={() => setCurrentScreen("login")}
              />
          )}
          <AdminToast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
        </>
    )
  }

  // Renderizar AdminShell con el contenido si hay sesión
  return (
      <>
        <AdminShell
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            onLogout={handleLogout}
            adminName={adminSession.adminName}
            adminRole={adminSession.role}
        >
          {currentScreen === "dashboard" && <AdminDashboardScreen />}
          {currentScreen === "demand" && <AdminDemandBalanceScreen />}
          {currentScreen === "contingency" && <AdminContingencyScreen />}
        </AdminShell>
        <AdminToast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
      </>
  )
}