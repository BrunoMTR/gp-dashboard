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

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer text-sm text-muted-foreground hover:bg-accent w-64"
      >
        <Search className="h-4 w-4" />
        <span>Pesquisar...</span>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Digite um comando ou pesquise..." />
        <CommandList>
          <CommandEmpty>Sem resultados encontrados.</CommandEmpty>
          <CommandGroup heading="Sugestões">
            <CommandItem>Calendário</CommandItem>
            <CommandItem>Pesquisar Emoji</CommandItem>
            <CommandItem>Calculadora</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Configurações">
            <CommandItem>Perfil</CommandItem>
            <CommandItem>Faturamento</CommandItem>
            <CommandItem>Definições</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
