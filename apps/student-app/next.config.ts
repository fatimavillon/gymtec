import path from "node:path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    reactStrictMode: true,
    turbopack: {
        // La raíz de Turbopack se establece en el directorio de la aplicación actual.
        // Esto es crucial para que Turbopack resuelva los módulos correctamente dentro del monorepo.
        root: path.resolve(__dirname),
    },
}

export default nextConfig