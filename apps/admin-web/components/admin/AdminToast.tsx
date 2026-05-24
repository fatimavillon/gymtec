import { useEffect, useState } from "react"
import { CheckCircle2, XCircle, Info, X } from "lucide-react"

interface AdminToastProps {
    message: string | null // Mensaje a mostrar, null para ocultar
    type?: "success" | "warning" | "danger" | "info"
    onClose?: () => void // Callback al cerrar el toast
}

export default function AdminToast({
                                       message,
                                       type = "info",
                                       onClose,
                                   }: AdminToastProps) {
    const [isVisible, setIsVisible] = useState(false)

    // Controlar la visibilidad del toast basado en el mensaje
    useEffect(() => {
        if (message) {
            setIsVisible(true)
            const timer = setTimeout(() => {
                setIsVisible(false)
                if (onClose) onClose()
            }, 3000) // Ocultar después de 3 segundos
            return () => clearTimeout(timer)
        } else {
            setIsVisible(false)
        }
    }, [message, onClose])

    if (!isVisible || !message) return null

    // Clases de estilo y icono según el tipo de toast
    const toastStyles = {
        success: "bg-success-600 border-success-500 text-slate-50",
        warning: "bg-warning-500 border-warning-500 text-slate-900",
        danger: "bg-danger-500 border-danger-500 text-slate-50",
        info: "bg-cyan-600 border-cyan-500 text-slate-50",
    }

    const iconComponents = {
        success: CheckCircle2,
        warning: XCircle, // Usar XCircle para warning
        danger: XCircle,
        info: Info,
    }

    const IconComponent = iconComponents[type]

    return (
        <div className="fixed bottom-8 right-8 z-50 animate-slide-in">
            <div className={`flex items-center p-4 rounded-lg shadow-dark-md border ${toastStyles[type]}`}>
                <IconComponent className="w-6 h-6 mr-3" />
                <span className="font-semibold">{message}</span>
                <button onClick={() => { setIsVisible(false); if (onClose) onClose(); }} className="ml-4 text-slate-100 hover:text-slate-200">
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}