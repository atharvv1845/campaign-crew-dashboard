
import React, { useState } from 'react';
import FlowCanvas from './components/FlowCanvas';
import FlowNodeEditor from './FlowNodeEditor';
import { useMessageFlowState } from './hooks/useMessageFlowState';
import FlowNodeActions from './components/FlowNodeActions';
import FlowNavigation from './components/FlowNavigation';
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
  onBack,
}) => {
  const {
    nodes,
    edges,
    selectedNode,
    showNodeModal,
    nodeType,
    nodeData,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
    validateFlow,
    validateMessageData,
    addNode,
    updateNode,
    deleteNode,
    setShowNodeModal,
    setNodeType,
    setNodeData,
    setSelectedNode
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
    deleteNode,
    setNodeType,
    setSelectedNode
  });

  const { saveFlowToFormData } = FlowSaveValidation({
    nodes,
    edges,
    validateFlow,
    setFormData,
    onNext
  });
  
  const handleAddNodeType = (type: 'message' | 'delay' | 'condition') => {
    handleAddNode(type);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Message Flow</h2>
      <p className="text-muted-foreground">
        Design your campaign message sequence by adding messages, delays, and conditions.
      </p>

      <div className="h-[500px] flex flex-col">
        <FlowCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          onAddNodeType={handleAddNodeType}
        />
      </div>

      {/* Node editor dialog */}
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

      {/* Navigation buttons */}
      <FlowNavigation
        onBack={onBack}
        onNext={saveFlowToFormData}
        nextLabel="Save & Continue"
      />
    </div>
  );
};

export default MessageFlow;
