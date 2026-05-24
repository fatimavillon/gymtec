import { useState, type FormEvent, type ChangeEvent } from "react" // Eliminado React
import { User, Mail, Key, Lock, ArrowLeft } from "lucide-react"
import {
    validateAdminRegister,
} from "@/lib/admin-auth"
import type { AdminRole, AdminRegisterForm } from "@/types/admin" // AÑADIDO: Importar AdminRegisterForm

interface AdminRegisterScreenProps {
    onRegisterSuccess: (formData: AdminRegisterForm) => void // CAMBIADO: Recibe un objeto AdminRegisterForm
    onBackClick: () => void
}

export default function AdminRegisterScreen({
                                                onRegisterSuccess,
                                                onBackClick,
                                            }: AdminRegisterScreenProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState<AdminRole>("Administrador de Gimnasio")
    const [accessCode, setAccessCode] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const roles: AdminRole[] = [
        "Bienestar Universitario",
        "Administrador de Gimnasio",
        "Operaciones Campus",
    ]

    const handleRegister = (e: FormEvent) => {
        e.preventDefault()
        setErrors([])
        setIsLoading(true)

        setTimeout(() => {
            const validation = validateAdminRegister(
                name,
                email,
                role,
                accessCode,
                password,
                confirmPassword
            )

            if (!validation.valid) {
                setErrors(validation.errors)
                setIsLoading(false)
                return
            }

            // Llamar al callback con el objeto AdminRegisterForm
            onRegisterSuccess({ name, email, role, accessCode, password, confirmPassword });
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
                <div
                    className="rounded-2xl p-8 shadow-dark-md space-y-8 border border-slate-700"
                    style={{
                        backgroundColor: "#1e293b",
                    }}
                >
                    {/* Header */}
                    <div className="text-center space-y-3">
                        <h1 className="text-3xl font-black">
                            <span className="text-slate-50">GYMTEC</span>
                            <span className="text-cyan-500"> Admin</span>
                        </h1>
                        <p className="text-slate-400 font-semibold">
                            Crear Cuenta Administrativa
                        </p>
                    </div>

                    {/* Errors */}
                    {errors.length > 0 && (
                        <div
                            className="rounded-lg p-4 space-y-1 border border-danger-500"
                            style={{
                                backgroundColor: "rgba(239, 68, 68, 0.2)",
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
                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Nombre Completo
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Juan Pérez García"
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

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Rol Administrativo
                            </label>
                            <select
                                value={role}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value as AdminRole)}
                                className="w-full px-4 py-3 rounded-lg text-slate-50 focus:outline-none transition-colors duration-200"
                                style={{
                                    backgroundColor: "#0F172A",
                                    border: "1px solid #334155",
                                    color: "#f8fafc",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = "#22D3EE"
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = "#334155"
                                }}
                            >
                                {roles.map((r) => (
                                    <option key={r} value={r} style={{ backgroundColor: "#1e293b" }}>
                                        {r}
                                    </option>
                                ))}
                            </select>
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
                                    placeholder="Mínimo 6 caracteres"
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

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Confirmar Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Repite tu contraseña"
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
                                backgroundColor: "#0891B2",
                                color: "#ffffff",
                                border: "1px solid #22D3EE",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#0e7490"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#0891B2"
                            }}
                        >
                            {isLoading ? "Creando acceso..." : "Crear acceso administrativo"}
                        </button>
                    </form>

                    {/* Back Link */}
                    <div className="text-center">
                        <button
                            onClick={onBackClick}
                            className="flex items-center justify-center gap-2 mx-auto text-sm font-semibold transition-colors duration-200 hover:text-cyan-300"
                            style={{ color: "#22D3EE" }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver al login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}