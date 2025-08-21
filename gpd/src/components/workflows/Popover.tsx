import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Workflow } from "@/api/workflows/types";

interface WorkflowPopoverProps {
  workflow: Workflow | null;
}

export function WorkflowPopover({ workflow }: WorkflowPopoverProps) {
  const hasData = workflow !== null;
  return (
    <div className="absolute top-140  z-10 flex flex-col space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="text-sm font-medium" disabled={!hasData}>
            Detalhes
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-4 space-y-3">
          <div >
            <h3 >
              {workflow?.name}
            </h3>
            <p >
              {workflow?.abbreviation}
            </p>
          </div>

          <Separator />

          <div>
            <p >Equipe:</p>
            <p >{workflow?.team}</p>
          </div>

          <div>
            <p >E-mail da equipe:</p>
            <p >{workflow?.teamEmail}</p>
          </div>

          <div>
            <p >E-mail da aplicação:</p>
            <p >{workflow?.applicationEmail}</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
