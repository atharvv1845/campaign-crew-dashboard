
import React from 'react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
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
    
    try {
      // Create deep copies to avoid circular reference issues
      const nodesCopy = nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: { ...node.position },
        data: { ...node.data }
      }));
      
      const edgesCopy = edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: edge.animated,
        style: edge.style ? { ...edge.style } : undefined,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle
      }));
      
      // Explicitly update the formData with the latest nodes and edges
      setFormData(prev => ({
        ...prev,
        messageFlow: {
          nodes: nodesCopy,
          edges: edgesCopy
        },
        flows: nodesCopy.map(node => ({
          id: node.id,
          type: node.type,
          data: { ...node.data }
        }))
      }));
      
      console.log("Saving flow data to formData:", {
        nodes: nodesCopy.length,
        edges: edgesCopy.length
      });
      
      onNext();
    } catch (error) {
      console.error("Error saving flow:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your message flow. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { saveFlowToFormData };
};

export default FlowSaveValidation;
