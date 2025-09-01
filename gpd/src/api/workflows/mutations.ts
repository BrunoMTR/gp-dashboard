import { useMutation } from "@tanstack/react-query";
import { createFlow, createWorkflow, deleteWorkflow } from "../../../src/services/worklows.service";
import type { Workflow, Flow, FlowData, WorkflowInput } from "../workflows/types";

export function useCreateWorkflow(onSuccess?: (workflow: Workflow) => void) {
  return useMutation<Workflow, Error, WorkflowInput>({
    mutationFn: (data: WorkflowInput) => createWorkflow(data),
    onSuccess,
  });
}
export function useCreateFlow() {
  return useMutation<FlowData, Error, Flow>({
    mutationFn: (data: Flow) => createFlow(data),
  });
}

export function useDeleteApplication() {
  return useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteWorkflow(id),
  });
}
