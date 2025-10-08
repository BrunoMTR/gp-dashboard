import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useBlocker } from "@tanstack/react-router";
import { FlowPreview } from "@/components/workflows/flow-preview";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import type { NodeItem } from "@/components/workflows/types";
import { useErrorMessage } from "../hook/useErrorMessage"

export const Route = createFileRoute("/new-workflow")({
  component: NewWorkflow,
});

export function NewWorkflow() {
  const [nodesExist, setNodesExist] = React.useState(false);

  const { status, proceed, reset } = useBlocker({
    shouldBlockFn: () => nodesExist, 
    withResolver: true,
  });


  return (
    <div className="p-4 h-full w-full overflow-hidden" >
      <FlowPreview NodesChange={(nodesList: NodeItem[]) => setNodesExist(nodesList.length > 0)} />

      {status === "blocked" && (
        <AlertDialog open onOpenChange={() => reset()}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Você tem alterações não salvas
              </AlertDialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Tem certeza que quer sair? Todas as alterações serão perdidas.
              </p>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-2 justify-end">
              <AlertDialogCancel onClick={() => reset()}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => proceed()}>
                Sim, sair
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
