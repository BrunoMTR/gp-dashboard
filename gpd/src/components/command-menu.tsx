"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { toast } from "sonner"; // ✅ Importa o sonner
import {
  useCancelProcess,
  useApproveProcess,
  useReturnProcess,
} from "../api/processes/mutations";
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [currentCommand, setCurrentCommand] = React.useState<string | null>(null);

  const cancelMutation = useCancelProcess();
  const approveMutation = useApproveProcess();
  const returnMutation = useReturnProcess();

  async function handleCommand(command: string) {
    const [action, value] = command.split(":");
    const processId = Number(value);

    if (!action || !value || isNaN(processId)) {
      toast.error("Formato inválido. Use algo como acção:ID", { duration: 5000 });
      return;
    }

    setCurrentCommand(command);

    try {
      if (action === "cancelar") {
        await cancelMutation.mutateAsync(processId,);
        toast.success(`Processo ${processId} cancelado com sucesso!`, { duration: 5000 });
      } else if (action === "aprovar") {
        await approveMutation.mutateAsync(processId);
        toast.success(`Processo ${processId} aprovado!`, { duration: 5000 });
      } else if (action === "devolver") {
        await returnMutation.mutateAsync(processId);
        toast.success(`Processo ${processId} devolvido!`, { duration: 5000 });
      } else {
        toast.warning(`Comando desconhecido: ${action}`, { duration: 5000 });
      }
    } catch (error: any) {
      toast.error(`Erro: ${error.message || "Falha ao executar ação"}`, { duration: 5000 });
    } finally {
      setCurrentCommand(null);
    }
  }

  const isCommandPattern = /^[a-zA-Z]+:\d+$/.test(inputValue.trim());
  const isLoading =
    cancelMutation.isPending ||
    approveMutation.isPending ||
    returnMutation.isPending;

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer text-sm text-muted-foreground hover:bg-accent w-64"
      >
        <Search className="h-4 w-4" />
        <span>Pesquisar/executar comando...</span>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={inputValue}
          onValueChange={setInputValue}
          placeholder="Digite um comando (ex: acção:ID)"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommand(inputValue.trim());
            }
          }}
        />

        <CommandList>
          {!isCommandPattern && !isLoading && (
            <CommandEmpty>Sem resultados encontrados.</CommandEmpty>
          )}

          {isLoading && currentCommand && (
            <div className="px-3 py-2">
              <Item variant="muted">
                <ItemMedia>
                  <Spinner />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="line-clamp-1">
                    A processar comando <strong>{currentCommand}</strong>...
                  </ItemTitle>
                </ItemContent>
              </Item>
            </div>
          )}

          <CommandSeparator />

          <CommandGroup heading="Modelos de comando">
            <CommandItem onSelect={() => setInputValue("cancelar:ID")}>
              cancelar: ID
            </CommandItem>
            <CommandItem onSelect={() => setInputValue("aprovar:ID")}>
              aprovar: ID
            </CommandItem>
            <CommandItem onSelect={() => setInputValue("devolver:ID")}>
              devolver: ID
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
