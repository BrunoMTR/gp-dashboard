// components/ProcessFlow.tsx
import * as React from "react";
import {
  ReactFlow,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
  type Node as FlowNode,
  type Edge as FlowEdge,
} from "@xyflow/react";
import { DepartmentNode } from "../workflows/department-node";

const nodeTypes = { department: DepartmentNode };

export type NodeData = {
  label: string;
  status: "pending" | "visited" | "current";
};

export type Node = {
  id: string;
  position: { x: number; y: number };
  data: NodeData;
  type: string;
};

export type Edge = {
  id: string;
  source: string;
  target: string;
  label: string;
};

interface ProcessFlowProps {
  nodes: Node[];
  edges: Edge[];
}

export function ProcessFlow({ nodes: initialNodes, edges: initialEdges }: ProcessFlowProps) {
  const [nodes, setNodes] = React.useState<FlowNode[]>(initialNodes);
  const [edges, setEdges] = React.useState<FlowEdge[]>(initialEdges);

  const onNodesChange = React.useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = React.useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes.map((node) => ({
        ...node,
        style: {
          backgroundColor:
            node.data.status === "current"
              ? "#f59e0b"
              : node.data.status === "visited"
              ? "#ccccccff"
              : "#3b82f6",
          color: "white",
          padding: 10,
          borderRadius: 6,
        },
      }))}
      edges={edges.map((edge) => ({
        ...edge,
        type: "step",
        animated: true,
        style: { strokeWidth: 2, stroke: "#bfd0f5ff" },
      }))}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodesDraggable={true}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
    </ReactFlow>
  );
}