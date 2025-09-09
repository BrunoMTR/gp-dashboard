import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTable } from "../workflows/data-table"
import { columns } from "../workflows/columns"
import { type Application } from "@/api/workflows/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useErrorMessage } from "../../hook/useErrorMessage"

interface SidebarProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    isLoading: boolean
    error?: Error | null
    data: Application[]
    onSelectApplication: (application: Application) => void
}

export function Sidebar({
    open,
    onOpenChange,
    isLoading,
    error,
    data,
    onSelectApplication: onSelectWorkflow,
}: SidebarProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="p-4 h-screen max-w-md flex flex-col"
            >
                <div className="space-y-1">
                    <h4 className="text-sm leading-none font-medium">Workflows</h4>
                    <p className="text-muted-foreground text-sm">
                        Selecione um workflow para visualizar o seu fluxo.
                    </p>
                </div>

                <div className="flex-1">
                    {isLoading && (
                        <div className="space-y-2 p-2">
                            <Skeleton className="h-6 w-full rounded" />
                            {[...Array(12)].map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full rounded" />
                            ))}
                        </div>
                    )}
                    {error && (
                        <Alert variant="destructive" className="max-w-xl">
                            <AlertCircle className="h-5 w-5" />
                            <AlertTitle>Erro ao carregar processos</AlertTitle>
                            <AlertDescription>
                                {useErrorMessage(error)}
                            </AlertDescription>
                        </Alert>

                    )}
                    <DataTable
                        columns={columns}
                        data={data}
                        isLoading={isLoading}
                        onRowClick={(application) => {
                            onSelectWorkflow(application)
                            onOpenChange(false)
                        }}
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}
