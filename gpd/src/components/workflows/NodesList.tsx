import { GripVertical } from "lucide-react";
import type { NodeItem } from "./types";

interface Props {
  nodes: NodeItem[];
  listRef: React.RefObject<HTMLDivElement>;
}

export function NodesList({ nodes, listRef }: Props) {
  return (
    <div>
      <h2 className="text-sm font-semibold mb-0.5">Nós Criados</h2>
      <p className="text-xs text-gray-600 mb-1">Lista dos nós atualmente adicionados ao fluxo.</p>

      <div ref={listRef} className="flex flex-col gap-1">
        {nodes.map((node) => (
          <div key={node.id} className="flex items-center justify-between text-xs cursor-default">
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">
              {node.holder} - {node.parecer} parecer{node.parecer === 1 ? "" : "es"}
            </span>
            <GripVertical className="drag-handle w-4 h-4 text-gray-500 cursor-grab hover:cursor-grab" />
          </div>
        ))}
      </div>
    </div>
  );
}
