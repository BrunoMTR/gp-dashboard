
import type { Node, Edge } from '@xyflow/react'
export interface Workflow {
  id: number;
  name: string;
  abbreviation: string;
  team: string;
  teamEmail: string;
  applicationEmail: string;
}

export interface WorkflowInput {
  name: string;
  abbreviation: string;
  team: string;
  teamEmail: string;
  applicationEmail: string;
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
