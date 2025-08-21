import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Background,
    BackgroundVariant,
    type Node,
    type Edge,
    type NodeChange,
    type EdgeChange,
} from '@xyflow/react';
import { useState, useCallback } from 'react';
import '@xyflow/react/dist/style.css';
import { WorkflowConfiguration, type NodeItem } from './WorkflowConfiguration';

export function FlowPreview() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
    }, []);

    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));
    }, []);

    const onConnect = useCallback((connection: any) => {
        setEdges((eds) => addEdge(connection, eds));
    }, []);

    const proOptions = { hideAttribution: true };

    const handleFlowConfigChange = useCallback((nodesList: NodeItem[]) => {
        const reactFlowNodes: Node[] = nodesList.map((item, index) => ({
            id: item.id.toString(),
            data: { label: item.holder },
            position: { x: 50, y: index * 80 },
        }));

        const reactFlowEdges: Edge[] = nodesList.slice(1).map((item, index) => ({
            id: `edge-${nodesList[index].id}-${item.id}`,
            source: nodesList[index].id.toString(),
            target: item.id.toString(),
            label: nodesList[index].parecer.toString(),
        }));


        if (nodesList.length > 1) {
            const first = nodesList[0];
            const last = nodesList[nodesList.length - 1];
            reactFlowEdges.push({
                id: `edge-${last.id}-${first.id}`,
                source: last.id.toString(),
                target: first.id.toString(),
                label: last.parecer.toString(),
            });
        }



        setNodes(reactFlowNodes);
        setEdges(reactFlowEdges);
    }, []);

    return (
        <div className="flex-1 flex items-center justify-center border rounded-lg p-4 bg-muted/10">
            <div style={{ width: '75vw', height: '70vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    proOptions={proOptions}
                >
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                    <WorkflowConfiguration onChangeNodes={handleFlowConfigChange} />
                </ReactFlow>
            </div>
        </div>
    );
}
