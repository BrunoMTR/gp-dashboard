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
import { WorkflowConfiguration } from './WorkflowConfiguration';
import type { NodeItem } from '../workflows/types'



export function FlowPreview({ NodesChange }: { NodesChange?: (nodesList: NodeItem[]) => void }) {


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


        if (nodesList.length > 1) {
            const first = nodesList[0];
            const last = nodesList[nodesList.length - 1];
            reactFlowEdges.push({
                id: `edge-${last.key}-${first.key}`,
                source: last.key.toString(),
                target: first.key.toString(),
                label: last.parecer.toString(),
            });
        }



        setNodes(reactFlowNodes);
        setEdges(reactFlowEdges);

        if (NodesChange) NodesChange(nodesList);
    }, [onNodesChange]);


    return (

        <div className="flex-1 flex border rounded-lg p-2 h-full w-full">

            <div className="w-7/10 h-full border-r  ">
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
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodesDraggable={true}
                    proOptions={proOptions}
                    fitView
                >
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

                </ReactFlow>
            </div>

            <div className="w-3/10 h-full pl-2 ">
                <WorkflowConfiguration onChangeNodes={handleFlowConfigChange} />
            </div>
        </div>

    );
}
