import axiosInstance from "@/lib/axios"
import type { ProcessesApiResponse, Request } from "../api/processes/types"

const PROCESSES_PATH = "/processes"

export async function getAllProcesses(params: {
  pageIndex?: number
  pageSize?: number
  search?: string
  applicationId?: number
  dateFilter?: string
}): Promise<ProcessesApiResponse> {
  const response = await axiosInstance.get<ProcessesApiResponse>(PROCESSES_PATH, { params })
  return response.data
}


export async function cancelProcess(Id: number, request: Request) {
  const response = await axiosInstance.post(`${PROCESSES_PATH}/${Id}/cancel`, request);
  return response.data;
}

export async function approveProcess(processId: number) {
  const response = await axiosInstance.post(`${PROCESSES_PATH}/${processId}/approve`, Request);
  return response.data;
}

export async function returnProcess(processId: number) {
  const response = await axiosInstance.post(`${PROCESSES_PATH}/${processId}/return`,Request);
  return response.data;
}