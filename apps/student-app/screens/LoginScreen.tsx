"use client"

import React, { useState } from "react"
import { Dumbbell, Eye, EyeOff } from "lucide-react"
import PrimaryButton from "@/components/gymtec/PrimaryButton"
import type { UserData } from "@/types/gymtec"

interface LoginScreenProps {
    onLogin: (user: UserData) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
    const [email, setEmail] = useState("fatima@utec.edu.pe")
    const [password, setPassword] = useState("demo123")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simular delay de autenticación
        setTimeout(() => {
            onLogin({
                name: "Fátima",
                email: email || "fatima@utec.edu.pe",
            })
            setIsLoading(false)
        }, 600)
    }

    const handleDemoLogin = () => {
        setIsLoading(true)
        setTimeout(() => {
            onLogin({
                name: "Usuario Demo",
                email: "demo@utec.edu.pe",
            })
            setIsLoading(false)
        }, 600)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
            <div className="w-full space-y-8">
                {/* Logo y Encabezado */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary p-4 rounded-full">
                            <Dumbbell className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-neutral-900">GYMTEC</h1>
                    <p className="text-lg font-semibold text-neutral-700">
                        Optimiza tu visita al gimnasio UTEC
                    </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Correo institucional
                        </label>
                        <input
                            type="email"
                            placeholder="correo@utec.edu.pe"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 focus:border-primary focus:outline-none transition-colors text-neutral-900 placeholder:text-neutral-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 focus:border-primary focus:outline-none transition-colors text-neutral-900 placeholder:text-neutral-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Botón Principal */}
                    <PrimaryButton type="submit" isLoading={isLoading} className="mt-6">
                        Iniciar sesión
                    </PrimaryButton>
                </form>

                {/* Divisor */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-neutral-300" />
                    <span className="text-xs text-neutral-500 font-medium">o</span>
                    <div className="flex-1 h-px bg-neutral-300" />
                </div>

                {/* Demo Button */}
                <PrimaryButton
                    variant="outline"
                    onClick={handleDemoLogin}
                    isLoading={isLoading}
                >
                    Continuar como demo
                </PrimaryButton>

                {/* Footer */}
                <p className="text-center text-xs text-neutral-500">
                    Predicción de aforo y recomendación inteligente de horarios
                </p>
            </div>
        </div>
    )
}