import axiosInstance from "@/lib/axios"
import type { ProcessFlow } from "../api/processes/types"

const PROCESSES_PATH = "/processes"

export async function getAllProcesses(): Promise<ProcessFlow[]> {
  const response = await axiosInstance.get(PROCESSES_PATH)
  return response.data
}