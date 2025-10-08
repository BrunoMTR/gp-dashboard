// src/components/common/QueryErrorDialog.tsx
import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { useErrorMessage } from "../hook/useErrorMessage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QueryErrorDialogProps {
  error: unknown;
  refetch?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const QueryErrorDialog: React.FC<QueryErrorDialogProps> = ({
  error,
  refetch,
  open,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(!!error);
  const isControlled = open !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;

  const message = useErrorMessage(error);

  // sempre que chegar um erro novo, abre o dialog automaticamente
  React.useEffect(() => {
    if (error) {
      if (isControlled) {
        onOpenChange?.(true);
      } else {
        setInternalOpen(true);
      }
    }
  }, [error]);

  if (!error) return null;

  const handleClose = () => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={isControlled ? onOpenChange : setInternalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Erro ao carregar dados
          </DialogTitle>
          <DialogDescription>
            Ocorreu um erro ao tentar buscar os dados da API.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {message}
        </div>

        <DialogFooter className="flex gap-2">
          {refetch && (
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => refetch()}
            >
              <RotateCcw className="h-4 w-4" />
              Tentar novamente
            </Button>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
