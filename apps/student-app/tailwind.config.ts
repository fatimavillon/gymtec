import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./screens/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2563EB",
                success: {
                    DEFAULT: "#22C55E",
                    50: "#F0FDF4", // Para fondo claro de cards resaltadas
                    100: "#DCFCE7", // Para fondo de badges 'bajo'
                    700: "#166534", // Para texto de badges 'bajo'
                },
                warning: {
                    DEFAULT: "#FACC15", // Amarillo
                    50: "#FFFBEB", // Para fondo claro de cards resaltadas (si fuera necesario)
                    100: "#FEF3C7", // Para fondo de badges 'medio'
                    700: "#B45309", // Para texto de badges 'medio' (naranja oscuro)
                },
                danger: {
                    DEFAULT: "#EF4444",
                    50: "#FEF2F2", // Para fondo claro de cards resaltadas (si fuera necesario)
                    100: "#FEE2E2", // Para fondo de badges 'alto'
                    700: "#991B1B", // Para texto de badges 'alto'
                },
                neutral: {
                    50: "#F8FAFC", // Fondo general de la app
                    100: "#F4F7FB", // Fondo de elementos inactivos / filas
                    300: "#E2E8F0", // Bordes suaves
                    500: "#64748B", // Texto secundario / gris
                    700: "#334155", // Texto títulos secundarios / oscuro
                    900: "#020617", // Texto principal / negro
                },
            },
            borderRadius: {
                "3xl": "24px",
                "2xl": "16px",
            },
            boxShadow: {
                sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                md: "0 4px 12px 0 rgba(0, 0, 0, 0.08)", // Sombra suave para cards
                lg: "0 10px 24px 0 rgba(0, 0, 0, 0.1)",
            },
        },
    },
    plugins: [],
}

export default config