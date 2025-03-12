
import { Node, Edge, Position, MarkerType } from 'reactflow';
import { MessageStepData, DelayStepData, ConditionStepData } from '../../types/campaignTypes';

/**
 * Creates a new node with the specified type and data
 */
export const createNewNode = (
  nodes: Node[],
  type: 'message' | 'delay' | 'condition',
  data: MessageStepData | DelayStepData | ConditionStepData
): Node => {
  const newNodeId = (nodes.length + 1).toString();
  
  // Calculate position based on existing nodes
  let position = { 
    x: 250, 
    y: nodes.length > 0 
      ? Math.max(...nodes.map(n => n.position.y)) + 150 
      : 100 
  };

  // Create the new node with provided data and appropriate type
  return {
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
};

/**
 * Creates an edge connecting two nodes
 */
export const createEdgeBetweenNodes = (
  sourceNodeId: string,
  targetNodeId: string,
  sourceHandle?: string,
  targetHandle?: string,
  label?: string
): Edge => {
  return {
    id: `e${sourceNodeId}-${targetNodeId}${sourceHandle ? `-${sourceHandle}` : ''}`,
    source: sourceNodeId,
    target: targetNodeId,
    sourceHandle,
    targetHandle,
    animated: true,
    type: 'smoothstep',
    label,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#3b82f6',
    },
  };
};

/**
 * Finds the appropriate source node to connect to a new node
 */
export const findAppropriateSourceNode = (
  nodes: Node[],
  edges: Edge[]
): string => {
  if (nodes.length === 0) return '';
  
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
  
  return sourceNodeId;
};

/**
 * Check if a node can have multiple outgoing connections
 */
export const canHaveMultipleConnections = (nodeType: string): boolean => {
  return nodeType === 'conditionNode';
};

/**
 * Get available connection handles for a node type
 */
export const getAvailableHandles = (nodeType: string): string[] => {
  if (nodeType === 'conditionNode') {
    return ['yes', 'no'];
  }
  return ['default'];
};
