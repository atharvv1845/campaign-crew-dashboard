
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Plus, Clock, AlertCircle, MessageSquare, Save, Loader2, List
} from 'lucide-react';
import FlowStepDialog from './outreachFlow/FlowStepDialog';
import FlowVisualization from './outreachFlow/FlowVisualization';
import SequenceStepList from './outreachFlow/SequenceStepList';
import { fetchScriptTemplates } from '@/lib/api/messageApi';
import { MessageScript } from './MessageTemplates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Flow step interface
export interface FlowStep {
  id: number;
  type: 'message' | 'delay' | 'condition';
  platform?: string;
  subject?: string;
  content?: string;
  delay?: string;
  condition?: string;
  templateId?: number;
}

// Outreach flow interface
interface OutreachFlow {
  id: number;
  name: string;
  steps: FlowStep[];
}

const OUTREACH_FLOWS_STORAGE_KEY = 'outreachFlows';

const OutreachFlow: React.FC = () => {
  const [flows, setFlows] = useState<OutreachFlow[]>([]);
  const [currentFlow, setCurrentFlow] = useState<OutreachFlow | null>(null);
  const [flowName, setFlowName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<FlowStep>({
    id: 0,
    type: 'message',
    platform: 'email',
    content: '',
  });
  const [templates, setTemplates] = useState<MessageScript[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [viewMode, setViewMode] = useState<'flow' | 'list'>('flow');
  const { toast } = useToast();

  // Load message templates
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoadingTemplates(true);
        const data = await fetchScriptTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to load templates:", error);
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    loadTemplates();
  }, []);

  // Check if there's a flow ID in the URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flowId = params.get('flowId');
    
    if (flowId && flows.length > 0) {
      const flow = flows.find(f => f.id === Number(flowId));
      if (flow) {
        setCurrentFlow(flow);
        setFlowName(flow.name);
      }
    }
  }, [flows]);

  // Load saved flows from localStorage
  useEffect(() => {
    try {
      const savedFlows = localStorage.getItem(OUTREACH_FLOWS_STORAGE_KEY);
      if (savedFlows) {
        const parsedFlows = JSON.parse(savedFlows);
        setFlows(parsedFlows);
        
        // If there are flows but no current flow is selected, select the first one
        if (parsedFlows.length > 0 && !currentFlow) {
          setCurrentFlow(parsedFlows[0]);
          setFlowName(parsedFlows[0].name);
        }
      }
    } catch (error) {
      console.error("Error loading saved flows:", error);
    }
  }, []);

  // Save the current flow to localStorage whenever it changes
  useEffect(() => {
    if (currentFlow) {
      const updatedFlows = flows.map(flow => 
        flow.id === currentFlow.id ? currentFlow : flow
      );
      localStorage.setItem(OUTREACH_FLOWS_STORAGE_KEY, JSON.stringify(updatedFlows));
      setFlows(updatedFlows);
    }
  }, [currentFlow]);

  // Add a new step to the flow
  const handleAddStep = (type: string) => {
    if (!currentFlow) {
      toast({
        title: "No flow selected",
        description: "Please create or select a flow first",
      });
      return;
    }
    
    let newStep: FlowStep;
    
    if (type === 'delay') {
      newStep = {
        id: Date.now(),
        type: 'delay',
        delay: '1 day',
      };
    } else if (type === 'condition') {
      newStep = {
        id: Date.now(),
        type: 'condition',
        condition: 'noreply',
      };
    } else {
      // Message step with the selected platform
      newStep = {
        id: Date.now(),
        type: 'message',
        platform: type,
        content: '',
      };
    }
    
    setEditingStep(newStep);
    setDialogOpen(true);
  };

  // Edit an existing step
  const handleEditStep = (step: FlowStep) => {
    setEditingStep(step);
    setDialogOpen(true);
  };

  // Save the step after editing
  const handleSaveStep = (step: FlowStep) => {
    if (!currentFlow) return;
    
    let updatedSteps: FlowStep[];
    
    if (step.id === 0) {
      // New step
      const newStep = { ...step, id: Date.now() };
      updatedSteps = [...currentFlow.steps, newStep];
    } else {
      // Update existing step
      updatedSteps = currentFlow.steps.map(s => 
        s.id === step.id ? step : s
      );
    }
    
    setCurrentFlow({
      ...currentFlow,
      steps: updatedSteps,
    });
    
    setDialogOpen(false);
    
    toast({
      title: step.id === 0 ? "Step added" : "Step updated",
      description: `The ${step.type} step has been ${step.id === 0 ? 'added to' : 'updated in'} your flow`,
    });
  };

  // Delete a step
  const handleDeleteStep = (stepId: number) => {
    if (!currentFlow) return;
    
    const updatedSteps = currentFlow.steps.filter(step => step.id !== stepId);
    
    setCurrentFlow({
      ...currentFlow,
      steps: updatedSteps,
    });
    
    toast({
      title: "Step deleted",
      description: "The step has been removed from your flow",
    });
  };

  // Create a new flow
  const handleCreateFlow = () => {
    if (!flowName.trim()) {
      toast({
        title: "Flow name required",
        description: "Please enter a name for your flow",
        variant: "destructive",
      });
      return;
    }
    
    const newFlow: OutreachFlow = {
      id: Date.now(),
      name: flowName,
      steps: [],
    };
    
    const updatedFlows = [...flows, newFlow];
    setFlows(updatedFlows);
    setCurrentFlow(newFlow);
    
    // Save to localStorage
    localStorage.setItem(OUTREACH_FLOWS_STORAGE_KEY, JSON.stringify(updatedFlows));
    
    toast({
      title: "Flow created",
      description: `"${flowName}" has been created`,
    });
  };

  // Change to a different flow
  const handleSelectFlow = (flowId: string) => {
    const selected = flows.find(flow => flow.id === Number(flowId));
    if (selected) {
      setCurrentFlow(selected);
      setFlowName(selected.name);
    }
  };

  // Update flow name
  const handleUpdateFlowName = () => {
    if (!currentFlow || !flowName.trim()) return;
    
    const updatedFlow = { ...currentFlow, name: flowName };
    const updatedFlows = flows.map(flow => 
      flow.id === currentFlow.id ? updatedFlow : flow
    );
    
    setCurrentFlow(updatedFlow);
    setFlows(updatedFlows);
    
    // Save to localStorage
    localStorage.setItem(OUTREACH_FLOWS_STORAGE_KEY, JSON.stringify(updatedFlows));
    
    toast({
      title: "Flow renamed",
      description: `Flow has been renamed to "${flowName}"`,
    });
  };

  // Delete the current flow
  const handleDeleteFlow = () => {
    if (!currentFlow) return;
    
    const updatedFlows = flows.filter(flow => flow.id !== currentFlow.id);
    setFlows(updatedFlows);
    setCurrentFlow(updatedFlows.length > 0 ? updatedFlows[0] : null);
    if (updatedFlows.length > 0) {
      setFlowName(updatedFlows[0].name);
    } else {
      setFlowName('');
    }
    
    // Save to localStorage
    localStorage.setItem(OUTREACH_FLOWS_STORAGE_KEY, JSON.stringify(updatedFlows));
    
    toast({
      title: "Flow deleted",
      description: `"${currentFlow.name}" has been deleted`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Flow selection and management */}
      <Card className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Outreach Flow</label>
            <div className="flex gap-2">
              <Select 
                value={currentFlow?.id.toString() || ''} 
                onValueChange={handleSelectFlow}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select or create a flow" />
                </SelectTrigger>
                <SelectContent>
                  {flows.length === 0 ? (
                    <div className="p-2 text-center text-muted-foreground">
                      No flows available. Create one!
                    </div>
                  ) : (
                    flows.map(flow => (
                      <SelectItem key={flow.id} value={flow.id.toString()}>
                        {flow.name} ({flow.steps.length} steps)
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentFlow(null);
                  setFlowName('');
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Flow Name</label>
            <div className="flex gap-2">
              <Input
                value={flowName}
                onChange={e => setFlowName(e.target.value)}
                placeholder="Enter flow name"
              />
              
              {currentFlow ? (
                <Button
                  variant="outline"
                  onClick={handleUpdateFlowName}
                  disabled={!flowName.trim()}
                >
                  <Save className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleCreateFlow}
                  disabled={!flowName.trim()}
                >
                  Create
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Flow building area */}
      {currentFlow ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button onClick={() => handleAddStep('email')} variant="outline">
                <MessageSquare className="h-4 w-4 mr-1" />
                Add Message
              </Button>
              
              <Button onClick={() => handleAddStep('delay')} variant="outline">
                <Clock className="h-4 w-4 mr-1" />
                Add Delay
              </Button>
              
              <Button onClick={() => handleAddStep('condition')} variant="outline">
                <AlertCircle className="h-4 w-4 mr-1" />
                Add Condition
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'flow' | 'list')}>
                <TabsList>
                  <TabsTrigger value="flow">Flow View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Platform selection dropdown */}
          <div className="flex gap-2">
            <Select onValueChange={(platform) => handleAddStep(platform)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Add step by platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Flow visualization */}
          <TabsContent value="flow" className={viewMode === 'flow' ? 'block' : 'hidden'}>
            <Card className="p-4 min-h-[400px]">
              {currentFlow.steps.length > 0 ? (
                <FlowVisualization
                  steps={currentFlow.steps}
                  onEditStep={handleEditStep}
                  onDeleteStep={handleDeleteStep}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-72 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
                  <p>Your flow is empty. Add steps to get started.</p>
                  <Button className="mt-4" onClick={() => handleAddStep('email')}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add First Step
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="list" className={viewMode === 'list' ? 'block' : 'hidden'}>
            <Card className="p-4 min-h-[400px]">
              {currentFlow.steps.length > 0 ? (
                <SequenceStepList
                  steps={currentFlow.steps}
                  onEditStep={handleEditStep}
                  onDeleteStep={handleDeleteStep}
                  onReorderStep={(id, direction) => {
                    const stepIndex = currentFlow.steps.findIndex(s => s.id === id);
                    if ((direction === 'up' && stepIndex <= 0) || 
                        (direction === 'down' && stepIndex >= currentFlow.steps.length - 1)) {
                      return;
                    }
                    
                    const updatedSteps = [...currentFlow.steps];
                    const targetIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;
                    [updatedSteps[stepIndex], updatedSteps[targetIndex]] = 
                      [updatedSteps[targetIndex], updatedSteps[stepIndex]];
                    
                    setCurrentFlow({
                      ...currentFlow,
                      steps: updatedSteps
                    });
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-72 text-muted-foreground">
                  <List className="h-12 w-12 mb-2 opacity-20" />
                  <p>Your flow is empty. Add steps to get started.</p>
                  <Button className="mt-4" onClick={() => handleAddStep('email')}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add First Step
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>
        </div>
      ) : (
        <Card className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
          <MessageSquare className="h-12 w-12 mb-4 text-muted-foreground opacity-20" />
          <h3 className="text-lg font-medium mb-2">Create Your First Outreach Flow</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Build multi-step outreach sequences across different platforms with delays and conditions.
          </p>
          <Button onClick={handleCreateFlow} disabled={!flowName.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            Create Flow
          </Button>
        </Card>
      )}
      
      {/* Step editing dialog */}
      <FlowStepDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        step={editingStep}
        onSave={handleSaveStep}
        templates={templates}
        isLoading={isLoadingTemplates}
      />
    </div>
  );
};

export default OutreachFlow;
