// layout.ts
import Dagre from 'dagre';
import type { Node, Edge } from '@xyflow/react';

const nodeWidth = 172;
const nodeHeight = 36;

/**
 * Função para organizar nodes e edges automaticamente
 * @param nodes Array de nodes do React Flow
 * @param edges Array de edges do React Flow
 * @param direction 'TB' = vertical | 'LR' = horizontal
 */
export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: 'TB' | 'LR' = 'LR'
) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      width: node.width ?? nodeWidth,
      height: node.height ?? nodeHeight,
    })
  );

  Dagre.layout(g);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = g.node(node.id);
    const x = nodeWithPosition.x - (node.width ?? nodeWidth) / 2;
    const y = nodeWithPosition.y - (node.height ?? nodeHeight) / 2;

    return { ...node, position: { x, y } };
  });

  return { nodes: layoutedNodes, edges };
};
