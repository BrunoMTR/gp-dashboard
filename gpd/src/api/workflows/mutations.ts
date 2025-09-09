import { useMutation } from "@tanstack/react-query";
import { createWorkflow, deleteWorkflow } from "../../../src/services/worklows.service";
import type {  Application, WorkflowResponse } from "../workflows/types";



export function useCreateWorkflow() {
  return useMutation<WorkflowResponse, Error, Application>({
    mutationFn: (data: Application) => createWorkflow(data)
  });
}



export function useDeleteApplication() {
  return useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteWorkflow(id),
  });
}
