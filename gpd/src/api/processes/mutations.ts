import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelProcess, approveProcess, returnProcess } from "../../services/processes.service";
import type { Response, Request } from "../../api/processes/types";

export function useCancelProcess() {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, { processId: number; request: Request }>({
    mutationFn: ({ processId, request }) => cancelProcess(processId, request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["processes"] }),
  });
}

export function useApproveProcess() {
  const queryClient = useQueryClient()
  return useMutation<Response, Error, { request: Request }>({
    mutationFn: ({ request }) => approveProcess(request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["processes"] }),
  })
}

export function useReturnProcess() {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, { processId: number; request: Request }>({
    mutationFn: ({ processId, request }) => returnProcess(processId, request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["processes"] }),
  });
}


