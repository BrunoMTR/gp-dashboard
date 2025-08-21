import { createFileRoute } from '@tanstack/react-router'
import { FlowPreview } from '@/components/workflows/flow-preview'
export const Route = createFileRoute('/new-workflow')({
  component: NewWorkflow,
})

export function NewWorkflow(){
    return(
    <div className="p-4">
            <FlowPreview/>
        </div>
    )
}