
import { Node, Edge } from 'reactflow';
import { MessageStepData, DelayStepData, ConditionStepData } from '../types/campaignTypes';
import { useAddNode } from './flowUtils/useAddNode';
import { useUpdateNode } from './flowUtils/useUpdateNode';
import { useDeleteNode } from './flowUtils/useDeleteNode';

interface UseNodeOperationsProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setShowNodeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useNodeOperations({
  nodes,
  edges,
  setNodes,
  setEdges,
  setShowNodeModal,
}: UseNodeOperationsProps) {
  // Reuse our new hooks for each operation
  const { addNode } = useAddNode({ nodes, edges, setNodes, setEdges });
  const { updateNode } = useUpdateNode({ setNodes });
  const { deleteNode } = useDeleteNode({ 
    nodes, 
    edges, 
    setNodes, 
    setEdges, 
    setShowNodeModal 
  });

  return {
    addNode,
    updateNode,
    deleteNode,
  };
}
