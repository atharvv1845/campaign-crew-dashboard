
import React from 'react';
import { toast } from '@/hooks/use-toast';

interface FlowSaveValidationProps {
  nodes: any[];
  edges: any[];
  validateFlow: (nodes: any[], edges: any[]) => boolean;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
}

const FlowSaveValidation = ({
  nodes,
  edges,
  validateFlow,
  setFormData,
  onNext
}: FlowSaveValidationProps) => {
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
    
    if (!validateFlow(nodes, edges)) {
      return;
    }
    
    // Create deep copies to avoid circular reference issues
    const nodesCopy = nodes.map(node => ({
      ...node,
      data: { ...node.data }
    }));
    
    // Explicitly update the formData with the latest nodes and edges
    setFormData(prev => ({
      ...prev,
      messageFlow: {
        nodes: nodesCopy,
        edges: [...edges]
      },
      flows: nodesCopy.map(node => ({
        id: node.id,
        type: node.type,
        data: { ...node.data }
      }))
    }));
    
    console.log("Saving flow data to formData:", {
      nodes: nodes.length,
      edges: edges.length
    });
    
    onNext();
  };

  return { saveFlowToFormData };
};

export default FlowSaveValidation;
