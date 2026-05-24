import { type ButtonHTMLAttributes, type ReactNode } from "react" // Eliminado React, importado types

interface PrimaryButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "secondary"
    fullWidth?: boolean
    isLoading?: boolean
    children: ReactNode // Usar ReactNode directamente
}

export default function PrimaryButton({
                                          variant = "primary",
                                          fullWidth = true,
                                          isLoading = false,
                                          disabled,
                                          children,
                                          className = "",
                                          ...props
                                      }: PrimaryButtonProps) {
    const variantClasses = {
        primary:
            "bg-primary text-white hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200",
        outline:
            "bg-white text-primary border-2 border-primary hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200",
        secondary:
            "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 transition-colors duration-200",
    }

    return (
        <button
            disabled={disabled || isLoading}
            className={`${
                fullWidth ? "w-full" : ""
            } h-14 px-6 rounded-2xl font-semibold text-lg ${variantClasses[variant]} ${className} disabled:opacity-50`}
            {...props}
        >
            {isLoading ? "Cargando..." : children}
        </button>
    )
}