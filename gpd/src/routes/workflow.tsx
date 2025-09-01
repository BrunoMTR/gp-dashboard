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
  const { selectedItem, isSheetOpen, isModalOpen, isFormOpen, setSelectedItem, toggleSheet, toggleModal, toggleForm } =
    useWorkflowState();


  const
    {
      data: workflowsData = [],
      isLoading: isLoadingWorkflows,
      error: workflowsError
    } = useQuery(useGetAllWorkflowsOptions())


  const { data: flowData = null } = useQuery({
    ...useGetFlowByIdOptions(selectedItem ?? 0),
    enabled: !!selectedItem,
  });

  const selectedWorkflow = React.useMemo(() => {
    return workflowsData.find((w) => w.id === selectedItem) ?? null
  }, [selectedItem, workflowsData])


  const handleSelectWorkflow = React.useCallback(
    (wf: Workflow) => {
      setSelectedItem(wf.id);
      router.navigate({
        to: '/workflow',
        search: { selected: wf.id },
        replace: true,
      });
    },
    [router, setSelectedItem]
  );

  if (isLoadingWorkflows) {
    return <div>Loading workflows...</div>;
  }


  return (
    <div className="p-4">
      <Menu
        onOpenSheet={() => toggleSheet(true)}
        onOpenModal={() => toggleModal(true)}
        onOpenForm={() => toggleForm(true)}
        workflow={selectedWorkflow}
      />

      <ModalInfo open={isModalOpen} setOpen={toggleModal} workflow={selectedWorkflow} />
      <Form open={isFormOpen} setOpen={toggleForm} />
      <Sidebar
        open={isSheetOpen}
        onOpenChange={toggleSheet}
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
