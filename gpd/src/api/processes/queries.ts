import { useQuery } from "@tanstack/react-query"
import { getAllProcesses } from "../../services/processes.service"

export function useProcesses() {
  return useQuery({
    queryKey: ["processes"],
    queryFn: getAllProcesses,
    staleTime: 5 * 60 * 1000,
  })
}