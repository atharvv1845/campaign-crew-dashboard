
import React from 'react';
import { toast } from '@/hooks/use-toast';

interface FlowNodeActionsProps {
  nodeType: string;
  nodeData: any;
  setNodeData: (data: any) => void;
  selectedNode: string | null;
  validateMessageData: (type: string, data: any) => boolean;
  updateNode: (nodeId: string, type: string, data: any) => void;
  addNode: (type: string) => { setNodeData: (data: any) => void };
  setShowNodeModal: (show: boolean) => void;
  deleteNode: (nodeId: string) => void;
  setNodeType: (type: string) => void;
  setSelectedNode: (node: string | null) => void;
}

const FlowNodeActions = ({
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
}: FlowNodeActionsProps) => {
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

  return { handleAddNode, handleSaveNode, handleDeleteNode };
};

export default FlowNodeActions;
