import { useQuery } from "@tanstack/react-query"
import {
  getDashboardTotals,
  getDocumentsByUnit,
  getDocumentsByWorkflow,
  getNotificationsByUnit,
  getNotificationsByWorkflow,
  getProcessStatusPerUnit,
  getProcessStatusPerWorkflow,
  getTopUnits,
  getTopWorkflows,
  getProcessDurationByWorkflow,
} from "@/services/dashboard.service"

import type {
  TotalsResponse,
  CountByEntity,
  StatusByEntity,
  DurationByWorkflow,
  NotificationsFilter
} from "./type"

/* ============================ Totais globais =========================== */
export function useDashboardTotals() {
  return useQuery<TotalsResponse, Error>({
    queryKey: ["dashboard", "totals"],
    queryFn: getDashboardTotals,
    staleTime: 5 * 60 * 1000,
  })
}

/* ============================ Documentos =========================== */
export function useDocumentsByUnit() {
  return useQuery<CountByEntity[], Error>({
    queryKey: ["dashboard", "documents", "units"],
    queryFn: getDocumentsByUnit,
    staleTime: 5 * 60 * 1000,
  })
}

export function useDocumentsByWorkflow() {
  return useQuery<CountByEntity[], Error>({
    queryKey: ["dashboard", "documents", "workflows"],
    queryFn: getDocumentsByWorkflow,
    staleTime: 5 * 60 * 1000,
  })
}

/* ============================ Notificações =========================== */
export function useNotificationsByUnit(filters: NotificationsFilter) {
  return useQuery<CountByEntity[], Error>({
    queryKey: ["dashboard", "notifications", "units", filters],
    queryFn: () => getNotificationsByUnit(filters.month, filters.year),
    staleTime: 5 * 60 * 1000,
  })
}

export function useNotificationsByWorkflow() {
  return useQuery<CountByEntity[], Error>({
    queryKey: ["dashboard", "notifications", "workflows"],
    queryFn: getNotificationsByWorkflow,
    staleTime: 5 * 60 * 1000,
  })
}

/* ============================ Status de processos =========================== */
export function useProcessStatusPerUnit() {
  return useQuery<StatusByEntity[], Error>({
    queryKey: ["dashboard", "status", "units"],
    queryFn: getProcessStatusPerUnit,
    staleTime: 5 * 60 * 1000,
  })
}

export function useProcessStatusPerWorkflow() {
  return useQuery<StatusByEntity[], Error>({
    queryKey: ["dashboard", "status", "workflows"],
    queryFn: getProcessStatusPerWorkflow,
    staleTime: 5 * 60 * 1000,
  })
}

/* ============================ Top N =========================== */
export function useTopUnits(topN: number) {
  return useQuery<CountByEntity[], Error>({
    queryKey: ["dashboard", "top", "units", topN],
    queryFn: () => getTopUnits(topN),
    staleTime: 5 * 60 * 1000,
  })
}

export function useTopWorkflows(topN: number) {
  return useQuery<CountByEntity[], Error>({
    queryKey: ["dashboard", "top", "workflows", topN],
    queryFn: () => getTopWorkflows(topN),
    staleTime: 5 * 60 * 1000,
  })
}

/* ============================ Duração média =========================== */
export function useProcessDurationByWorkflow(topN: number) {
  return useQuery<DurationByWorkflow[], Error>({
    queryKey: ["dashboard", "duration", "workflows", topN],
    queryFn: () => getProcessDurationByWorkflow(topN),
    staleTime: 5 * 60 * 1000,
  })
}
