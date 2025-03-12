
import React from 'react';
import { useMessageFlowState } from './hooks/useMessageFlowState';
import FlowControlsToolbar from './FlowControlsToolbar';
import FlowNodeEditor from './FlowNodeEditor';
import FlowCanvas from './components/FlowCanvas';
import FlowNavigation from './components/FlowNavigation';
import FlowNodeActions from './components/FlowNodeActions';
import FlowSaveValidation from './components/FlowSaveValidation';
import { CampaignFormData } from '../types/campaignTypes';

interface MessageFlowProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

const MessageFlow: React.FC<MessageFlowProps> = ({
  formData,
  setFormData,
  onNext,
  onBack
}) => {
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
    handleNodeClick,
    validateFlow,
    validateMessageData,
    addNode,
    updateNode,
    deleteNode
  } = useMessageFlowState(formData, setFormData, onNext);

  const { handleAddNode, handleSaveNode, handleDeleteNode } = FlowNodeActions({
    nodeType,
    nodeData,
    setNodeData,
    selectedNode,
    validateMessageData,
    updateNode,
    addNode,
    setShowNodeModal,
    deleteNode
  });

  const { saveFlowToFormData } = FlowSaveValidation({
    nodes,
    edges,
    validateFlow,
    setFormData,
    onNext
  });

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
