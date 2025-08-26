import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical } from "lucide-react";
import { CriarUnitDialog } from "./CriarUnitDialog";
import SortableJS from "sortablejs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator
} from "@/components/ui/select";
import type { Unit } from "@/api/units/types";
import type { NodeItem } from "./types";


interface FlowConfigurationProps {
  units: Unit[];
  unitsError?: Error | null;
  isLoadingUnits: boolean;
  holder?: string;
  onHolderChange: (value: string | undefined) => void;
  pareceres: number;
  onPareceresChange: (value: number) => void;
  nodesList: NodeItem[];
  onAdicionar: () => void;
  podeAdicionar: boolean;
  listRef: React.RefObject<HTMLDivElement | null>;
  selectKey: number
  onNodesChange: (nodes: NodeItem[]) => void;
}

export function FlowConfiguration({
  units,
  unitsError,
  isLoadingUnits,
  holder,
  onHolderChange,
  pareceres,
  onPareceresChange,
  nodesList,
  onAdicionar,
  podeAdicionar,
  listRef,
  selectKey,
  onNodesChange,
}: FlowConfigurationProps) {

  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [createdUnits, setCreatedUnits] = React.useState<Unit[]>([]);


  const combinedUnits = [...units, ...createdUnits];

  const handleCriarUnit = (novo: Unit) => {
    setCreatedUnits((prev) => [...prev, novo]);
    onHolderChange(novo.id!.toString());
  };

  const handleAbrirDialog = () => {
    setSelectOpen(false);
    setTimeout(() => setOpenDialog(true), 0);
  };


  React.useEffect(() => {
    if (!listRef.current) return;

    const sortable = SortableJS.create(listRef.current, {
      animation: 150,
      ghostClass: "bg-gray-200/50",
      handle: ".drag-handle",
      onEnd: (evt) => {
        const newList = [...nodesList];
        const [movedItem] = newList.splice(evt.oldIndex!, 1);
        newList.splice(evt.newIndex!, 0, movedItem);

        onNodesChange(newList);
      },
    });

    return () => sortable.destroy();
  }, [listRef, nodesList, onNodesChange]);



  return (
    <>
      <div>
        <h2 className="text-sm font-semibold mb-0.5">Configuração do Flow</h2>
        <p className="text-xs text-gray-600 mb-2">
          Selecione o holder e indique o número de pareceres necessários.
        </p>

        <div className="flex gap-2 items-end">
          <div className="flex-1 flex flex-col gap-1">
            <Label htmlFor="holder" className="text-xs font-medium">
              Holder
            </Label>
            <Select
              key={selectKey}
              value={holder || ""}
              onValueChange={(val) => onHolderChange(val || undefined)} // envia pro pai
              open={selectOpen}
              onOpenChange={setSelectOpen}
            >
              <SelectTrigger className="w-full min-w-[150px] max-w-[150px]">
                <SelectValue placeholder={isLoadingUnits ? "Carregando Units..." : "Selecionar Unit"} />
              </SelectTrigger>
              <SelectContent className="w-full min-w-[150px] max-w-[150px]">
                <button
                  type="button"
                  onClick={handleAbrirDialog}
                  onMouseDown={(e) => e.preventDefault()}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer text-blue-600 hover:bg-gray-100 rounded-md"
                >
                  <Plus className="w-4 h-4" />
                  Criar novo Unit
                </button>

                <SelectSeparator />

                {unitsError && <span className="text-red-500 text-xs">{unitsError.message}</span>}
                {isLoadingUnits && <span className="text-xs">Carregando...</span>}
                {!isLoadingUnits &&
                  combinedUnits.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id!.toString()}>
                      {unit.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-16 flex flex-col gap-1">
            <Label
              htmlFor="pareceres"
              className="text-xs font-medium text-right"
            >
              Pareceres
            </Label>
            <Input
              id="pareceres"
              type="number"
              value={pareceres}
              onChange={(e) => {
                const val = Number(e.target.value);
                onPareceresChange(val);
              }}
              placeholder="0-5"
              min={0}
              max={5}
            />
          </div>

          <Button
            onClick={onAdicionar}
            className="p-0 flex justify-center items-center"
            disabled={!podeAdicionar}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-0.5">Nós Criados</h2>
        <p className="text-xs text-gray-600 mb-1">
          Lista dos nós atualmente adicionados ao fluxo.
        </p>

        <div ref={listRef} className="flex flex-col gap-1">
          {nodesList.map((node) => (
            <div
              key={node.key} // usa key (único no array), não node.id
              className="flex items-center justify-between text-xs cursor-default"
            >
              <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                {node.holder} - {node.parecer} parecer{node.parecer === 1 ? "" : "es"}
              </span>
              <GripVertical className="drag-handle w-4 h-4 text-gray-500 cursor-grab hover:cursor-grab" />
            </div>
          ))}
        </div>

      </div>
      <CriarUnitDialog
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open) {
            setSelectOpen(false);
          }
        }}
        onCriar={handleCriarUnit}
      />
    </>
  );
}
