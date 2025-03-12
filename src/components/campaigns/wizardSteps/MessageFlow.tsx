
import React, { useEffect } from 'react';
import ReactFlow, { Background, Controls, NodeTypes, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { CampaignFormData } from '../types/campaignTypes';
import MessageNode from './flowNodes/MessageNode';
import DelayNode from './flowNodes/DelayNode';
import ConditionNode from './flowNodes/ConditionNode';
import FlowNodeEditor from './FlowNodeEditor';
import { useFlowState } from '../hooks/useFlowState';
import { useNodeOperations } from '../hooks/useNodeOperations';
import FlowControlsToolbar from './FlowControlsToolbar';
import { toast } from '@/hooks/use-toast';

interface MessageFlowProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

const initialNodes = [
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

const initialEdges = [];

const nodeTypes: NodeTypes = {
  messageNode: MessageNode,
  delayNode: DelayNode,
  conditionNode: ConditionNode,
};

const MessageFlow: React.FC<MessageFlowProps> = ({ formData, setFormData, onNext, onBack }) => {
  const {
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
    handleNodeClick
  } = useFlowState({ 
    initialNodes: formData.messageFlow?.nodes?.length ? formData.messageFlow.nodes : initialNodes, 
    initialEdges: formData.messageFlow?.edges?.length ? formData.messageFlow.edges : initialEdges 
  });

  // Update parent formData whenever nodes or edges change
  useEffect(() => {
    // Update messageFlow in formData
    setFormData(prev => ({
      ...prev,
      messageFlow: {
        nodes,
        edges
      }
    }));

    // Also update flows for compatibility with older code
    setFormData(prev => ({
      ...prev,
      flows: nodes.map(node => ({
        id: node.id,
        type: node.type,
        data: node.data
      }))
    }));
  }, [nodes, edges, setFormData]);

  const { addNode, updateNode, deleteNode } = useNodeOperations({
    nodes,
    edges,
    setNodes,
    setEdges,
    setShowNodeModal
  });

  const handleAddNode = (type: 'message' | 'delay' | 'condition') => {
    setNodeType(type);
    setSelectedNode(null);
    
    if (type === 'message') {
      setNodeData({
        message: '',
        assignedTo: '',
        templateId: '',
        subject: '',
        channel: 'email',
        label: `New Message`,
      });
    } else if (type === 'delay') {
      setNodeData({
        days: 1,
        hours: 0,
        label: 'Wait Period',
      });
    } else {
      setNodeData({
        condition: '',
        action: '',
        targetStage: '',
        waitDays: 0,
        label: 'Condition',
      });
    }
    
    setShowNodeModal(true);
  };

  const handleSaveNode = () => {
    if (!nodeData.message && nodeType === 'message') {
      toast({
        title: "Validation Error",
        description: "Message content is required",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedNode) {
      updateNode(selectedNode, nodeType, nodeData);
    } else {
      const { setNodeData: setNewNodeData } = addNode(nodeType);
      setNewNodeData(nodeData);
    }
    setShowNodeModal(false);
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      deleteNode(selectedNode);
    }
  };

  const saveFlowToFormData = () => {
    if (nodes.length === 0) {
      toast({
        title: "Warning",
        description: "Your message flow is empty. Consider adding at least one message step.",
      });
    }
    
    setFormData({
      ...formData,
      messageFlow: {
        nodes,
        edges
      },
      flows: nodes.map(node => ({
        id: node.id,
        type: node.type,
        data: node.data
      }))
    });
    onNext();
  };

  return (
    <div className="h-full flex flex-col">
      <FlowControlsToolbar onAddNode={handleAddNode} />

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
          <Panel position="top-right">
            <div className="bg-white dark:bg-slate-800 p-2 rounded shadow-md text-xs">
              {nodes.length} nodes | {edges.length} connections
            </div>
          </Panel>
        </ReactFlow>
      </div>

      <FlowNodeEditor
        open={showNodeModal}
        onOpenChange={setShowNodeModal}
        nodeType={nodeType}
        nodeData={nodeData}
        setNodeData={setNodeData}
        selectedNode={selectedNode}
        onSave={handleSaveNode}
        onDelete={handleDeleteNode}
      />

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={saveFlowToFormData}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default MessageFlow;
