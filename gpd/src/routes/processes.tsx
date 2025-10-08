import { createFileRoute } from "@tanstack/react-router"
import { ProcessesTable as Table } from "@/components/processes/Table"
import { useProcesses } from "../api/processes/queries"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { QueryErrorDialog } from "../components/QueryErrorDialog"
import { useGetAllWorkflowsOptions } from "@/api/workflows/queries"
import { useQuery } from "@tanstack/react-query"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Feed } from "@/components/processes/Feed"


export const Route = createFileRoute("/processes")({
  component: RouteComponent,

})

function RouteComponent() {
  const [search, setSearch] = useState("")
  const [applicationId, setApplicationId] = useState(0)
  const [dateFilter, setDateFilter] = useState("all")
  const [pageIndex, setPageIndex] = useState(0)
  const pageSize = 10

  const { data: workflowsData = [], isLoading: isLoadingWorkflows, error: workflowsError } = useQuery(useGetAllWorkflowsOptions());

  const { data, isLoading, error, refetch: refetchProcesses, } = useProcesses({
    pageIndex,
    pageSize,
    search,
    applicationId,
    dateFilter,
  })
  const totalCount = data?.totalCount ?? 0;

  if (isLoading) {
    return (
      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-1/4 rounded" />
        <Skeleton className="h-8 w-40 rounded" />
        <Skeleton className="h-10 w-full rounded" />
      </div>
    )
  }




  return (
    <div className="p-4">
      <QueryErrorDialog error={error} refetch={refetchProcesses} />

      <Tabs defaultValue="concluded" className="w-full">
        <TabsList>
          <TabsTrigger value="concluded">Processos</TabsTrigger>
          <TabsTrigger value="in-progress">Em andamento</TabsTrigger>
        </TabsList>

        <TabsContent value="concluded">
          <Table
            totalCount={totalCount}
            data={data?.data ?? []}
            search={search}
            setSearch={setSearch}
            application={applicationId}
            setApplication={setApplicationId}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            workflows={workflowsData}
          />

        </TabsContent>
        
        <TabsContent value="in-progress">
          <Feed/>
        </TabsContent>
    </Tabs >
    </div >
  )
}
