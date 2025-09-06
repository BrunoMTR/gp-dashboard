// Representa os dados internos de cada nó
export interface NodeData {
  label: string;
  status: "pending" | "visited" | "current"; // status possíveis
}

// Representa a posição do nó no grafo
export interface NodePosition {
  x: number;
  y: number;
}

// Representa um nó do fluxo
export interface FlowNode {
  id: string;
  position: NodePosition;
  data: NodeData;
  type: string; // "department" ou outros tipos que existirem
}

// Representa uma ligação entre dois nós
export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

// Representa um processo completo com seus nodes e edges
export interface ProcessFlow {
  id: string;
  createdAt: string;
  createdBy: string;
  at: string;
  workflows: string;
  status: "INICIATED" | "PENDING" | "CONCLUDED" | "CANCELED";
  nodes: FlowNode[];
  edges: FlowEdge[];
}

// Quando o backend retorna vários processos
export type ProcessFlowList = ProcessFlow[];


export type Node = { id: string; position: { x: number; y: number }; data: NodeData; type: string }
export type Edge = { id: string; source: string; target: string; label: string }
export type Process = {
  id: string
  createdAt: string
  createdBy: string
  at: string
  workflows: string
  status: "INICIATED" | "PENDING" | "CONCLUDED" | "CANCELED"
  nodes: Node[]
  edges: Edge[]
}