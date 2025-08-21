import { queryOptions } from '@tanstack/react-query'
import { getWorkflowById, getAllWorkflows, getFlowById } from '../../services/worklows.service'

export function useGetWorkflowByIdOptions(id: number) {
  return queryOptions({
    queryKey: ['workflow', id],
    queryFn: () => getWorkflowById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  })
}

export function useGetFlowByIdOptions(id: number | null) {
  return queryOptions({
    queryKey: ['flow', id],
    queryFn: () => (id ? getFlowById(id) : Promise.resolve(null)), 
    staleTime: 5 * 60 * 1000,
    enabled: !!id, 
  });
}

export function useGetAllWorkflowsOptions(){
  return queryOptions({
    queryKey:['workflows'],
    queryFn: () => getAllWorkflows(),
    staleTime: 5 * 60 * 1000
  })
}