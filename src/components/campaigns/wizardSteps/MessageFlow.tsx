
import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  Background, 
  Controls, 
  NodeChange, 
  EdgeChange, 
  Connection, 
  applyNodeChanges, 
  applyEdgeChanges,
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { MessageSquare, Clock, AlertTriangle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CampaignFormData, MessageStep, MessageStepData, DelayStepData, ConditionStepData } from '../types/campaignTypes';
import { availableChannels } from '../constants/channels';
import MessageNode from './flowNodes/MessageNode';
import DelayNode from './flowNodes/DelayNode';
import ConditionNode from './flowNodes/ConditionNode';
import FlowNodeEditor from './FlowNodeEditor';

interface MessageFlowProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

const nodeTypes = {
  messageNode: MessageNode,
  delayNode: DelayNode,
  conditionNode: ConditionNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'messageNode',
    position: { x: 250, y: 100 },
    data: {
      label: 'Initial Outreach',
      channel: 'email',
      message: 'Hi {{firstName}}, I noticed your work at {{company}} and thought we should connect...',
    },
  },
];

const initialEdges: Edge[] = [];

const MessageFlow: React.FC<MessageFlowProps> = ({ formData, setFormData, onNext, onBack }) => {
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

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
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
  };

  const addNode = (type: 'message' | 'delay' | 'condition') => {
    setNodeType(type);
    setSelectedNode(null);
    setNodeData(
      type === 'message'
        ? {
            message: '',
            assignedTo: '',
            templateId: '',
            subject: '',
          }
        : type === 'delay'
        ? {
            days: 1,
            hours: 0,
          }
        : {
            condition: '',
            action: '',
            targetStage: '',
            waitDays: 0,
          }
    );
    setShowNodeModal(true);
  };

  const saveNode = () => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode) {
            if (nodeType === 'message' && node.type === 'messageNode') {
              const messageData = nodeData as MessageStepData;
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
              const delayData = nodeData as DelayStepData;
              return {
                ...node,
                data: {
                  ...node.data,
                  days: delayData.days,
                  hours: delayData.hours,
                },
              };
            } else if (nodeType === 'condition' && node.type === 'conditionNode') {
              const conditionData = nodeData as ConditionStepData;
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
    } else {
      const id = (nodes.length + 1).toString();
      let newNode: Node;

      if (nodeType === 'message') {
        const messageData = nodeData as MessageStepData;
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
      } else if (nodeType === 'delay') {
        const delayData = nodeData as DelayStepData;
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
        const conditionData = nodeData as ConditionStepData;
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

    setShowNodeModal(false);
  };

  const deleteNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== selectedNode && edge.target !== selectedNode)
      );
      setShowNodeModal(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Message Sequence Flow</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => addNode('message')}>
            <MessageSquare className="h-4 w-4 mr-1" /> Add Message
          </Button>
          <Button variant="outline" size="sm" onClick={() => addNode('delay')}>
            <Clock className="h-4 w-4 mr-1" /> Add Delay
          </Button>
          <Button variant="outline" size="sm" onClick={() => addNode('condition')}>
            <AlertTriangle className="h-4 w-4 mr-1" /> Add Condition
          </Button>
        </div>
      </div>

      <div className="border rounded-md flex-1 min-h-[400px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <FlowNodeEditor
        open={showNodeModal}
        onOpenChange={setShowNodeModal}
        nodeType={nodeType}
        nodeData={nodeData}
        setNodeData={setNodeData}
        selectedNode={selectedNode}
        onSave={saveNode}
        onDelete={deleteNode}
      />

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default MessageFlow;
