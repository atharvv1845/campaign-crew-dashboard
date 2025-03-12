
import React, { useState } from 'react';
import ReactFlow, { Background, Controls, NodeTypes } from 'reactflow';
import 'reactflow/dist/style.css';
import { MessageSquare, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignFormData } from '../types/campaignTypes';
import MessageNode from './flowNodes/MessageNode';
import DelayNode from './flowNodes/DelayNode';
import ConditionNode from './flowNodes/ConditionNode';
import FlowNodeEditor from './FlowNodeEditor';
import { useFlowState } from '../hooks/useFlowState';
import { useNodeOperations } from '../hooks/useNodeOperations';

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

const nodeTypes: NodeTypes = {
  messageNode: MessageNode,
  delayNode: DelayNode,
  conditionNode: ConditionNode,
};

const MessageFlow: React.FC<MessageFlowProps> = ({ formData, setFormData, onNext, onBack }) => {
  const {
    nodes,
    edges,
    selectedNode,
    showNodeModal,
    nodeType,
    nodeData,
    setShowNodeModal,
    setNodeType,
    setNodeData,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick
  } = useFlowState({ initialNodes, initialEdges });

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
      });
    } else if (type === 'delay') {
      setNodeData({
        days: 1,
        hours: 0,
      });
    } else {
      setNodeData({
        condition: '',
        action: '',
        targetStage: '',
        waitDays: 0,
      });
    }
    
    setShowNodeModal(true);
  };

  const handleSaveNode = () => {
    if (selectedNode) {
      updateNode(selectedNode, nodeType, nodeData);
    } else {
      const { setNodeData } = addNode(nodeType);
      setNodeData(nodeData);
    }
    setShowNodeModal(false);
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      deleteNode(selectedNode);
    }
  };

  // Update formData when flow changes
  const saveFlowToFormData = () => {
    setFormData({
      ...formData,
      messageFlow: {
        nodes,
        edges
      }
    });
    onNext();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Message Sequence Flow</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAddNode('message')}>
            <MessageSquare className="h-4 w-4 mr-1" /> Add Message
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAddNode('delay')}>
            <Clock className="h-4 w-4 mr-1" /> Add Delay
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleAddNode('condition')}>
            <AlertTriangle className="h-4 w-4 mr-1" /> Add Condition
          </Button>
        </div>
      </div>

      <div className="border rounded-md flex-1 min-h-[400px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

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

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={saveFlowToFormData}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default MessageFlow;
