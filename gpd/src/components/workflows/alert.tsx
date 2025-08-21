import { CheckCircle2Icon, XCircleIcon, Loader2 } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface Result {
  message: string
  status: "success" | "error" | "loading"
}

export function AlertMutation({ message, status }: Result) {
  const getIcon = () => {
    if (status === "success") return <CheckCircle2Icon className="text-green-600" />
    if (status === "error") return <XCircleIcon className="text-red-600" />
    if (status === "loading") return <Loader2 className="animate-spin text-blue-600" />
    return null
  }

  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert className={
        status === "success" 
          ? "border-green-500" 
          : status === "error" 
            ? "border-red-500" 
            : "border-blue-500"
      }>
        {getIcon()}
        <AlertTitle className={
          status === "success" 
            ? "text-green-700" 
            : status === "error" 
              ? "text-red-700" 
              : "text-blue-700"
        }>
          {status === "success" ? "Sucesso" : status === "error" ? "Erro" : "Processando..."}
        </AlertTitle>
        <AlertDescription>
          {message}
        </AlertDescription>
      </Alert>
    </div>
  )
}
