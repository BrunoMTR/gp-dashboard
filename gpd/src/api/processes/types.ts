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

// Representa a aplicação completa
export interface Application {
  id: number;
  name: string;
  abbreviation?: string;
  team?: string;
  teamEmail?: string;
  applicationEmail?: string;
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

export interface ProcessesApiResponse {
  success: boolean;
  message: string;
  data: ProcessFlow[];
  totalCount: number;
}



export interface ProcessFlow2 {
  id: number;
  createdAt: string;
  createdBy: string;
  status: number;
  application: {
    id: number;
    name: string;
    abbreviation: string;
    team: string;
    teamEmail: string;
    applicationEmail: string;
  };
  unit: {
    id: number;
    abbreviation: string;
    name: string;
    email: string;
  };
  nodes: {
    id: string;
    position: {
      x: number;
      y: number;
    };
    data: {
      label: string;
      status: "current" | "visited" | "pending";
    };
    type: string;
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
    label: string;
  }[];
}



export interface Flow {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export type ProcessFlowList = ProcessFlow[];
