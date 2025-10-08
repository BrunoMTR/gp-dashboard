import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Application } from "@/api/workflows/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface WorkflowPopoverProps {
  application: Application | null;
}

export function WorkflowPopover({ application: workflow }: WorkflowPopoverProps) {
  const [open, setOpen] = useState(false);
  const hasData = workflow !== null;

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="p-2 rounded-full w-10 h-10 flex items-center justify-center"
            disabled={!hasData}
          >
            {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-4 space-y-3">
          <div>
            <h3 className="font-medium text-lg">{workflow?.name}</h3>
            <p className="text-sm text-muted-foreground">{workflow?.abbreviation}</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium">Equipe:</p>
            <p className="text-sm">{workflow?.team}</p>
          </div>

          <div>
            <p className="text-sm font-medium">E-mail da equipe:</p>
            <p className="text-sm">{workflow?.teamEmail}</p>
          </div>

          <div>
            <p className="text-sm font-medium">E-mail da aplicação:</p>
            <p className="text-sm">{workflow?.applicationEmail}</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
