import type {
  TotalsResponse,
  CountByEntity,
  StatusByEntity,
  DurationByWorkflow
} from "../api/Dashboard/type"
import axiosInstance from "@/lib/axios"

const DASHBOARD_PATH = "/dashboard"

/* Totais globais */
export async function getDashboardTotals(): Promise<TotalsResponse> {
  const { data } = await axiosInstance.get<TotalsResponse>(`${DASHBOARD_PATH}/totals`)
  return data
}

/* Documentos */
export async function getDocumentsByUnit(): Promise<CountByEntity[]> {
  const { data } = await axiosInstance.get<CountByEntity[]>(`${DASHBOARD_PATH}/documents/units`)
  return data.map(d => ({
    id: d.id ?? d.id,
    workflowName: d.workflowName ?? d.workflowName,
    totalProcesses: d.totalProcesses ?? d.totalProcesses,
  }))
}

export async function getDocumentsByWorkflow(): Promise<CountByEntity[]> {
  const { data } = await axiosInstance.get<CountByEntity[]>(`${DASHBOARD_PATH}/documents/workflows`)
  return data.map(d => ({
    id: d.id ?? d.id,
    workflowName: d.workflowName ?? d.workflowName,
    totalProcesses: d.totalProcesses ?? d.totalProcesses,
  }))
}

/* Notificações */
export async function getNotificationsByUnit(month: number, year: number): Promise<CountByEntity[]> {
  const { data } = await axiosInstance.get<CountByEntity[]>(`${DASHBOARD_PATH}/notifications/units`, {
    params: { month, year },
  })
  return data.map(d => ({
    id: d.id ?? d.id,
    workflowName: d.workflowName ?? d.workflowName,
    totalProcesses: d.totalProcesses ?? d.totalProcesses,
  }))
}

export async function getNotificationsByWorkflow(): Promise<CountByEntity[]> {
  const { data } = await axiosInstance.get<CountByEntity[]>(`${DASHBOARD_PATH}/notifications/workflows`)
  return data.map(d => ({
    id: d.id ?? d.id,
    workflowName: d.workflowName ?? d.workflowName,
    totalProcesses: d.totalProcesses ?? d.totalProcesses,
  }))
}

/* Status de processos */
export async function getProcessStatusPerUnit(): Promise<StatusByEntity[]> {
  const { data } = await axiosInstance.get<any[]>(`${DASHBOARD_PATH}/status/units`)

  // Agrupar por unidade
  const grouped = data.reduce((acc, item) => {
    const unitId = item.unitId
    const existing = acc.find((u: { id: any }) => u.id === unitId)

    const statusCount = { status: item.status, count: item.count }

    if (existing) {
      existing.statuses.push(statusCount)
    } else {
      acc.push({
        id: unitId,
        name: item.unitName,
        statuses: [statusCount],
      })
    }

    return acc
  }, [] as StatusByEntity[])

  return grouped
}


export async function getProcessStatusPerWorkflow(): Promise<StatusByEntity[]> {
  const { data } = await axiosInstance.get<any[]>(`${DASHBOARD_PATH}/status/workflows`)

  const grouped = data.reduce((acc, item) => {
    const workflowId = item.workflowId
    const existing = acc.find((w: { id: any }) => w.id === workflowId)

    const statusCount = { status: item.status, count: item.count }

    if (existing) {
      existing.statuses.push(statusCount)
    } else {
      acc.push({
        id: workflowId,
        name: item.workflowName,
        statuses: [statusCount],
      })
    }

    return acc
  }, [] as StatusByEntity[])

  return grouped
}


/* Top N */
export async function getTopUnits(topN: number): Promise<CountByEntity[]> {
  const { data } = await axiosInstance.get<CountByEntity[]>(`${DASHBOARD_PATH}/top/units/${topN}`)
  return data.map(d => ({
    id: d.id ?? d.id,
    workflowName: d.workflowName ?? d.workflowName,
    totalProcesses: d.totalProcesses,
  }))
}

export async function getTopWorkflows(topN: number): Promise<CountByEntity[]> {
  const { data } = await axiosInstance.get<CountByEntity[]>(`${DASHBOARD_PATH}/top/workflows/${topN}`)
  return data.map(d => ({
    id: d.id ?? d.id,
    workflowName: d.workflowName ?? d.workflowName,
    totalProcesses: d.totalProcesses,
  }))
}

/* Duração média */
export async function getProcessDurationByWorkflow(topN: number): Promise<DurationByWorkflow[]> {
  const { data } = await axiosInstance.get<DurationByWorkflow[]>(`${DASHBOARD_PATH}/duration/workflows/${topN}`)
  return data
}
