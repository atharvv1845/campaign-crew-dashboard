
import { useCallback } from 'react';
import { Node, Edge } from 'reactflow';
import { MessageStepData, DelayStepData, ConditionStepData } from '../../types/campaignTypes';
import { createNewNode, createEdgeBetweenNodes, findAppropriateSourceNode } from './nodeCreation';

interface UseAddNodeProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export function useAddNode({
  nodes,
  edges,
  setNodes,
  setEdges,
}: UseAddNodeProps) {
  const addNewNode = useCallback((type: 'message' | 'delay' | 'condition') => {
    return {
      type,
      setNodeData: (data: MessageStepData | DelayStepData | ConditionStepData) => {
        // Create the new node
        const newNode = createNewNode(nodes, type, data);
        console.log("Added new node:", newNode);
        
        // Add the new node to the nodes array
        setNodes(prevNodes => [...prevNodes, newNode]);

        // Create edge from last node to new node if there are existing nodes
        if (nodes.length > 0) {
          // Find the appropriate source node
          const sourceNodeId = findAppropriateSourceNode(nodes, edges);
          
          // Create and add the new edge
          const newEdge = createEdgeBetweenNodes(sourceNodeId, newNode.id);
          setEdges(prevEdges => [...prevEdges, newEdge]);
        }
      }
    };
  }, [nodes, edges, setNodes, setEdges]);

  return {
    addNode: (type: 'message' | 'delay' | 'condition') => {
      const { type: nodeType, setNodeData } = addNewNode(type);
      return { 
        nodeType,
        setNodeData 
      };
    }
  };
}
