import axiosInstance from "@/lib/axios"
import type { ProcessesApiResponse } from "../api/processes/types"

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
