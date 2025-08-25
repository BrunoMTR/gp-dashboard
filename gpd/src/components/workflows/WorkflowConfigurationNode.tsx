// WorkflowConfigurationNode.tsx
import { Handle, Position } from '@xyflow/react';
import { WorkflowConfiguration } from './WorkflowConfiguration';

export function WorkflowConfigurationNode({ data }: any) {
  return (
    <div className="w-[320px] bg-white shadow-lg rounded p-2">
      {/* Handle de entrada */}
      <Handle type="target" position={Position.Top} />
      
      <WorkflowConfiguration onChangeNodes={data.onChangeNodes} />
      
      {/* Handle de saída */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
