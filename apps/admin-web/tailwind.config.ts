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
                primary: "#2563EB", // Azul acción
                cyan: {
                    500: "#22D3EE", // GYMTEC Cyan
                    600: "#0891B2", // Hover
                    700: "#0e7490", // Accent
                },
                success: {
                    DEFAULT: "#22C55E", // Verde
                    500: "#22C55E",
                    600: "#16A34A",
                },
                warning: {
                    DEFAULT: "#FACC15", // Amarillo
                    500: "#FACC15",
                    600: "#EAB308",
                },
                danger: {
                    DEFAULT: "#EF4444", // Rojo
                    500: "#EF4444",
                    600: "#DC2626",
                },
                slate: {
                    50: "#F8FAFC", // Texto principal claro
                    100: "#F1F5F9",
                    200: "#E2E8F0",
                    300: "#CBD5E1",
                    400: "#94A3B8", // Texto secundario
                    500: "#64748B",
                    600: "#475569",
                    700: "#334155", // Bordes
                    800: "#1E293B", // Sidebar, cards
                    900: "#0F172A", // Fondo principal
                },
            },
            borderRadius: {
                "2xl": "16px",
                "3xl": "24px",
            },
            boxShadow: {
                sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                md: "0 4px 12px 0 rgba(0, 0, 0, 0.08)",
                lg: "0 10px 24px 0 rgba(0, 0, 0, 0.1)",
                "dark-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
                "dark-md": "0 4px 12px 0 rgba(0, 0, 0, 0.3)",
            },
        },
    },
    plugins: [],
}

export default config