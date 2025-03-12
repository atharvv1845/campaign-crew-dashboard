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
import { ChevronDown, Plus, Trash, Clock, MessageSquare, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { availableChannels } from '../constants/channels';
import { CampaignFormData, MessageStep, MessageStepData, DelayStepData, ConditionStepData } from '../types/campaignTypes';

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

interface MessageNodeProps {
  data: {
    label: string;
    channel: string;
    message: string;
  };
  id: string;
}

function MessageNode({ data, id }: MessageNodeProps) {
  return (
    <div className="p-3 rounded-md border border-border bg-card w-64">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <MessageSquare className="w-4 h-4 mr-2 text-primary" />
          <span className="font-medium text-sm">{data.label}</span>
        </div>
        <div className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full capitalize">
          {data.channel}
        </div>
      </div>
      <div className="text-xs text-muted-foreground border-t border-border pt-2 mt-1">
        {data.message.length > 100 ? `${data.message.substring(0, 100)}...` : data.message}
      </div>
    </div>
  );
}

interface DelayNodeProps {
  data: {
    label: string;
    days: number;
  };
  id: string;
}

function DelayNode({ data, id }: DelayNodeProps) {
  return (
    <div className="p-3 rounded-md border border-border bg-muted/10 w-64">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="font-medium text-sm">{data.label}</span>
        </div>
      </div>
      <div className="text-xs text-muted-foreground border-t border-border pt-2 mt-1">
        Wait for {data.days} {data.days === 1 ? 'day' : 'days'}
      </div>
    </div>
  );
}

interface ConditionNodeProps {
  data: {
    label: string;
    condition: string;
  };
  id: string;
}

function ConditionNode({ data, id }: ConditionNodeProps) {
  return (
    <div className="p-3 rounded-md border border-border bg-amber-500/10 w-64">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
          <span className="font-medium text-sm">{data.label}</span>
        </div>
      </div>
      <div className="text-xs text-muted-foreground border-t border-border pt-2 mt-1">
        {data.condition}
      </div>
    </div>
  );
}

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

      <Dialog open={showNodeModal} onOpenChange={setShowNodeModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedNode ? 'Edit' : 'Add'} {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {nodeType === 'message' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Channel</Label>
                    <Select defaultValue="email">
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableChannels.map((channel) => (
                          <SelectItem key={channel.id} value={channel.id}>
                            {channel.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Assigned To</Label>
                    <Select value={(nodeData as MessageStepData).assignedTo} onValueChange={(value) => setNodeData({ ...nodeData, assignedTo: value } as MessageStepData)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Lee</SelectItem>
                        <SelectItem value="mike">Mike Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Subject (for email)</Label>
                  <Input
                    value={(nodeData as MessageStepData).subject || ''}
                    onChange={(e) => setNodeData({ ...nodeData, subject: e.target.value } as MessageStepData)}
                    placeholder="Email subject line"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    value={(nodeData as MessageStepData).message}
                    onChange={(e) => setNodeData({ ...nodeData, message: e.target.value } as MessageStepData)}
                    placeholder="Enter your message..."
                    rows={6}
                  />
                  <div className="text-xs text-muted-foreground">
                    Use {{firstName}}, {{company}}, etc. for personalization.
                  </div>
                </div>
              </>
            )}

            {nodeType === 'delay' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Days</Label>
                  <Input
                    type="number"
                    min="0"
                    value={(nodeData as DelayStepData).days}
                    onChange={(e) => setNodeData({ ...nodeData, days: parseInt(e.target.value) } as DelayStepData)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hours</Label>
                  <Input
                    type="number"
                    min="0"
                    max="23"
                    value={(nodeData as DelayStepData).hours || 0}
                    onChange={(e) => setNodeData({ ...nodeData, hours: parseInt(e.target.value) } as DelayStepData)}
                  />
                </div>
              </div>
            )}

            {nodeType === 'condition' && (
              <>
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select
                    value={(nodeData as ConditionStepData).condition}
                    onValueChange={(value) => setNodeData({ ...nodeData, condition: value } as ConditionStepData)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="if-no-reply">If no reply</SelectItem>
                      <SelectItem value="if-opened">If email was opened</SelectItem>
                      <SelectItem value="if-clicked">If link was clicked</SelectItem>
                      <SelectItem value="if-replied">If replied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Action</Label>
                  <Select
                    value={(nodeData as ConditionStepData).action}
                    onValueChange={(value) => setNodeData({ ...nodeData, action: value } as ConditionStepData)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="move-to-stage">Move to another stage</SelectItem>
                      <SelectItem value="wait-and-retry">Wait and retry</SelectItem>
                      <SelectItem value="end-sequence">End sequence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(nodeData as ConditionStepData).action === 'move-to-stage' && (
                  <div className="space-y-2">
                    <Label>Target Stage</Label>
                    <Select
                      value={(nodeData as ConditionStepData).targetStage}
                      onValueChange={(value) => setNodeData({ ...nodeData, targetStage: value } as ConditionStepData)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="interested">Interested</SelectItem>
                        <SelectItem value="not-interested">Not Interested</SelectItem>
                        <SelectItem value="meeting">Meeting Scheduled</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(nodeData as ConditionStepData).action === 'wait-and-retry' && (
                  <div className="space-y-2">
                    <Label>Wait Days</Label>
                    <Input
                      type="number"
                      min="1"
                      value={(nodeData as ConditionStepData).waitDays || 1}
                      onChange={(e) => setNodeData({ ...nodeData, waitDays: parseInt(e.target.value) } as ConditionStepData)}
                    />
                  </div>
                )}
              </>
            )}

            <div className="flex justify-between pt-2">
              {selectedNode && (
                <Button variant="destructive" onClick={deleteNode}>
                  <Trash className="h-4 w-4 mr-1" /> Delete
                </Button>
              )}
              <div className="ml-auto space-x-2">
                <Button variant="outline" onClick={() => setShowNodeModal(false)}>
                  Cancel
                </Button>
                <Button onClick={saveNode}>Save</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
