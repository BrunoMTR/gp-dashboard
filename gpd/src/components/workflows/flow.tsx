import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    MiniMap,
    type Node,
    type Edge,
    type NodeChange,
    type EdgeChange,
    Background,
    BackgroundVariant,
} from '@xyflow/react';
import { useState, useCallback } from 'react';
import '@xyflow/react/dist/style.css';
import { DepartmentNode } from './department-node';
import { getLayoutedElements } from './layout';


import { Button } from "@/components/ui/button"


const proOptions = { hideAttribution: true };


interface Data {
    nodes: Node[];
    edges: Edge[];
}

interface FlowProps {
    data: Data | null;
}
const nodeTypes = {
    department: DepartmentNode, // "department" será o tipo usado no node
};

export function Flow({ data }: FlowProps) {
    if (!data) {
        return null;
    }

    const [nodes, setNodes] = useState<Node[]>(data.nodes);
    const [edges, setEdges] = useState<Edge[]>(data.edges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) =>
            setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        []
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
            setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        []
    );

    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        []
    );

    const onLayout = useCallback(
        (direction: 'TB' | 'LR') => {
            const layouted = getLayoutedElements(nodes, edges, direction);
            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);
        },
        [nodes, edges]
    );

    return (
        <div className="flex-1 flex items-center justify-center border rounded-lg p-4 bg-muted/10">
            <div style={{ width: '75vw', height: '65vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    proOptions={proOptions}
                    nodeTypes={nodeTypes}
                >
                    <MiniMap />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

                    <div className="absolute top-2 right-2 z-10 flex flex-col space-y-2">
                        <Button variant="outline" onClick={() => onLayout('TB')}>
                            V
                        </Button>
                        <Button variant="outline" onClick={() => onLayout('LR')}>
                            H
                        </Button>
                    </div>

                </ReactFlow>
            </div>
        </div>
    );
}
