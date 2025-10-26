import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Handle, Position } from "@xyflow/react";
import { ChevronDown, ChevronUp, User, Clock } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

export function UnitNode({ data }: any) {
  const [open, setOpen] = useState(false);

  const statusColor =
    data.status === "current"
      ? "bg-amber-400"
      : data.status === "pending"
      ? "bg-blue-400"
      : data.status === "visited"
      ? "bg-gray-400"
      : "bg-gray-200";

  return (
    <div className="w-[270px]">
      <Card
        className={clsx(
          "rounded-xl"
        )}
      >

        <div className="flex">
          <div className={clsx("w-1.5", statusColor)} />

          <div className="flex-1">
            {/* --- Cabeçalho --- */}
            <CardHeader className="py-3 px-4  border-b border-gray-100">
              <div className="flex flex-col">
                <CardTitle className="text-sm font-semibold ">
                  {data.label || "Unidade sem nome"}
                </CardTitle>
                <p className="text-xs ">{data.email}</p>
              </div>
            </CardHeader>

            {/* --- Corpo colapsável --- */}
            <Collapsible open={open} onOpenChange={setOpen}>
              <CollapsibleTrigger asChild>
                <div
                  className="flex items-center justify-between px-4 py-2 text-xs font-medium  cursor-pointer  "
                  title="Ver detalhes"
                >
                  <span>Ver detalhes</span>
                  {open ? (
                    <ChevronUp className="h-4 w-4 " />
                  ) : (
                    <ChevronDown className="h-4 w-4 " />
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-3 pb-4 text-xs space-y-3">
                  {/* --- Aprovações --- */}
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>Aprovações</span>
                    <span className="font-semibold ">
                      {data.approvals ?? 0}
                    </span>
                  </div>

                  {/* --- Histórico --- */}
                  {data.history?.length > 0 ? (
                    <div className="space-y-2 mt-2">
                      <p className="text-[11px] font-semibold text-gray-500">
                        Histórico de intervenções
                      </p>
                      <div className="max-h-32 overflow-y-auto rounded-lg border border-gray-100  p-2 space-y-2">
                        {data.history.map((h: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center rounded-md  px-2 py-1 border border-gray-100 shadow-sm"
                          >
                            <div className="flex items-center gap-1">
                              <User className="h-3.5 w-3.5 " />
                              <span className=" font-medium">
                                {h.updatedBy}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 ">
                              <Clock className="h-3.5 w-3.5" />
                              <span>
                                {new Date(h.updatedAt).toLocaleString("pt-PT", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] ">
                      Nenhuma intervenção registada.
                    </p>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>

            {/* --- Rodapé --- */}
            {data.status === "current" && (
              <CardFooter className=" py-1 text-xs font-medium  text-center border-t border-gray-100">
                Em curso
              </CardFooter>
            )}
          </div>
        </div>
      </Card>

      {/* --- Handles --- */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
