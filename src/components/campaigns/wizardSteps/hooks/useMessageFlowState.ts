
import { useEffect } from 'react';
import { useFlowState } from '../../hooks/useFlowState';
import { useFlowValidation } from './useFlowValidation';
import { useNodeOperations } from '../../hooks/useNodeOperations';
import { toast } from '@/hooks/use-toast';
import { CampaignFormData } from '../../types/campaignTypes';

export const useMessageFlowState = (
  formData: CampaignFormData,
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>,
  onNext: () => void
) => {
  const initialNodes = [
    {
      id: '1',
      type: 'messageNode',
      position: { x: 250, y: 100 },
      data: {
        label: 'Initial Outreach',
        channel: 'email',
        message: 'Hi {{firstName}}, I noticed your work at {{company}} and thought we should connect...',
      },
    },
  ];

  const {
    nodes,
    edges,
    selectedNode,
    showNodeModal,
    nodeType,
    nodeData,
    setNodes,
    setEdges,
    setSelectedNode,
    setShowNodeModal,
    setNodeType,
    setNodeData,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick
  } = useFlowState({ 
    initialNodes: formData.messageFlow?.nodes?.length ? formData.messageFlow.nodes : initialNodes, 
    initialEdges: formData.messageFlow?.edges?.length ? formData.messageFlow.edges : [] 
  });

  const { validateFlow, validateMessageData } = useFlowValidation();

  const { addNode, updateNode, deleteNode } = useNodeOperations({
    nodes,
    edges,
    setNodes,
    setEdges,
    setShowNodeModal
  });

  useEffect(() => {
    if (nodes.length > 0) {
      console.log("Updating messageFlow in formData with nodes:", nodes);
      setFormData(prev => ({
        ...prev,
        messageFlow: {
          nodes,
          edges
        },
        flows: nodes.map(node => ({
          id: node.id,
          type: node.type,
          data: node.data
        }))
      }));
    }
  }, [nodes, edges, setFormData]);

  return {
    nodes,
    edges,
    selectedNode,
    showNodeModal,
    nodeType,
    nodeData,
    setNodes,
    setEdges,
    setSelectedNode,
    setShowNodeModal,
    setNodeType,
    setNodeData,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
    validateFlow,
    validateMessageData,
    addNode,
    updateNode,
    deleteNode
  };
};
