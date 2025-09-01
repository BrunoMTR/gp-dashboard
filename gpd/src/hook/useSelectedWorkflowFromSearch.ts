import { useWorkflowState } from "@/store/workflowStore"
import { useSearch } from "@tanstack/react-router"
import React from "react"

export function useSelectedWorkflowFromSearch() {
  const search = useSearch({ from: '/workflow' })
  const setSelectedItem = useWorkflowState(state => state.setSelectedItem)

  React.useEffect(() => {
    if (search.selected !== undefined) setSelectedItem(search.selected)
  }, [search.selected, setSelectedItem])
}
