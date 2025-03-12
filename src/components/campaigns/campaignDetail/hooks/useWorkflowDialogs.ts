
import { useState } from 'react';
import { MessageStep } from './sequenceTypes';
import { useToast } from '@/hooks/use-toast';

interface WorkflowDialogHook {
  showEditDialog: boolean;
  setShowEditDialog: (show: boolean) => void;
  editingStep: MessageStep | null;
  setEditingStep: (step: MessageStep | null) => void;
  showSaveDialog: boolean;
  setShowSaveDialog: (show: boolean) => void;
  showLoadDialog: boolean;
  setShowLoadDialog: (show: boolean) => void;
  workflowName: string;
  setWorkflowName: (name: string) => void;
  savedWorkflows: { id: number; name: string; steps: MessageStep[] }[];
  setSavedWorkflows: React.Dispatch<React.SetStateAction<{ id: number; name: string; steps: MessageStep[] }[]>>;
  handleSaveWorkflow: () => void;
  handleLoadWorkflow: (id: number) => void;
}

export const useWorkflowDialogs = (
  steps: MessageStep[],
  onUpdateSteps: (steps: MessageStep[]) => void
): WorkflowDialogHook => {
  const { toast } = useToast();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingStep, setEditingStep] = useState<MessageStep | null>(null);
  const [savedWorkflows, setSavedWorkflows] = useState<{ id: number; name: string; steps: MessageStep[] }[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [workflowName, setWorkflowName] = useState('');

  const handleSaveWorkflow = () => {
    if (!workflowName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide a name for this workflow.",
        variant: "destructive"
      });
      return;
    }
    
    const newWorkflow = {
      id: Math.max(0, ...savedWorkflows.map(w => w.id)) + 1,
      name: workflowName,
      steps: [...steps]
    };
    
    setSavedWorkflows([...savedWorkflows, newWorkflow]);
    setShowSaveDialog(false);
    setWorkflowName('');
    
    toast({
      title: "Workflow Saved",
      description: `"${workflowName}" workflow has been saved successfully.`
    });
  };

  const handleLoadWorkflow = (id: number) => {
    const workflow = savedWorkflows.find(w => w.id === id);
    if (workflow) {
      onUpdateSteps([...workflow.steps]);
      setShowLoadDialog(false);
      
      toast({
        title: "Workflow Loaded",
        description: `"${workflow.name}" workflow has been loaded.`
      });
    }
  };

  return {
    showEditDialog,
    setShowEditDialog,
    editingStep,
    setEditingStep,
    showSaveDialog,
    setShowSaveDialog,
    showLoadDialog, 
    setShowLoadDialog,
    workflowName,
    setWorkflowName,
    savedWorkflows,
    setSavedWorkflows,
    handleSaveWorkflow,
    handleLoadWorkflow
  };
};
