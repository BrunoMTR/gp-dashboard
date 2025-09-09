import type { Node, Edge } from '@xyflow/react'


export type Application = {
  id?: number | undefined,
  name: string;
  abbreviation?: string;
  team: string;
  teamEmail: string;
  applicationEmail: string;
}


export interface Workflow {
  id?: number | null;
  application: Application
  graph: {
    nodes: {
      originId: number;
      destinationId: number;
      approvals: number;
      direction: string; 
    }[];
  };
}


export interface WorkflowResponse{
  application:{
    id: number,  
    name: string,
    abbreviation: string,
    team: string,
    teamEmail: string,
    applicationEmail: string,
  }
  graph:{
    nodes: [
        id: number,
        originId: number,
        destinationId: number,
        approvals: number,
        direction: number,
    ]
  }
}

export interface FlowData {
  nodes: Node[];
  edges: Edge[];
}

export interface WorkflowApplication {
  name: string;
  abbreviation: string;
  team: string;
  teamEmail: string;
  applicationEmail: string;
}

///////////////////////////

// Representa os dados internos de cada nó
export type NodeData = {
  label: string;
  status: "pending" | "visited" | "current";
  email: string,
  abbreviation: string,
};

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
  type: string;
}

// Representa uma ligação entre dois nós
export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}


// Representa a unidade completa
export interface Unit {
  id: number;
  name: string;
  abbreviation?: string;
  email?: string;
}

// Representa um processo completo com seus nodes e edges
export interface ProcessFlow {
  id: string;
  createdAt: string;
  createdBy: string;
  status: number,
  application: Application;
  unit: Unit;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface Flow {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export type ProcessFlowList = ProcessFlow[];