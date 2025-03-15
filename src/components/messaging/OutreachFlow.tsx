
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { MessageScript } from './MessageTemplates';
import { fetchScriptTemplates } from '@/lib/api/messageApi';
import FlowCanvas from '@/components/campaigns/wizardSteps/components/FlowCanvas';
import FlowNodeEditor from '@/components/campaigns/wizardSteps/FlowNodeEditor';
import { useMessageFlowState } from '@/components/campaigns/wizardSteps/hooks/useMessageFlowState';
import FlowNodeActions from '@/components/campaigns/wizardSteps/components/FlowNodeActions';
import FlowSaveValidation from '@/components/campaigns/wizardSteps/components/FlowSaveValidation';
import { availableChannels } from '@/components/campaigns/constants/channels';
import SequenceEditor from './outreachFlow/SequenceEditor';

export interface FlowStep {
  id: number;
  type: string; // 'message' | 'delay' | 'condition'
  platform?: string;
  content?: string;
  subject?: string;
  delay?: string;
  condition?: string;
  templateId?: number;
}

const OutreachFlow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('visual');
  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([]);
  const [templates, setTemplates] = useState<MessageScript[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
    setSelectedNode
  } = useMessageFlowState(flowFormData, setFlowFormData, () => {
    toast({
      title: "Flow saved",
      description: "Your message flow has been saved successfully."
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
      toast({
        title: "Flow saved",
        description: "Your message flow has been saved successfully."
      });
    }
  });

  // Load message templates when component mounts
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoading(true);
        const data = await fetchScriptTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to load templates:", error);
        toast({
          title: "Error loading templates",
          description: "Could not load message templates. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplates();
  }, [toast]);

  const handleAddNodeType = (type: 'message' | 'delay' | 'condition') => {
    handleAddNode(type);
  };

  const handleAddStep = (step: FlowStep) => {
    setFlowSteps([...flowSteps, { ...step, id: Date.now() }]);
    toast({
      title: "Step added",
      description: `Added a new ${step.type} step to your flow.`
    });
  };

  const handleUpdateStep = (updatedStep: FlowStep) => {
    setFlowSteps(
      flowSteps.map(step => 
        step.id === updatedStep.id ? updatedStep : step
      )
    );
    toast({
      title: "Step updated",
      description: "Your flow step has been updated."
    });
  };

  const handleDeleteStep = (id: number) => {
    setFlowSteps(flowSteps.filter(step => step.id !== id));
    toast({
      title: "Step deleted",
      description: "The step has been removed from your flow."
    });
  };

  const handleReorderStep = (id: number, direction: 'up' | 'down') => {
    const currentIndex = flowSteps.findIndex(step => step.id === id);
    if (currentIndex === -1) return;

    const newSteps = [...flowSteps];
    
    if (direction === 'up' && currentIndex > 0) {
      // Swap with previous element
      [newSteps[currentIndex], newSteps[currentIndex - 1]] = 
      [newSteps[currentIndex - 1], newSteps[currentIndex]];
    } else if (direction === 'down' && currentIndex < flowSteps.length - 1) {
      // Swap with next element
      [newSteps[currentIndex], newSteps[currentIndex + 1]] = 
      [newSteps[currentIndex + 1], newSteps[currentIndex]];
    }

    setFlowSteps(newSteps);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Outreach Flow Builder</span>
            <Button onClick={saveFlowToFormData}>
              Save Flow
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visual" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="visual">Visual Builder</TabsTrigger>
              <TabsTrigger value="sequence">Sequence Editor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visual">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Design your outreach sequence by adding messages, delays, and conditions.
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
              </div>
            </TabsContent>
            
            <TabsContent value="sequence">
              <SequenceEditor 
                steps={flowSteps}
                onAddStep={handleAddStep}
                onUpdateStep={handleUpdateStep}
                onDeleteStep={handleDeleteStep}
                onReorderStep={handleReorderStep}
                onSaveFlow={() => saveFlowToFormData()}
                templates={templates}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutreachFlow;
