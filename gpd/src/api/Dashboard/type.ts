/* Totais globais */
export interface TotalsResponse {
  totalUnits: number
  totalWorkflows: number
}

/* Contagem genérica para documentos, notificações, top N */
export interface CountByEntity {
  id: number             // unitId ou workflowId
  workflowName: string | null    // unitName ou workflowName
  totalProcesses: number // documentCount, totalProcesses ou notificationCount
}

/* Notificações com filtros */
export interface NotificationsFilter {
  month: number
  year: number
}

/* Status por unidade ou workflow */
export interface StatusCount {
  status: string
  count: number
}

export interface StatusByEntity {
  id: number
  name: string | null
  statuses: StatusCount[]
}

/* Duração média por workflow */
export interface DurationByWorkflow {
  workflowId: number
  workflowName: string | null
  averageDurationHours: number
}
