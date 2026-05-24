import { useState, useEffect } from "react" // Eliminado React
import AdminActionButton from "@/components/admin/AdminActionButton"
import { AlertTriangle, AlertCircle } from "lucide-react"
import AdminToast from "@/components/admin/AdminToast"
import { getContingencyActions, triggerContingencyAction } from "@/services/admin-api"
import type { ContingencyAction /* ELIMINADO: AdminScreenName */ } from "@/types/admin" // ELIMINADO: AdminScreenName no se usa

interface AdminContingencyScreenProps {
    // onNavigate: (screen: AdminScreenName) => void; // ELIMINADO: onNavigate no se usa en este componente
}

export default function AdminContingencyScreen({ /* ELIMINADO: onNavigate */ }: AdminContingencyScreenProps) {
    const [toastMessage, setToastMessage] = useState<string | null>(null)
    const [toastType, setToastType] = useState<"success" | "warning" | "danger" | "info">("info")
    const [actions, setActions] = useState<ContingencyAction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadActions = async () => {
            setIsLoading(true);
            const fetchedActions = await getContingencyActions();
            setActions(fetchedActions);
            setIsLoading(false);
        };
        loadActions();
    }, []);


    const handleAction = async (actionId: string, actionTitle: string) => {
        setToastMessage(`Ejecutando "${actionTitle}"...`);
        setToastType("info");
        await triggerContingencyAction(actionId);
        setToastMessage(`¡Acción "${actionTitle}" registrada con éxito!`);
        setToastType("success");
    }

    if (isLoading) {
        return (
            <div className="p-8 text-center text-slate-400">Cargando acciones de contingencia...</div>
        );
    }

    const proactiveActions = actions.filter(a => a.type === 'proactive');
    const emergencyActions = actions.filter(a => a.type === 'emergency');

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-slate-50">
                    Centro de Control de Alertas y
                    <span className="text-cyan-500"> Contingencias</span>
                </h1>
            </div>

            {/* Proactive Actions */}
            <div className="rounded-2xl p-8 space-y-6 bg-slate-800 border-l-4 border-warning-500 shadow-dark-sm">
                <div className="flex items-start gap-4">
                    <div className="rounded-lg p-3 flex-shrink-0 bg-warning-500/20">
                        <AlertTriangle className="w-6 h-6 text-warning-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-warning-500 mb-2">
                            ACCIONES PROACTIVAS: Mitigación de Tráfico
                        </h2>
                        <p className="text-slate-300 mb-6">
                            Si detectas saturación repentina en las salas o colas de espera,
                            activa sugerencias forzadas inmediatas:
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {proactiveActions.map(action => (
                        <AdminActionButton
                            key={action.id}
                            variant="warning"
                            onClick={() => handleAction(action.id, action.title)}
                        >
                            {action.title}
                        </AdminActionButton>
                    ))}
                </div>
            </div>

            {/* Emergency Protocols */}
            <div className="rounded-2xl p-8 space-y-6 bg-slate-800 border-l-4 border-danger-500 shadow-dark-sm">
                <div className="flex items-start gap-4">
                    <div className="rounded-lg p-3 flex-shrink-0 bg-danger-500/20">
                        <AlertCircle className="w-6 h-6 text-danger-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-danger-500 mb-2">
                            PROTOCOLOS DE EMERGENCIA: Cambio de Aforo Repentino
                        </h2>
                        <p className="text-slate-300 mb-6">
                            Alertas críticas o restricciones físicas inmediatas en la
                            infraestructura del gimnasio:
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {emergencyActions.map(action => (
                        <AdminActionButton
                            key={action.id}
                            variant="danger"
                            onClick={() => handleAction(action.id, action.title)}
                        >
                            {action.title}
                        </AdminActionButton>
                    ))}
                </div>
            </div>

            <AdminToast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
        </div>
    )
}