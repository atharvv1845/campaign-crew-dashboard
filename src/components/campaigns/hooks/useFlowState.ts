
import { useState, useCallback } from 'react';
import { Node, Edge, Connection, NodeChange, EdgeChange, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import { MessageStepData, DelayStepData, ConditionStepData } from '../types/campaignTypes';

interface UseFlowStateProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
}

export function useFlowState({ initialNodes = [], initialEdges = [] }: UseFlowStateProps = {}) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [nodeType, setNodeType] = useState<'message' | 'delay' | 'condition'>('message');
  const [nodeData, setNodeData] = useState<MessageStepData | DelayStepData | ConditionStepData>({
    message: '',
    assignedTo: '',
    templateId: '',
  } as MessageStepData);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    []
  );

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    if (node.type === 'messageNode') {
      setNodeType('message');
      setNodeData({
        message: node.data.message,
        assignedTo: node.data.assignedTo || '',
        templateId: node.data.templateId || '',
        subject: node.data.subject || '',
      } as MessageStepData);
    } else if (node.type === 'delayNode') {
      setNodeType('delay');
      setNodeData({
        days: node.data.days,
        hours: node.data.hours || 0,
      } as DelayStepData);
    } else if (node.type === 'conditionNode') {
      setNodeType('condition');
      setNodeData({
        condition: node.data.condition,
        action: node.data.action || '',
        targetStage: node.data.targetStage || '',
        waitDays: node.data.waitDays || 0,
      } as ConditionStepData);
    }
    setShowNodeModal(true);
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    showNodeModal,
    nodeType,
    nodeData,
    setNodes,
    setEdges,
    setSelectedNode,
    setShowNodeModal,
    setNodeType,
    setNodeData,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
  };
}
