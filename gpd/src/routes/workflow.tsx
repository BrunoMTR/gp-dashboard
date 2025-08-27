import { createFileRoute, useRouter } from '@tanstack/react-router'
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
import { useSelectedWorkflowFromSearch } from '@/hook/useSelectedWorkflowFromSearch'


export const Route = createFileRoute('/workflow')({
  validateSearch: (search: Record<string, unknown>) => ({
    selected: search.selected ? Number(search.selected) : undefined,
  }),
  component: WorkflowPage,
})

function WorkflowPage() {
  useSelectedWorkflowFromSearch()
  const router = useRouter()
  const selectedItem = useWorkflowState((state) => state.selectedItem)
  const [uiState, setUiState] = React.useState({
    isSheetOpen: false,
    isModalOpen: false,
    isFormOpen: false,
  })

  const
    {
      data: workflowsData = [],
      isLoading: isLoadingWorkflows,
      error: workflowsError
    } = useQuery(useGetAllWorkflowsOptions())

  const { data: flowData = null } = useQuery(
    useGetFlowByIdOptions(selectedItem ?? 0)
  )

  const selectedWorkflow = React.useMemo(() => {
    return workflowsData.find((w) => w.id === selectedItem) ?? null
  }, [selectedItem, workflowsData])

  const handleSelectWorkflow = (wf: Workflow) => {
    router.navigate({
      to: '/workflow',
      search: { selected: wf.id },
      replace: true,
    })
  }

  const toggleUi = (key: keyof typeof uiState, value: boolean) => {
    setUiState((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-4">
      <Menu
        onOpenSheet={() => toggleUi('isSheetOpen', true)}
        onOpenModal={() => toggleUi('isModalOpen', true)}
        onOpenForm={() => toggleUi('isFormOpen', true)}
        workflow={selectedWorkflow}
      />

      <ModalInfo open={uiState.isModalOpen} setOpen={(v) => toggleUi('isModalOpen', v)} workflow={selectedWorkflow} />
      <Form open={uiState.isFormOpen} setOpen={(v) => toggleUi('isFormOpen', v)} />

      <Sidebar
        open={uiState.isSheetOpen}
        onOpenChange={(v) => toggleUi('isSheetOpen', v)}
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
