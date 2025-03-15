
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MessageTemplates from '@/components/messaging/MessageTemplates';
import ScriptEditor from '@/components/messaging/ScriptEditor';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save } from 'lucide-react';
import { availableChannels } from '@/components/campaigns/constants/channels';
import FlowCanvas from '@/components/campaigns/wizardSteps/components/FlowCanvas';
import FlowNodeEditor from '@/components/campaigns/wizardSteps/FlowNodeEditor';
import { useMessageFlowState } from '@/components/campaigns/wizardSteps/hooks/useMessageFlowState';
import FlowNodeActions from '@/components/campaigns/wizardSteps/components/FlowNodeActions';
import FlowSaveValidation from '@/components/campaigns/wizardSteps/components/FlowSaveValidation';
import SavedFlowsList from '@/components/messaging/savedFlows/SavedFlowsList';
import FlowSaveDialog from '@/components/messaging/savedFlows/FlowSaveDialog';
import useSavedFlows from '@/components/messaging/hooks/useSavedFlows';

export interface SavedFlow {
  id: string;
  name: string;
  description?: string;
  campaignId?: string;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  flow: {
    nodes: any[];
    edges: any[];
  };
}

const Messaging: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('templates');
  const { toast } = useToast();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [flowName, setFlowName] = useState('');
  const [flowDescription, setFlowDescription] = useState('');
  const [currentFlowId, setCurrentFlowId] = useState<string | null>(null);
  
  // Initial form data for the flow
  const formData = {
    name: '',
    description: '',
    channels: availableChannels.map(c => c.id),
    stages: [],
    team: [],
    leads: [],
    flows: [],
    messageFlow: { nodes: [], edges: [] }
  };
  
  const [flowFormData, setFlowFormData] = useState(formData);
  
  // Use our custom hook for managing saved flows
  const {
    savedFlows,
    addFlow,
    updateFlow,
    deleteFlow,
    duplicateFlow,
    isLoading
  } = useSavedFlows();
  
  // Using the campaign message flow state hook
  const {
    nodes,
    edges,
    selectedNode,
    showNodeModal,
    nodeType,
    nodeData,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
    validateFlow,
    validateMessageData,
    addNode,
    updateNode,
    deleteNode,
    setShowNodeModal,
    setNodeType,
    setNodeData,
    setSelectedNode,
    setNodes,
    setEdges
  } = useMessageFlowState(flowFormData, setFlowFormData, () => {
    toast({
      title: "Flow updated",
      description: "Your message flow has been updated successfully."
    });
  });

  const { handleAddNode, handleSaveNode, handleDeleteNode } = FlowNodeActions({
    nodeType,
    nodeData,
    setNodeData,
    selectedNode,
    validateMessageData,
    updateNode,
    addNode,
    setShowNodeModal,
    deleteNode,
    setNodeType,
    setSelectedNode
  });
  
  const { saveFlowToFormData } = FlowSaveValidation({
    nodes,
    edges,
    validateFlow,
    setFormData: setFlowFormData,
    onNext: () => {
      setShowSaveDialog(true);
    }
  });

  const handleAddNodeType = (type: 'message' | 'delay' | 'condition') => {
    handleAddNode(type);
  };

  const handleSaveFlow = () => {
    if (!flowName.trim()) {
      toast({
        title: "Name required",
        description: "Please provide a name for your flow",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create a copy of the flow data to save
      const flowData = {
        nodes: nodes.map(node => ({...node})),
        edges: edges.map(edge => ({...edge}))
      };

      if (currentFlowId) {
        // Update existing flow
        updateFlow({
          id: currentFlowId,
          name: flowName,
          description: flowDescription,
          status: 'active',
          flow: flowData,
          updatedAt: new Date().toISOString()
        });
        
        toast({
          title: "Flow updated",
          description: `"${flowName}" has been updated successfully.`
        });
      } else {
        // Create new flow
        addFlow({
          id: Date.now().toString(),
          name: flowName,
          description: flowDescription,
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          flow: flowData
        });
        
        toast({
          title: "Flow saved",
          description: `"${flowName}" has been saved successfully.`
        });
      }
      
      setShowSaveDialog(false);
      setFlowName('');
      setFlowDescription('');
    } catch (error) {
      console.error("Error saving flow:", error);
      toast({
        title: "Error",
        description: "Failed to save flow. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLoadFlow = (flow: SavedFlow) => {
    try {
      // Load selected flow
      setFlowName(flow.name);
      setFlowDescription(flow.description || '');
      setCurrentFlowId(flow.id);
      
      // Set the nodes and edges from the saved flow
      setNodes(flow.flow.nodes);
      setEdges(flow.flow.edges);
      
      // Update form data
      setFlowFormData(prev => ({
        ...prev,
        messageFlow: {
          nodes: flow.flow.nodes,
          edges: flow.flow.edges
        }
      }));

      // Switch to flow tab
      setActiveTab('flow');
      
      toast({
        title: "Flow loaded",
        description: `"${flow.name}" has been loaded successfully.`
      });
    } catch (error) {
      console.error("Error loading flow:", error);
      toast({
        title: "Error",
        description: "Failed to load flow. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDuplicateFlow = (flow: SavedFlow) => {
    const duplicated = duplicateFlow(flow);
    toast({
      title: "Flow duplicated",
      description: `"${duplicated.name}" has been created.`
    });
  };

  const handleDeleteSavedFlow = (flowId: string) => {
    deleteFlow(flowId);
    
    // If the deleted flow was the current one, reset the editor
    if (currentFlowId === flowId) {
      setCurrentFlowId(null);
      setFlowName('');
      setFlowDescription('');
      setNodes([]);
      setEdges([]);
    }
    
    toast({
      title: "Flow deleted",
      description: "The flow has been deleted."
    });
  };

  const handleCreateNewFlow = () => {
    // Reset the current flow
    setCurrentFlowId(null);
    setFlowName('');
    setFlowDescription('');
    setNodes([]);
    setEdges([]);
    setActiveTab('flow');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Message Scripts</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="editor">Create/Edit</TabsTrigger>
              <TabsTrigger value="flow">Outreach Flow</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates">
              <MessageTemplates onEditScript={() => setActiveTab('editor')} />
            </TabsContent>
            
            <TabsContent value="editor">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Saved Outreach Flows</h2>
                  <Button onClick={handleCreateNewFlow}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Flow
                  </Button>
                </div>
                
                <SavedFlowsList 
                  flows={savedFlows} 
                  isLoading={isLoading} 
                  onLoadFlow={handleLoadFlow}
                  onDuplicateFlow={handleDuplicateFlow}
                  onDeleteFlow={handleDeleteSavedFlow}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="flow">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    {currentFlowId ? `Editing: ${flowName}` : 'New Message Flow'}
                  </h2>
                  <Button onClick={saveFlowToFormData}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Flow
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  Design your outreach message sequence by adding messages, delays, and conditions.
                </p>
                
                <div className="h-[500px] flex flex-col">
                  <FlowCanvas
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={handleNodeClick}
                    onAddNodeType={handleAddNodeType}
                  />
                </div>

                {/* Node editor dialog */}
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

                {/* Save flow dialog */}
                <FlowSaveDialog
                  open={showSaveDialog}
                  onOpenChange={setShowSaveDialog}
                  flowName={flowName}
                  setFlowName={setFlowName}
                  flowDescription={flowDescription}
                  setFlowDescription={setFlowDescription}
                  isEdit={!!currentFlowId}
                  onSave={handleSaveFlow}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messaging;
