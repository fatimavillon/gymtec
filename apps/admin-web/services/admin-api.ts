import type {
    AdminMetric,
    HeatmapCell,
    AccessLog,
    SystemAlert,
    DemandPoint,
    ImpactMetric,
    ContingencyAction,
} from "@/types/admin"
import {
    adminMetrics,
    heatmapData,
    accessLogs,
    adminAlerts,
    demandBalanceData,
    impactMetrics,
    activeRecommendations,
    contingencyActions,
} from "@/data/admin-mock"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getAdminMetrics(): Promise<AdminMetric[]> {
    await delay(300)
    return adminMetrics
}

export async function getHeatmapData(): Promise<HeatmapCell[]> {
    await delay(400)
    return heatmapData
}

export async function getAccessLogs(): Promise<AccessLog[]> {
    await delay(350)
    return accessLogs
}

export async function getSystemAlerts(): Promise<SystemAlert[]> {
    await delay(200)
    return adminAlerts
}

export async function getDemandBalanceData(): Promise<DemandPoint[]> {
    await delay(500)
    return demandBalanceData
}

export async function getImpactMetrics(): Promise<ImpactMetric[]> {
    await delay(300)
    return impactMetrics
}

export async function getActiveRecommendations(): Promise<string[]> {
    await delay(250)
    return activeRecommendations
}

export async function getContingencyActions(): Promise<ContingencyAction[]> {
    await delay(200)
    return contingencyActions
}

export async function triggerContingencyAction(actionId: string): Promise<boolean> {
    await delay(500)
    // En una app real, esto haría un POST al backend
    console.log(`Action triggered: ${actionId}`);
    return true;
}