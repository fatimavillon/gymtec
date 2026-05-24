import { useState, type FormEvent } from "react"
import { Lock, Mail, Key } from "lucide-react"
import { validateAdminLogin } from "@/lib/admin-auth"
import type { AdminLoginForm /* ELIMINADO: AdminRole */ } from "@/types/admin" // CORREGIDO: Eliminado AdminRole del import

interface AdminAuthScreenProps {
    onLoginSuccess: (formData: AdminLoginForm) => void
    onRegisterClick: () => void
}

export default function AdminAuthScreen({
                                            onLoginSuccess,
                                            onRegisterClick,
                                        }: AdminAuthScreenProps) {
    const [email, setEmail] = useState("admin.bienestar@utec.edu.pe")
    const [accessCode, setAccessCode] = useState("GYMTEC-ADMIN-2026")
    const [password, setPassword] = useState("admin2026")
    const [errors, setErrors] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
        setErrors([])
        setIsLoading(true)

        // Simular validación
        setTimeout(() => {
            const validation = validateAdminLogin(email, accessCode, password)

            if (!validation.valid) {
                setErrors(validation.errors)
                setIsLoading(false)
                return
            }

            // Llamar al callback con el objeto AdminLoginForm
            onLoginSuccess({ email, accessCode, password });
            setIsLoading(false);
        }, 800)
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
            }}
        >
            <div className="w-full max-w-md">
                {/* Card */}
                <div
                    className="rounded-2xl p-8 shadow-dark-md space-y-8 border border-slate-700"
                    style={{
                        backgroundColor: "#1e293b",
                    }}
                >
                    {/* Logo */}
                    <div className="text-center space-y-3">
                        <h1 className="text-3xl font-black">
                            <span className="text-slate-50">GYMTEC</span>
                            <span className="text-cyan-500"> Admin</span>
                        </h1>
                        <p className="text-slate-400 font-semibold">
                            Panel de Control Administrativo & Analytics
                        </p>
                    </div>

                    {/* Errors */}
                    {errors.length > 0 && (
                        <div
                            className="rounded-lg p-4 space-y-1 border border-danger-500"
                            style={{
                                backgroundColor: "rgba(239, 68, 68, 0.2)", // danger-500 con opacidad
                            }}
                        >
                            {errors.map((error, index) => (
                                <p key={index} className="text-danger-500 text-sm">
                                    • {error}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Correo Institucional
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="correo@utec.edu.pe"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg text-slate-50 placeholder-slate-400 focus:outline-none transition-colors duration-200"
                                    style={{
                                        backgroundColor: "#0F172A", // bg-slate-900
                                        border: "1px solid #334155", // border-slate-700
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#22D3EE"
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "#334155"
                                    }}
                                />
                            </div>
                        </div>

                        {/* Access Code */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Código de Acceso
                            </label>
                            <div className="relative">
                                <Key className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    value={accessCode}
                                    onChange={(e) => setAccessCode(e.target.value)}
                                    placeholder="GYMTEC-ADMIN-XXXX"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg text-slate-50 placeholder-slate-400 focus:outline-none transition-colors duration-200"
                                    style={{
                                        backgroundColor: "#0F172A",
                                        border: "1px solid #334155",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#22D3EE"
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "#334155"
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg text-slate-50 placeholder-slate-400 focus:outline-none transition-colors duration-200"
                                    style={{
                                        backgroundColor: "#0F172A",
                                        border: "1px solid #334155",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#22D3EE"
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "#334155"
                                    }}
                                />
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 font-bold rounded-lg transition-colors duration-200 disabled:opacity-50 shadow-dark-sm"
                            style={{
                                backgroundColor: "#0891B2", // bg-cyan-600
                                color: "#ffffff",
                                border: "1px solid #22D3EE", // border-cyan-500
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#0e7490"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#0891B2"
                            }}
                        >
                            {isLoading ? "Validando..." : "Ingresar al Sistema"}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="text-center">
                        <button
                            onClick={onRegisterClick}
                            className="text-sm font-semibold transition-colors duration-200 hover:text-cyan-300"
                            style={{ color: "#22D3EE" }}
                        >
                            Registrar nuevo administrador
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-slate-500">
                        Acceso exclusivo para personal autorizado UTEC
                    </p>
                </div>
            </div>
        </div>
    )
}