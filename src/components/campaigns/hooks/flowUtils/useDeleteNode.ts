
import { useCallback } from 'react';
import { Node, Edge } from 'reactflow';
import { createEdgeBetweenNodes } from './nodeCreation';

interface UseDeleteNodeProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setShowNodeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useDeleteNode({
  nodes,
  edges,
  setNodes,
  setEdges,
  setShowNodeModal,
}: UseDeleteNodeProps) {
  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    
    // Get incoming and outgoing edges for the deleted node
    const incomingEdges = edges.filter(edge => edge.target === nodeId);
    const outgoingEdges = edges.filter(edge => edge.source === nodeId);
    
    // For each incoming edge, try to connect its source to each target of outgoing edges
    if (incomingEdges.length > 0 && outgoingEdges.length > 0) {
      const newEdges: Edge[] = [];
      
      incomingEdges.forEach(inEdge => {
        outgoingEdges.forEach(outEdge => {
          // Preserve the sourceHandle from the incoming edge if it exists
          const newEdge = createEdgeBetweenNodes(
            inEdge.source, 
            outEdge.target,
            inEdge.sourceHandle,
            outEdge.targetHandle
          );
          newEdges.push(newEdge);
        });
      });
      
      // Remove any edges connected to this node and add the new connecting edges
      setEdges(eds => {
        const filteredEdges = eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId);
        
        // Check for duplicate edges before adding new ones
        const uniqueNewEdges = newEdges.filter(newEdge => 
          !filteredEdges.some(e => 
            e.source === newEdge.source && 
            e.target === newEdge.target && 
            e.sourceHandle === newEdge.sourceHandle
          )
        );
        
        return [...filteredEdges, ...uniqueNewEdges];
      });
    } else {
      // Just remove edges connected to this node
      setEdges(eds => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    }
    
    setShowNodeModal(false);
    console.log("Deleted node:", nodeId);
  }, [edges, setEdges, setNodes, setShowNodeModal]);

  return { deleteNode };
}
