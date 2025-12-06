import axiosInstance from "@/lib/axios"
import type { ProcessesApiResponse, DocsApiResponse } from "../api/processes/types"
import type { Response, Request } from "../api/processes/types";
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

export async function getAllDocs(params: {
  pageIndex?: number
  pageSize?: number
  search?: string
  applicationId?: number
  dateFilter?: string
}): Promise<DocsApiResponse> {
  const response = await axiosInstance.get<DocsApiResponse>(`${PROCESSES_PATH}/docs`, { params })
  return response.data
}



export async function cancelProcess(processId: number, request: Request): Promise<Response> {
  const response = await axiosInstance.patch(`${PROCESSES_PATH}/${processId}/cancel`, request);
  return response.data as Response;
}


export async function approveProcess(request: Request): Promise<Response> {
  const formData = new FormData()
  formData.append("processId", request.processId!.toString())
  formData.append("updatedBy", request.updatedBy)
  formData.append("note", request.note)

  const response = await axiosInstance.patch(`${PROCESSES_PATH}/approve`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response.data as Response
}



export async function returnProcess(processId: number, request: Request): Promise<Response> {
  const response = await axiosInstance.patch(`${PROCESSES_PATH}/${processId}/return`, request);
  return response.data as Response;
}

