import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"


export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div>
    <Button variant={'outline'}>click</Button>
  </div>
}


