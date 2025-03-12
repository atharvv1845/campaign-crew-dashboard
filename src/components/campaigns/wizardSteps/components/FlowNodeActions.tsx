
import React from 'react';
import { toast } from '@/hooks/use-toast';

interface FlowNodeActionsProps {
  nodeType: 'message' | 'delay' | 'condition';
  nodeData: any;
  setNodeData: (data: any) => void;
  selectedNode: string | null;
  validateMessageData: (type: string, data: any) => boolean;
  updateNode: (nodeId: string, type: string, data: any) => void;
  addNode: (type: string) => { setNodeData: (data: any) => void };
  setShowNodeModal: (show: boolean) => void;
  deleteNode: (nodeId: string) => void;
  setNodeType: React.Dispatch<React.SetStateAction<'message' | 'delay' | 'condition'>>;
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
    
    // Initialize appropriate data structure based on node type
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
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (selectedNode) {
        // Update existing node
        updateNode(selectedNode, nodeType, {...nodeData});
        toast({
          title: "Success",
          description: "Node updated successfully"
        });
      } else {
        // Add new node
        const nodeHandler = addNode(nodeType);
        nodeHandler.setNodeData({...nodeData});
        toast({
          title: "Success",
          description: "New node added to flow"
        });
      }
      setShowNodeModal(false);
    } catch (error) {
      console.error('Error saving node:', error);
      toast({
        title: "Error",
        description: "Failed to save node changes",
        variant: "destructive"
      });
    }
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      deleteNode(selectedNode);
      setShowNodeModal(false);
      toast({
        title: "Success",
        description: "Node deleted successfully"
      });
    }
  };

  return { handleAddNode, handleSaveNode, handleDeleteNode };
};

export default FlowNodeActions;
