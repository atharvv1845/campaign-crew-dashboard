
import { useToast } from '@/hooks/use-toast';
import { MessageStepData, DelayStepData, ConditionStepData } from '../../types/campaignTypes';

export const useFlowValidation = () => {
  const { toast } = useToast();

  // Validate the entire flow structure
  const validateFlow = (nodes: any[], edges: any[]) => {
    // Make sure we have at least one node
    if (nodes.length === 0) {
      toast({
        title: "Warning",
        description: "Please add at least one message to the flow before proceeding.",
        variant: "destructive"
      });
      return false;
    }

    // Check for dangling nodes (nodes with no incoming or outgoing connections)
    // First node is an exception, it only needs outgoing connections
    const firstNodeId = nodes[0].id;
    
    // Check that all non-first nodes have at least one incoming connection
    const connectedTargets = new Set(edges.map(edge => edge.target));
    const danglingNodes = nodes
      .filter(node => node.id !== firstNodeId && !connectedTargets.has(node.id));
    
    if (danglingNodes.length > 0) {
      const nodeNames = danglingNodes.map(node => node.data.label || `Node ${node.id}`).join(', ');
      toast({
        title: "Warning",
        description: `Some nodes are not connected to the flow: ${nodeNames}. Please connect all nodes.`,
        variant: "destructive"
      });
      return false;
    }

    // Check that message nodes have required content
    for (const node of nodes) {
      if (node.type === 'messageNode' && (!node.data.message || node.data.message.trim() === '')) {
        toast({
          title: "Warning",
          description: `Message node "${node.data.label}" has no content. Please add a message.`,
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  // Validate message node data
  const validateMessageData = (type: string, data: MessageStepData | DelayStepData | ConditionStepData) => {
    if (type === 'message') {
      const messageData = data as MessageStepData;
      if (!messageData.message || messageData.message.trim() === '') {
        toast({
          title: "Warning",
          description: "Please enter a message before saving.",
          variant: "destructive"
        });
        return false;
      }
      return true;
    } else if (type === 'delay') {
      const delayData = data as DelayStepData;
      if ((!delayData.days && !delayData.hours) || (delayData.days === 0 && delayData.hours === 0)) {
        toast({
          title: "Warning",
          description: "Please specify a delay period before saving.",
          variant: "destructive"
        });
        return false;
      }
      return true;
    } else if (type === 'condition') {
      const conditionData = data as ConditionStepData;
      if (!conditionData.condition) {
        toast({
          title: "Warning",
          description: "Please specify a condition before saving.",
          variant: "destructive"
        });
        return false;
      }
      return true;
    }
    return true;
  };

  return { validateFlow, validateMessageData };
};
