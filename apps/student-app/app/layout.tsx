import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "GYMTEC - Predictor de Aforo",
    description: "Optimiza tu visita al gimnasio UTEC",
    viewport: {
        width: "device-width",
        initialScale: 1,
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
        {/* Fondo general para centrar el PhoneShell en desktop */}
        <body className="bg-neutral-50 flex justify-center min-h-screen">
        {children}
        </body>
        </html>
    )
}