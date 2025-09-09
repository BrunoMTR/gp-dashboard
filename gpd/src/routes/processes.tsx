import { createFileRoute } from "@tanstack/react-router"
import { ProcessesTable as Table } from "@/components/processes/Table"
import { useProcesses } from "../api/processes/queries"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { QueryErrorDialog } from "../components/QueryErrorDialog"



export const Route = createFileRoute("/processes")({
  component: RouteComponent,

})

function RouteComponent() {
  const [search, setSearch] = useState("")
  const [application, setApplication] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [pageIndex, setPageIndex] = useState(0)
  const pageSize = 10

  const { data, isLoading, error, refetch: refetchProcesses, } = useProcesses({
    pageIndex,
    pageSize,
    search,
    application,
    dateFilter,
  })

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
      <Table
        data={data ?? []}
        search={search}
        setSearch={setSearch}
        application={application}
        setApplication={setApplication}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
      />
    </div>
  )
}
