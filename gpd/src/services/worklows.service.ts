import axiosInstance from '@/lib/axios'
import type { FlowData, Workflow, Flow, WorkflowInput } from '../api/workflows/types'

const APPLICATION_PATH = '/applications'
const FLOW_PATH = '/flows'

export async function createWorkflow(data: WorkflowInput): Promise<Workflow> {
  const response = await axiosInstance.post(APPLICATION_PATH, data)
  return response.data
}

export async function createFlow(data: Flow): Promise<FlowData> {
  const response = await axiosInstance.post(FLOW_PATH, data)
  return response.data
}

export async function getAllWorkflows(): Promise<Workflow[]> {
  const response = await axiosInstance.get(APPLICATION_PATH)
  return response.data
}

export async function getWorkflowById(id: number): Promise<Workflow> {
  const response = await axiosInstance.get(`${APPLICATION_PATH}/${id}`)
  return response.data
}

export async function getFlowById(id: number): Promise<FlowData> {
  const response = await axiosInstance.get(`${FLOW_PATH}/ui/${id}`)
  return response.data
}

export async function updateWorkflow(id: number, data: Workflow): Promise<Workflow> {
  const response = await axiosInstance.put(`${APPLICATION_PATH}/${id}`, data)
  return response.data
}

export async function deleteWorkflow(id: number): Promise<void> {
  await axiosInstance.delete(`${APPLICATION_PATH}/${id}`)
}