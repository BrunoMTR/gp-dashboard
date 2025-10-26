import { Spinner } from "../src/components/ui/spinner"

export function GlobalLoader() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
      <Spinner className="h-10 w-10" /> 
    </div>
  )
}
