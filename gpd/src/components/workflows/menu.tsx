import type { Workflow } from "@/api/workflows/types"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

interface MenuProps {
  onOpenSheet: () => void
  onOpenModal: () => void
  onOpenForm: () => void
  workflow: Workflow | null
}

export function Menu({ onOpenSheet, onOpenModal, onOpenForm, workflow }: MenuProps) {
const hasWorkflowData = Boolean(workflow && Object.keys(workflow).length > 0)
  return (
    <div className="w-auto mb-4">
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
            <MenubarItem disabled={!hasWorkflowData}>Bloquear</MenubarItem>
            <MenubarItem onSelect={onOpenForm}>Registrar</MenubarItem>
            <MenubarItem disabled={!hasWorkflowData}>Remover</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={onOpenSheet}>Ver outros</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}