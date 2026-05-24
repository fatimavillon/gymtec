import type { ButtonHTMLAttributes, ReactNode } from "react"

interface AdminActionButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "warning" | "danger" | "cyan" // Añadido 'cyan'
    fullWidth?: boolean
    children: ReactNode
}

export default function AdminActionButton({
                                              variant = "primary",
                                              fullWidth = true,
                                              children,
                                              className,
                                              ...props
                                          }: AdminActionButtonProps) {
    const variantClasses = {
        primary:
            "bg-primary text-white hover:bg-blue-700 border-primary",
        warning:
            "bg-warning-500 text-slate-900 hover:bg-warning-600 border-warning-500",
        danger: "bg-danger-500 text-white hover:bg-danger-600 border-danger-500",
        cyan: "bg-cyan-500 text-white hover:bg-cyan-600 border-cyan-500", // Estilo para Cyan
    }

    return (
        <button
            className={`px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${variantClasses[variant]} ${
                fullWidth ? "w-full" : ""
            } ${className || ""}`}
            {...props}
        >
            {children}
        </button>
    )
}