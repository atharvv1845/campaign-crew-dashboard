
import { useCallback } from 'react';
import { Node, Edge } from 'reactflow';
import { MessageStepData, DelayStepData, ConditionStepData } from '../types/campaignTypes';

interface UseNodeOperationsProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setShowNodeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useNodeOperations({
  nodes,
  edges,
  setNodes,
  setEdges,
  setShowNodeModal,
}: UseNodeOperationsProps) {
  const addNewNode = useCallback((type: 'message' | 'delay' | 'condition') => {
    return {
      type,
      setNodeData: (data: MessageStepData | DelayStepData | ConditionStepData) => {
        const id = (nodes.length + 1).toString();
        let newNode: Node;

        if (type === 'message') {
          const messageData = data as MessageStepData;
          newNode = {
            id,
            type: 'messageNode',
            position: { x: 250, y: nodes.length * 150 + 100 },
            data: {
              label: `Message ${id}`,
              channel: 'email',
              message: messageData.message,
              assignedTo: messageData.assignedTo,
              templateId: messageData.templateId,
              subject: messageData.subject,
            },
          };
        } else if (type === 'delay') {
          const delayData = data as DelayStepData;
          newNode = {
            id,
            type: 'delayNode',
            position: { x: 250, y: nodes.length * 150 + 100 },
            data: {
              label: `Delay ${id}`,
              days: delayData.days,
              hours: delayData.hours,
            },
          };
        } else {
          const conditionData = data as ConditionStepData;
          newNode = {
            id,
            type: 'conditionNode',
            position: { x: 250, y: nodes.length * 150 + 100 },
            data: {
              label: `Condition ${id}`,
              condition: conditionData.condition,
              action: conditionData.action,
              targetStage: conditionData.targetStage,
              waitDays: conditionData.waitDays,
            },
          };
        }

        setNodes([...nodes, newNode]);

        if (nodes.length > 0) {
          const lastNodeId = nodes[nodes.length - 1].id;
          const newEdge: Edge = {
            id: `e${lastNodeId}-${id}`,
            source: lastNodeId,
            target: id,
            animated: true,
          };
          setEdges([...edges, newEdge]);
        }
      }
    };
  }, [nodes, edges, setNodes, setEdges]);

  const updateNode = useCallback((nodeId: string, nodeType: 'message' | 'delay' | 'condition', data: MessageStepData | DelayStepData | ConditionStepData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          if (nodeType === 'message' && node.type === 'messageNode') {
            const messageData = data as MessageStepData;
            return {
              ...node,
              data: {
                ...node.data,
                message: messageData.message,
                assignedTo: messageData.assignedTo,
                templateId: messageData.templateId,
                subject: messageData.subject,
              },
            };
          } else if (nodeType === 'delay' && node.type === 'delayNode') {
            const delayData = data as DelayStepData;
            return {
              ...node,
              data: {
                ...node.data,
                days: delayData.days,
                hours: delayData.hours,
              },
            };
          } else if (nodeType === 'condition' && node.type === 'conditionNode') {
            const conditionData = data as ConditionStepData;
            return {
              ...node,
              data: {
                ...node.data,
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
  }, [setNodes]);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
    setShowNodeModal(false);
  }, [setNodes, setEdges, setShowNodeModal]);

  return {
    addNode: (type: 'message' | 'delay' | 'condition') => {
      const { type: nodeType, setNodeData } = addNewNode(type);
      return { 
        nodeType,
        setNodeData 
      };
    },
    updateNode,
    deleteNode,
  };
}
