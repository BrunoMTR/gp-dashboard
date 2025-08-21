import { createFileRoute, useSearch, useRouter } from '@tanstack/react-router'
import { useGetAllWorkflowsOptions, useGetFlowByIdOptions } from '@/api/workflows/queries'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { Flow } from '@/components/workflows/flow'
import { Menu } from '@/components/workflows/menu'
import { Sidebar } from '@/components/workflows/sidebar'
import { WorkflowPopover } from '@/components/workflows/Popover'
import type { Workflow } from '@/api/workflows/types'
import { ModalInfo } from '@/components/workflows/modalInfo'
import { Form } from '@/components/workflows/form'
import { useWorkflowState } from '@/store/workflowStore'

export const Route = createFileRoute('/workflow')({
  validateSearch: (search: Record<string, unknown>) => ({
    selected: search.selected ? Number(search.selected) : undefined,
  }),
  component: WorkflowPage,
})

function WorkflowPage() {
  const search = useSearch({ from: '/workflow' }) 
  const router = useRouter()

  const selectedItem = useWorkflowState((state) => state.selectedItem)
  const setSelectedItem = useWorkflowState((state) => state.setSelectedItem)

  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = React.useState<Workflow | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isFormOpen, setIsFormOpen] = React.useState(false)

  const { data: workflowsData = [], isLoading: isLoadingWorkflows, error: workflowsError } =
    useQuery(useGetAllWorkflowsOptions())

  const { data: flowData = null } = useQuery(
    useGetFlowByIdOptions(selectedWorkflow?.id ?? 0)
  )

React.useEffect(() => {
    if (search.selected !== undefined) {
      setSelectedItem(search.selected)
    }
  }, [search.selected])

  React.useEffect(() => {
    if (selectedItem !== 0 && workflowsData.length > 0) {
      const wf = workflowsData.find((w) => w.id === selectedItem)
      if (wf) setSelectedWorkflow(wf)
    }
  }, [selectedItem, workflowsData])

  
  const handleSelectWorkflow = (wf: Workflow) => {
    setSelectedWorkflow(wf)
    router.navigate({
      to: '/workflow',
      search: { selected: wf.id },
      replace: true,
    })
  }

  return (
    <div className="p-4">
      <Menu
        onOpenSheet={() => setIsSheetOpen(true)}
        onOpenModal={() => setIsModalOpen(true)}
        workflow={selectedWorkflow}
        onOpenForm={() => setIsFormOpen(true)}
      />

      <ModalInfo open={isModalOpen} setOpen={setIsModalOpen} workflow={selectedWorkflow} />
      <Form open={isFormOpen} setOpen={setIsFormOpen} />

      <Sidebar
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        isLoading={isLoadingWorkflows}
        error={workflowsError as Error | null}
        data={workflowsData}
        onSelectWorkflow={handleSelectWorkflow}
      />

      <Flow data={flowData} />
      <WorkflowPopover workflow={selectedWorkflow} />
    </div>
  )
}

export default WorkflowPage
