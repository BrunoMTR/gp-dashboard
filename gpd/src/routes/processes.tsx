import { createFileRoute } from '@tanstack/react-router'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ProcessesTable } from '@/components/processes/processes-table'

export const Route = createFileRoute('/processes')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full h-screen p-4"> {/* margem em cima, baixo e lados */}
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full rounded-lg border shadow"
      >
        {/* Painel Esquerdo */}
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Esquerda</span>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Painel Direito */}
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <ProcessesTable/>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
