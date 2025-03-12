
import React, { useEffect } from 'react';
import { CampaignFormData } from '../types/campaignTypes';
import { useFlowState } from '../hooks/useFlowState';
import { useNodeOperations } from '../hooks/useNodeOperations';
import { useFlowValidation } from './hooks/useFlowValidation';
import FlowControlsToolbar from './FlowControlsToolbar';
import FlowNodeEditor from './FlowNodeEditor';
import FlowCanvas from './components/FlowCanvas';
import FlowNavigation from './components/FlowNavigation';
import { toast } from '@/hooks/use-toast';

interface MessageFlowProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

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

const initialEdges = [];

const MessageFlow: React.FC<MessageFlowProps> = ({ formData, setFormData, onNext, onBack }) => {
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
    initialEdges: formData.messageFlow?.edges?.length ? formData.messageFlow.edges : initialEdges 
  });

  const { validateFlow, validateMessageData } = useFlowValidation();

  // Update parent formData whenever nodes or edges change
  useEffect(() => {
    if (nodes.length > 0) {
      console.log("Updating messageFlow in formData with nodes:", nodes);
      // Update messageFlow in formData
      setFormData(prev => ({
        ...prev,
        messageFlow: {
          nodes,
          edges
        }
      }));

      // Also update flows for compatibility with older code
      setFormData(prev => ({
        ...prev,
        flows: nodes.map(node => ({
          id: node.id,
          type: node.type,
          data: node.data
        }))
      }));
    }
  }, [nodes, edges, setFormData]);

  const { addNode, updateNode, deleteNode } = useNodeOperations({
    nodes,
    edges,
    setNodes,
    setEdges,
    setShowNodeModal
  });

  const handleAddNode = (type: 'message' | 'delay' | 'condition') => {
    setNodeType(type);
    setSelectedNode(null);
    
    if (type === 'message') {
      setNodeData({
        message: '',
        assignedTo: '',
        templateId: '',
        subject: '',
        channel: 'email',
        label: `New Message`,
      });
    } else if (type === 'delay') {
      setNodeData({
        days: 1,
        hours: 0,
        label: 'Wait Period',
      });
    } else {
      setNodeData({
        condition: '',
        action: '',
        targetStage: '',
        waitDays: 0,
        label: 'Condition',
      });
    }
    
    setShowNodeModal(true);
  };

  const handleSaveNode = () => {
    if (!validateMessageData(nodeType, nodeData)) {
      return;
    }
    
    if (selectedNode) {
      updateNode(selectedNode, nodeType, nodeData);
    } else {
      const { setNodeData: setNewNodeData } = addNode(nodeType);
      setNewNodeData(nodeData);
    }
    setShowNodeModal(false);
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      deleteNode(selectedNode);
    }
  };

  const saveFlowToFormData = () => {
    // Make sure we have at least one node
    if (nodes.length === 0) {
      toast({
        title: "Warning",
        description: "Please add at least one message to the flow before proceeding.",
        variant: "destructive"
      });
      return;
    }
    
    validateFlow(nodes, edges);
    
    // Explicitly update the formData with the latest nodes and edges
    setFormData(prev => ({
      ...prev,
      messageFlow: {
        nodes: [...nodes],
        edges: [...edges]
      },
      flows: nodes.map(node => ({
        id: node.id,
        type: node.type,
        data: node.data
      }))
    }));
    
    console.log("Saving flow data to formData:", {
      nodes: nodes.length,
      edges: edges.length
    });
    
    onNext();
  };

  return (
    <div className="h-full flex flex-col">
      <FlowControlsToolbar onAddNode={handleAddNode} />

      <FlowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
      />

      <FlowNodeEditor
        open={showNodeModal}
        onOpenChange={setShowNodeModal}
        nodeType={nodeType}
        nodeData={nodeData}
        setNodeData={setNodeData}
        selectedNode={selectedNode}
        onSave={handleSaveNode}
        onDelete={handleDeleteNode}
      />

      <FlowNavigation onNext={saveFlowToFormData} onBack={onBack} />
    </div>
  );
};

export default MessageFlow;
