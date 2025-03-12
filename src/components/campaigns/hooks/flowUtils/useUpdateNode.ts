
import { useCallback } from 'react';
import { Node } from 'reactflow';
import { MessageStepData, DelayStepData, ConditionStepData } from '../../types/campaignTypes';

interface UseUpdateNodeProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export function useUpdateNode({ setNodes }: UseUpdateNodeProps) {
  const updateNode = useCallback((nodeId: string, nodeType: 'message' | 'delay' | 'condition', data: MessageStepData | DelayStepData | ConditionStepData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          if (nodeType === 'message' && node.type === 'messageNode') {
            const messageData = data as MessageStepData;
            const nodeLabel = messageData.label || node.data.label;
            return {
              ...node,
              data: {
                ...node.data,
                label: nodeLabel,
                message: messageData.message,
                channel: messageData.channel || node.data.channel,
                assignedTo: messageData.assignedTo,
                templateId: messageData.templateId,
                subject: messageData.subject,
              },
            };
          } else if (nodeType === 'delay' && node.type === 'delayNode') {
            const delayData = data as DelayStepData;
            const nodeLabel = delayData.label || node.data.label;
            return {
              ...node,
              data: {
                ...node.data,
                label: nodeLabel,
                days: delayData.days,
                hours: delayData.hours,
              },
            };
          } else if (nodeType === 'condition' && node.type === 'conditionNode') {
            const conditionData = data as ConditionStepData;
            const nodeLabel = conditionData.label || node.data.label;
            return {
              ...node,
              data: {
                ...node.data,
                label: nodeLabel,
                condition: conditionData.condition,
                action: conditionData.action,
                targetStage: conditionData.targetStage,
                waitDays: conditionData.waitDays,
              },
            };
          }
        }
        return node;
      })
    );
    
    console.log("Updated node:", nodeId);
  }, [setNodes]);

  return { updateNode };
}
