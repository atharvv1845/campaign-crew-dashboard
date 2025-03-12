
import { useCallback } from 'react';
import { Node, Edge, Position, MarkerType } from 'reactflow';
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
        const newNodeId = (nodes.length + 1).toString();
        
        // Calculate position based on existing nodes
        let position = { 
          x: 250, 
          y: nodes.length > 0 
            ? Math.max(...nodes.map(n => n.position.y)) + 150 
            : 100 
        };

        // Create the new node with provided data and appropriate type
        let newNode: Node = {
          id: newNodeId,
          type: `${type}Node`,
          position,
          data: {
            ...data,
            label: data.label || `${type.charAt(0).toUpperCase() + type.slice(1)} ${newNodeId}`
          },
          // Add source and target handles to allow connecting from multiple points
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        };

        console.log("Added new node:", newNode);
        
        // Add the new node to the nodes array
        setNodes(prevNodes => [...prevNodes, newNode]);

        // Create edge from last node to new node if there are existing nodes
        if (nodes.length > 0) {
          // Find the appropriate source node (usually the last node without outgoing edges)
          let sourceNodeId = nodes[nodes.length - 1].id;
          
          // Check if the source node already has outgoing edges
          const hasOutgoingEdge = edges.some(edge => edge.source === sourceNodeId);
          
          // If it has outgoing edges, find the last node in the chain
          if (hasOutgoingEdge) {
            const lastTargetNodes = edges
              .filter(edge => !edges.some(e => e.source === edge.target))
              .map(edge => edge.target);
              
            if (lastTargetNodes.length > 0) {
              sourceNodeId = lastTargetNodes[0];
            }
          }
          
          const newEdge: Edge = {
            id: `e${sourceNodeId}-${newNodeId}`,
            source: sourceNodeId,
            target: newNodeId,
            animated: true,
            type: 'smoothstep',
            style: { stroke: '#3b82f6', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#3b82f6',
            },
          };
          
          setEdges(prevEdges => [...prevEdges, newEdge]);
        }
      }
    };
  }, [nodes, setNodes, setEdges]);

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
        type: 'smoothstep',
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
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
