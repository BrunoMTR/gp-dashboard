import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Documentation/$processId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Documentation/$processId"!</div>
}
