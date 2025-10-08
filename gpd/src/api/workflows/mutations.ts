import { useMutation } from "@tanstack/react-query";
import { createWorkflow, deleteWorkflow } from "../../../src/services/worklows.service";
import type {  Workflow, WorkflowResponse } from "../workflows/types";



export function useCreateWorkflow() {
  return useMutation<WorkflowResponse, Error, Workflow>({
    mutationFn: (data: Workflow) => createWorkflow(data)
  });
}



export function useDeleteApplication() {
  return useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteWorkflow(id),
  });
}
