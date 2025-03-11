
import React, { useState, useCallback, useRef } from 'react';
import { CampaignFormData, availableChannels } from '../CreateCampaign';
import { Plus, MessageSquare, Clock, ArrowRight, Edit, Trash2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

interface MessageFlowProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

// Node types
const nodeTypes = {
  messageNode: MessageNode,
  delayNode: DelayNode,
  conditionNode: ConditionNode
};

// Custom nodes
function MessageNode({ data, id }: { data: any, id: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-lg w-[250px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">{data.channel} Message</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={data.onEdit}
            className="p-1 rounded-full hover:bg-muted/50 transition-colors"
          >
            <Edit className="h-3 w-3" />
          </button>
          <button
            onClick={() => data.onDelete(id)}
            className="p-1 rounded-full hover:bg-muted/50 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="text-xs truncate">{data.message || 'No message content'}</div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        {data.assignedTo ? (
          <span>Assigned: {data.assignedTo}</span>
        ) : (
          <span>Unassigned</span>
        )}
      </div>
    </div>
  );
}

function DelayNode({ data, id }: { data: any, id: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-lg w-[180px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="font-medium text-sm">Delay</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={data.onEdit}
            className="p-1 rounded-full hover:bg-muted/50 transition-colors"
          >
            <Edit className="h-3 w-3" />
          </button>
          <button
            onClick={() => data.onDelete(id)}
            className="p-1 rounded-full hover:bg-muted/50 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="text-xs">
        Wait for {data.days} day{data.days !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

function ConditionNode({ data, id }: { data: any, id: string }) {
  return (
    <div className="p-4 bg-card border border-border rounded-lg w-[220px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4 text-yellow-500" />
          <span className="font-medium text-sm">Condition</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={data.onEdit}
            className="p-1 rounded-full hover:bg-muted/50 transition-colors"
          >
            <Edit className="h-3 w-3" />
          </button>
          <button
            onClick={() => data.onDelete(id)}
            className="p-1 rounded-full hover:bg-muted/50 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="text-xs">
        {data.condition}: {data.action}
      </div>
    </div>
  );
}

const MessageFlow: React.FC<MessageFlowProps> = ({ formData, setFormData, onNext, onBack }) => {
  // Get selected channels
  const selectedChannels = availableChannels.filter(channel => 
    formData.channels.includes(channel.id)
  );
  
  // Initial nodes and edges
  const initialNodes: Node[] = formData.messageFlow.nodes.length > 0 
    ? formData.messageFlow.nodes 
    : [
        {
          id: 'start',
          type: 'input',
          data: { label: 'Start' },
          position: { x: 250, y: 5 },
          style: {
            background: '#f5f5f5',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '10px',
            width: 100,
            textAlign: 'center'
          }
        }
      ];
      
  const initialEdges: Edge[] = formData.messageFlow.edges.length > 0 
    ? formData.messageFlow.edges 
    : [];
    
  // Set up nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Modal state for node editing
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [modalType, setModalType] = useState<'message' | 'delay' | 'condition'>('message');
  const [currentNode, setCurrentNode] = useState<any>(null);
  const [nodeFormData, setNodeFormData] = useState<any>({
    channel: '',
    message: '',
    assignedTo: '',
    days: 1,
    condition: 'No Reply',
    action: 'Move to Follow-Up'
  });
  
  // React Flow instance
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  // Handle connections between nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  
  // Save the flow to form data
  const saveFlow = () => {
    setFormData(prev => ({
      ...prev,
      messageFlow: {
        nodes,
        edges
      }
    }));
  };
  
  // Add a new node
  const addNode = (type: 'message' | 'delay' | 'condition') => {
    setModalType(type);
    setCurrentNode(null);
    
    // Set default values based on node type
    if (type === 'message') {
      setNodeFormData({
        channel: selectedChannels[0]?.id || '',
        message: '',
        assignedTo: ''
      });
    } else if (type === 'delay') {
      setNodeFormData({
        days: 1
      });
    } else if (type === 'condition') {
      setNodeFormData({
        condition: 'No Reply',
        action: 'Move to Follow-Up'
      });
    }
    
    setShowNodeModal(true);
  };
  
  // Edit an existing node
  const editNode = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    setCurrentNode(node);
    setModalType(node.type.replace('Node', '') as any);
    setNodeFormData(node.data);
    setShowNodeModal(true);
  };
  
  // Delete a node
  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setEdges(edges.filter(e => e.source !== nodeId && e.target !== nodeId));
  };
  
  // Handle changes in the node form
  const handleNodeFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNodeFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Save a node from the modal
  const saveNode = () => {
    // Generate node ID if new node
    const nodeId = currentNode ? currentNode.id : `${modalType}-${Date.now()}`;
    
    // Create the node object
    const newNode = {
      id: nodeId,
      type: `${modalType}Node`,
      data: {
        ...nodeFormData,
        onEdit: () => editNode(nodeId),
        onDelete: deleteNode
      },
      position: currentNode 
        ? currentNode.position 
        : { 
            x: Math.max(...nodes.map(n => n.position.x)) + 100,
            y: Math.max(...nodes.map(n => n.position.y)) + 100
          }
    };
    
    // Update or add the node
    if (currentNode) {
      setNodes(nodes.map(n => n.id === nodeId ? newNode : n));
    } else {
      setNodes([...nodes, newNode]);
      
      // Add an edge from the last node if this is a new node
      const lastNodeId = nodes[nodes.length - 1]?.id;
      if (lastNodeId) {
        setEdges([
          ...edges,
          {
            id: `e-${lastNodeId}-${nodeId}`,
            source: lastNodeId,
            target: nodeId,
            type: 'smoothstep'
          }
        ]);
      }
    }
    
    setShowNodeModal(false);
  };
  
  // Check if the flow is valid (has at least one message node)
  const hasMessageNodes = nodes.some(node => node.type === 'messageNode');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Message Sequence Flow</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create a sequence of messages and conditions to guide your outreach workflow.
        </p>
        
        {/* Flow builder */}
        <div className="border border-border rounded-lg" style={{ height: 500 }}>
          <div ref={reactFlowWrapper} style={{ height: '100%' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background />
              <Controls />
              <MiniMap />
              
              <Panel position="top-right">
                <div className="flex gap-2 bg-background p-2 rounded-lg shadow-sm">
                  <button
                    onClick={() => addNode('message')}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-md text-sm"
                  >
                    <MessageSquare className="h-3 w-3" />
                    Message
                  </button>
                  <button
                    onClick={() => addNode('delay')}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-md text-sm"
                  >
                    <Clock className="h-3 w-3" />
                    Delay
                  </button>
                  <button
                    onClick={() => addNode('condition')}
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-md text-sm"
                  >
                    <ArrowRight className="h-3 w-3" />
                    Condition
                  </button>
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </div>
        
        {/* Tips */}
        <div className="mt-4 p-3 bg-muted/20 rounded-lg text-sm">
          <div className="flex items-start gap-2">
            <Settings className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <span className="font-medium">Flow Building Tips:</span>
              <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 text-xs">
                <li>Add message nodes for different channels in your sequence</li>
                <li>Add delay nodes to wait before sending the next message</li>
                <li>Use conditions to create different paths based on lead responses</li>
                <li>Connect nodes to create a complete flow</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Node editing modal */}
      {showNodeModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div 
            className="bg-card w-full max-w-md rounded-xl shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h3 className="text-lg font-medium">
                {currentNode ? 'Edit' : 'Add'} {
                  modalType === 'message' ? 'Message' : 
                  modalType === 'delay' ? 'Delay' : 'Condition'
                }
              </h3>
              <button 
                onClick={() => setShowNodeModal(false)}
                className="p-2 rounded-full hover:bg-muted/50 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              {modalType === 'message' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="channel" className="block text-sm font-medium">
                      Channel
                    </label>
                    <select
                      id="channel"
                      name="channel"
                      value={nodeFormData.channel}
                      onChange={handleNodeFormChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {selectedChannels.map(channel => (
                        <option key={channel.id} value={channel.id}>
                          {channel.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      Message Content
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={nodeFormData.message}
                      onChange={handleNodeFormChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px]"
                      placeholder="Enter your message content..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Use <span className="font-mono">[name]</span>, <span className="font-mono">[company]</span> for personalization.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="assignedTo" className="block text-sm font-medium">
                      Assigned To
                    </label>
                    <input
                      id="assignedTo"
                      name="assignedTo"
                      type="text"
                      value={nodeFormData.assignedTo}
                      onChange={handleNodeFormChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Team member name"
                    />
                  </div>
                </div>
              )}
              
              {modalType === 'delay' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="days" className="block text-sm font-medium">
                      Delay Duration (days)
                    </label>
                    <input
                      id="days"
                      name="days"
                      type="number"
                      min="1"
                      value={nodeFormData.days}
                      onChange={handleNodeFormChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              )}
              
              {modalType === 'condition' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="condition" className="block text-sm font-medium">
                      Condition
                    </label>
                    <select
                      id="condition"
                      name="condition"
                      value={nodeFormData.condition}
                      onChange={handleNodeFormChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="No Reply">No Reply</option>
                      <option value="Positive Reply">Positive Reply</option>
                      <option value="Negative Reply">Negative Reply</option>
                      <option value="Email Opened">Email Opened</option>
                      <option value="Email Link Clicked">Email Link Clicked</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="action" className="block text-sm font-medium">
                      Action
                    </label>
                    <input
                      id="action"
                      name="action"
                      type="text"
                      value={nodeFormData.action}
                      onChange={handleNodeFormChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="e.g., Move to Follow-Up, Assign to Manager"
                    />
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowNodeModal(false)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNode}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t border-border">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => {
            saveFlow();
            onNext();
          }}
          disabled={!hasMessageNodes}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MessageFlow;
