import type { Application } from "@/api/workflows/types"
import  {Alert} from '../workflows/AlertDialog'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useState } from "react"





interface MenuProps {
  onOpenSheet: () => void
  onOpenModal: () => void
  onOpenForm: () => void
  application: Application | null
}

export function Menu({ onOpenSheet, onOpenModal,  application: workflow }: MenuProps) {
  const hasWorkflowData = Boolean(workflow && Object.keys(workflow).length > 0)
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute top-32 left-75 z-20 w-fit ">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Fluxo</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled={!hasWorkflowData}>
              Redefinir <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled={!hasWorkflowData}>Extrair</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Workflow</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={onOpenModal} disabled={!hasWorkflowData}>Atualizar dados</MenubarItem>
            <MenubarItem disabled={!hasWorkflowData} onSelect={() => setOpen(true) }>Remover</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={onOpenSheet}>Ver outros</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Alert
        title="Apagar aplicação"
        message="Tens a certeza que queres apagar esta aplicação?"
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}