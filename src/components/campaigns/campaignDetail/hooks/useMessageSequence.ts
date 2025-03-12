
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface MessageStep {
  id: number;
  type: string;
  content: string | null;
  delay: string | null;
}

export interface SavedWorkflow {
  id: number;
  name: string;
  sequence: MessageStep[];
}

export const useMessageSequence = () => {
  const { toast } = useToast();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const [editingStepData, setEditingStepData] = useState<MessageStep | null>(null);
  
  // Initial message sequence data
  const [sequence, setSequence] = useState<MessageStep[]>([
    {
      id: 1,
      type: 'email',
      content: 'Initial outreach email introducing our product',
      delay: null,
    },
    {
      id: 2,
      type: 'delay',
      content: null,
      delay: '3 days',
    },
    {
      id: 3,
      type: 'email',
      content: 'Follow-up email if no response',
      delay: null,
    },
    {
      id: 4,
      type: 'delay',
      content: null,
      delay: '4 days',
    },
    {
      id: 5,
      type: 'linkedin',
      content: 'LinkedIn connection request with personalized message',
      delay: null,
    },
    {
      id: 6,
      type: 'delay',
      content: null,
      delay: '5 days',
    },
    {
      id: 7,
      type: 'call',
      content: 'Call to discuss potential fit',
      delay: null,
    },
  ]);
  
  // Saved workflows
  const [savedWorkflows, setSavedWorkflows] = useState<SavedWorkflow[]>([
    { id: 1, name: 'Standard Follow-up Sequence', sequence: [] },
    { id: 2, name: 'Cold Email Campaign', sequence: [] },
  ]);
  
  const handleAddStep = (type: string) => {
    const newStep = {
      id: Math.max(0, ...sequence.map(s => s.id)) + 1,
      type,
      content: type !== 'delay' ? '' : null,
      delay: type === 'delay' ? '1 day' : null,
    };
    
    setSequence([...sequence, newStep]);
    
    if (type !== 'delay') {
      setEditingStep(newStep.id);
      setEditingStepData(newStep);
    }
    
    toast({
      title: "Step added",
      description: `Added ${type} step to sequence.`,
    });
  };
  
  const handleEditStep = (step: MessageStep) => {
    setEditingStep(step.id);
    setEditingStepData({ ...step });
  };
  
  const handleUpdateStep = () => {
    if (!editingStepData) return;
    
    setSequence(sequence.map(step => 
      step.id === editingStep ? editingStepData : step
    ));
    
    setEditingStep(null);
    setEditingStepData(null);
    
    toast({
      title: "Step updated",
      description: "Message step has been updated.",
    });
  };
  
  const handleDeleteStep = (id: number) => {
    setSequence(sequence.filter(step => step.id !== id));
    
    toast({
      title: "Step removed",
      description: "Message step has been removed from sequence.",
    });
  };
  
  const handleMoveStep = (id: number, direction: 'up' | 'down') => {
    const index = sequence.findIndex(step => step.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === sequence.length - 1)
    ) {
      return;
    }
    
    const newSequence = [...sequence];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSequence[index], newSequence[targetIndex]] = [newSequence[targetIndex], newSequence[index]];
    
    setSequence(newSequence);
  };
  
  const handleSaveWorkflow = () => {
    if (!workflowName.trim()) {
      toast({
        title: "Validation error",
        description: "Please enter a name for your workflow.",
        variant: "destructive",
      });
      return;
    }
    
    const newWorkflow = {
      id: Math.max(0, ...savedWorkflows.map(w => w.id)) + 1,
      name: workflowName,
      sequence: [...sequence],
    };
    
    setSavedWorkflows([...savedWorkflows, newWorkflow]);
    setShowSaveDialog(false);
    setWorkflowName('');
    
    toast({
      title: "Workflow saved",
      description: `"${workflowName}" has been saved successfully.`,
    });
  };
  
  const handleLoadWorkflow = (id: number) => {
    const workflow = savedWorkflows.find(w => w.id === id);
    if (workflow) {
      setSequence(workflow.sequence.length > 0 ? workflow.sequence : sequence);
      setShowLoadDialog(false);
      
      toast({
        title: "Workflow loaded",
        description: `"${workflow.name}" has been loaded.`,
      });
    }
  };

  return {
    sequence,
    editingStep,
    editingStepData,
    showSaveDialog,
    showLoadDialog,
    workflowName,
    savedWorkflows,
    setWorkflowName,
    setShowSaveDialog,
    setShowLoadDialog,
    setEditingStep,
    setEditingStepData,
    handleAddStep,
    handleEditStep,
    handleUpdateStep,
    handleDeleteStep,
    handleMoveStep,
    handleSaveWorkflow,
    handleLoadWorkflow
  };
};
