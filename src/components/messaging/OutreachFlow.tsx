
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FlowBuilder from './outreachFlow/FlowBuilder';
import SequenceEditor from './outreachFlow/SequenceEditor';
import { useToast } from '@/hooks/use-toast';
import { MessageScript } from './MessageTemplates';
import { fetchScriptTemplates } from '@/lib/api/messageApi';

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

  // Load message templates when component mounts
  React.useEffect(() => {
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

  const handleSaveFlow = () => {
    // In a real app, this would save the flow to the API
    toast({
      title: "Flow saved",
      description: `Saved outreach flow with ${flowSteps.length} steps.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Outreach Flow Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visual" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="visual">Visual Builder</TabsTrigger>
              <TabsTrigger value="sequence">Sequence Editor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visual">
              <FlowBuilder 
                flowSteps={flowSteps}
                onAddStep={handleAddStep}
                onUpdateStep={handleUpdateStep}
                onDeleteStep={handleDeleteStep}
                onSaveFlow={handleSaveFlow}
                templates={templates}
                isLoading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="sequence">
              <SequenceEditor 
                steps={flowSteps}
                onAddStep={handleAddStep}
                onUpdateStep={handleUpdateStep}
                onDeleteStep={handleDeleteStep}
                onReorderStep={handleReorderStep}
                onSaveFlow={handleSaveFlow}
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
