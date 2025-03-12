
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
          const nodeLabel = messageData.label || `Message ${id}`;
          newNode = {
            id,
            type: 'messageNode',
            position: { x: 250, y: nodes.length * 150 + 100 },
            data: {
              label: nodeLabel,
              channel: messageData.channel || 'email',
              message: messageData.message,
              assignedTo: messageData.assignedTo,
              templateId: messageData.templateId,
              subject: messageData.subject,
            },
          };
        } else if (type === 'delay') {
          const delayData = data as DelayStepData;
          const nodeLabel = delayData.label || `Delay ${id}`;
          newNode = {
            id,
            type: 'delayNode',
            position: { x: 250, y: nodes.length * 150 + 100 },
            data: {
              label: nodeLabel,
              days: delayData.days,
              hours: delayData.hours,
            },
          };
        } else {
          const conditionData = data as ConditionStepData;
          const nodeLabel = conditionData.label || `Condition ${id}`;
          newNode = {
            id,
            type: 'conditionNode',
            position: { x: 250, y: nodes.length * 150 + 100 },
            data: {
              label: nodeLabel,
              condition: conditionData.condition,
              action: conditionData.action,
              targetStage: conditionData.targetStage,
              waitDays: conditionData.waitDays,
            },
          };
        }

        setNodes((prevNodes) => [...prevNodes, newNode]);

        // If there are existing nodes, create an edge from the last node to the new node
        if (nodes.length > 0) {
          const lastNodeId = nodes[nodes.length - 1].id;
          const newEdge: Edge = {
            id: `e${lastNodeId}-${id}`,
            source: lastNodeId,
            target: id,
            animated: true,
          };
          setEdges((prevEdges) => [...prevEdges, newEdge]);
        }
        
        console.log("Added new node:", newNode);
        console.log("Current nodes:", [...nodes, newNode]);
      }
    };
  }, [nodes, edges, setNodes, setEdges]);

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

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    
    // Remove any edges connected to this node
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
    
    // Create new edges to connect the nodes before and after the deleted node
    const sourceEdges = edges.filter(edge => edge.target === nodeId);
    const targetEdges = edges.filter(edge => edge.source === nodeId);
    
    if (sourceEdges.length > 0 && targetEdges.length > 0) {
      const sourceNode = sourceEdges[0].source;
      const targetNode = targetEdges[0].target;
      
      const newEdge: Edge = {
        id: `e${sourceNode}-${targetNode}`,
        source: sourceNode,
        target: targetNode,
        animated: true,
      };
      
      // Add this new edge only if it doesn't already exist
      setEdges(eds => {
        const edgeExists = eds.some(e => e.source === sourceNode && e.target === targetNode);
        if (!edgeExists) {
          return [...eds.filter(e => e.source !== nodeId && e.target !== nodeId), newEdge];
        }
        return eds.filter(e => e.source !== nodeId && e.target !== nodeId);
      });
    }
    
    setShowNodeModal(false);
    console.log("Deleted node:", nodeId);
  }, [edges, setEdges, setNodes, setShowNodeModal]);

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
