import { createFileRoute } from "@tanstack/react-router"
import { ProcessesTable } from "@/components/processes/processes-table"
import { useProcesses } from "../api/processes/queries"

export const Route = createFileRoute("/processes")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, error } = useProcesses()

  if (isLoading) {
    return <p>Carregando processos...</p>
  }

  if (error) {
    return <p>Erro ao carregar processos</p>
  }

  return (
    <div className="w-full h-screen p-4">
      <ProcessesTable data={data ?? []} />
    </div>
  )
}
