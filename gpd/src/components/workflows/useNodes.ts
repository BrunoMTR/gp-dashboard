import * as React from "react";
import SortableJS from "sortablejs";
import type { NodeItem } from "./types";

export function useNodes(onChangeNodes?: (nodes: NodeItem[]) => void) {
  const [nodesList, setNodesList] = React.useState<NodeItem[]>([]);
  const idCounter = React.useRef(0);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!listRef.current) return;

    const sortable = SortableJS.create(listRef.current, {
      animation: 150,
      ghostClass: "bg-gray-200/50",
      handle: ".drag-handle",
      onEnd: (evt) => {
        setNodesList((prev) => {
          const newList = [...prev];
          const [movedItem] = newList.splice(evt.oldIndex!, 1);
          newList.splice(evt.newIndex!, 0, movedItem);
          return newList;
        });
      },
    });

    return () => sortable.destroy();
  }, []);

  React.useEffect(() => {
    if (onChangeNodes) onChangeNodes([...nodesList]);
  }, [nodesList, onChangeNodes]);

  const addNode = (holder: string, parecer: number) => {
    setNodesList((prev) => [...prev, { id: idCounter.current++, holder, parecer }]);
  };

  const clearNodes = () => setNodesList([]);

  return { nodesList, addNode, clearNodes, listRef };
}
