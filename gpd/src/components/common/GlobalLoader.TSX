import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useRouterState } from '@tanstack/react-router'
import { Spinner } from "../ui/spinner"

export function GlobalLoader() {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const isRouting = useRouterState({
    select: (state) => state.status === 'pending',
  })

  const isLoading = isRouting || isFetching > 0 || isMutating > 0

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
      <Spinner className="h-10 w-10" />
    </div>
  )
}

