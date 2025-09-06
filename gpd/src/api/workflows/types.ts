import type { Node, Edge } from '@xyflow/react'



export interface Workflow {
  application: {
    name: string;
    abbreviation: string;
    team: string;
    teamEmail: string;
    applicationEmail: string;
  };
  graph: {
    nodes: {
      originId: number;
      destinationId: number;
      approvals: number;
      direction: string; // "AVANÇO" ou "RECUO"
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

export interface Flow {
  applicationId: number;
  nodes: {
    originId: number;
    destinationId: number;
    approvals: number;
  }[];
}

export interface node{
  id: number;
  approvals: number;
}

export interface WorkflowApplication {
  name: string;
  abbreviation: string;
  team: string;
  teamEmail: string;
  applicationEmail: string;
}