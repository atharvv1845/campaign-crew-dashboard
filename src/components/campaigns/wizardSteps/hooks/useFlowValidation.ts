
import { toast } from '@/hooks/use-toast';
import { Node, Edge } from 'reactflow';
import { MessageStepData } from '../../types/campaignTypes';

export const useFlowValidation = () => {
  const validateFlow = (nodes: Node[], edges: Edge[]) => {
    if (nodes.length === 0) {
      toast({
        title: "Warning",
        description: "Your message flow is empty. Consider adding at least one message step.",
      });
      return false;
    }
    
    // Validate required fields for message nodes
    const invalidNodes = nodes.filter(node => {
      if (node.type === 'messageNode') {
        const messageData = node.data as any;
        return !messageData.message;
      }
      return false;
    });
    
    if (invalidNodes.length > 0) {
      toast({
        title: "Validation Error",
        description: `${invalidNodes.length} message node(s) are missing content`,
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const validateMessageData = (nodeType: string, nodeData: any) => {
    if (nodeType === 'message') {
      const messageData = nodeData as MessageStepData;
      if (!messageData.message) {
        toast({
          title: "Validation Error",
          description: "Message content is required",
          variant: "destructive"
        });
        return false;
      }
    }
    return true;
  };

  return {
    validateFlow,
    validateMessageData
  };
};
