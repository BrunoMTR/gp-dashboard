import axiosInstance from '@/lib/axios'
import type {WorkflowResponse, Application, FlowApiResponse, Workflow } from '../api/workflows/types'

const APPLICATION_PATH = '/applications'
const FLOW_PATH = '/flows'


export async function createWorkflow(data: Workflow): Promise<WorkflowResponse> {
  const response = await axiosInstance.post(APPLICATION_PATH, data)
  return response.data
}


export async function getAllWorkflows(): Promise<Application[]> {
  const response = await axiosInstance.get(APPLICATION_PATH)
  return response.data
}

export async function getWorkflowById(id: number): Promise<Application> {
  const response = await axiosInstance.get(`${APPLICATION_PATH}/${id}`)
  return response.data
}

export async function getFlowById(id: number): Promise<FlowApiResponse> {
  const response = await axiosInstance.get(`${FLOW_PATH}/${id}`)
  return response.data
}

export async function updateWorkflow(id: number, data: Application): Promise<Application> {
  const response = await axiosInstance.put(`${APPLICATION_PATH}/${id}`, data)
  return response.data
}

export async function deleteWorkflow(id: number): Promise<void> {
  await axiosInstance.delete(`${APPLICATION_PATH}/${id}`)
}