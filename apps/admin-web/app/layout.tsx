import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "GYMTEC Admin - Panel de Control",
    description: "Portal administrativo para gestión de gimnasio UTEC",
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
        <body className="bg-slate-900 text-slate-50">{children}</body>
        </html>
    )
}