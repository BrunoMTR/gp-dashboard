import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    type Node,
    type Edge,
    type NodeChange,
    type EdgeChange,
    Background,
    BackgroundVariant,
} from '@xyflow/react';
import { useState, useCallback } from 'react';
import '@xyflow/react/dist/style.css';
import type { NodeItem } from './types';
import React from 'react';

const proOptions = { hideAttribution: true };

interface Data {
    nodes: Node[];
    edges: Edge[];
}

interface FlowProps {
    data: Data | null;
    onNodesChange?: (nodesList: NodeItem[]) => void;
}

export function Flow({ data, onNodesChange }: FlowProps) {
    const [nodes, setNodes] = useState<Node[]>(data?.nodes || []);
    const [edges, setEdges] = useState<Edge[]>(data?.edges || []);

    const onNodesChangeHandler = useCallback(
        (changes: NodeChange[]) => {
            setNodes((nds) => applyNodeChanges(changes, nds));
        },
        []
    );

    const onEdgesChangeHandler = useCallback(
        (changes: EdgeChange[]) => {
            setEdges((eds) => applyEdgeChanges(changes, eds));
        },
        []
    );

    // Sempre que data mudar, atualiza nodes e edges
    React.useEffect(() => {
        if (data) {
            setNodes(data.nodes);
            setEdges(data.edges);
        }
    }, [data]);

    // Exemplo de função para atualizar nodes via configuração
    const handleFlowConfigChange = useCallback(
        (nodesList: NodeItem[]) => {
            const reactFlowNodes: Node[] = nodesList.map((item, index) => ({
                id: item.key.toString(),
                type: "department",
                data: { label: item.holder },
                position: { x: 50, y: index * 80 },
            }));

            const reactFlowEdges: Edge[] = nodesList.slice(1).map((item, index) => ({
                id: `edge-${nodesList[index].key}-${item.key}`,
                source: nodesList[index].key.toString(),
                target: item.key.toString(),
                label: nodesList[index].parecer.toString(),
            }));

            setNodes(reactFlowNodes);
            setEdges(reactFlowEdges);

            if (onNodesChange) onNodesChange(nodesList);
        },
        [onNodesChange]
    );

    return (
        <div className="flex-1 flex items-center justify-center border rounded-lg p-4 bg-muted/10">
            <div style={{ width: '75vw', height: '72vh' }}>
                <ReactFlow
                    nodes={nodes.map((node) => ({
                        ...node,
                        style: {
                            backgroundColor: "#26adbeff",
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
                    onNodesChange={onNodesChangeHandler}
                    onEdgesChange={onEdgesChangeHandler}
                    nodesDraggable={true}
                    proOptions={proOptions}
                    fitView
                >
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                </ReactFlow>
            </div>
        </div>
    );
}
