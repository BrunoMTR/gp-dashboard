import axiosInstance from "@/lib/axios"
import type { ProcessFlow } from "../api/processes/types"

const PROCESSES_PATH = "/processes"

export async function getAllProcesses(params: {
  pageIndex?: number
  pageSize?: number
  search?: string
  application?: string
  dateFilter?: string
}): Promise<ProcessFlow[]> {
  const response = await axiosInstance.get(PROCESSES_PATH, { params })
  return response.data
}
