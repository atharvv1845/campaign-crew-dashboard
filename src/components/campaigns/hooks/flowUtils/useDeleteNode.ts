
import { useCallback } from 'react';
import { Node, Edge, MarkerType } from 'reactflow';
import { createEdgeBetweenNodes } from './nodeCreation';

interface UseDeleteNodeProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setShowNodeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useDeleteNode({
  edges,
  setNodes,
  setEdges,
  setShowNodeModal,
}: UseDeleteNodeProps) {
  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    
    // Remove any edges connected to this node
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
    
    // Create new edges to connect the nodes before and after the deleted node
    const sourceEdges = edges.filter(edge => edge.target === nodeId);
    const targetEdges = edges.filter(edge => edge.source === nodeId);
    
    if (sourceEdges.length > 0 && targetEdges.length > 0) {
      const sourceNode = sourceEdges[0].source;
      const targetNode = targetEdges[0].target;
      
      // Add this new edge only if it doesn't already exist
      setEdges(eds => {
        const edgeExists = eds.some(e => e.source === sourceNode && e.target === targetNode);
        if (!edgeExists) {
          const newEdge = createEdgeBetweenNodes(sourceNode, targetNode);
          return [...eds.filter(e => e.source !== nodeId && e.target !== nodeId), newEdge];
        }
        return eds.filter(e => e.source !== nodeId && e.target !== nodeId);
      });
    }
    
    setShowNodeModal(false);
    console.log("Deleted node:", nodeId);
  }, [edges, setEdges, setNodes, setShowNodeModal]);

  return { deleteNode };
}
