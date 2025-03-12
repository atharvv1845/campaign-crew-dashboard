
import { MessageStep } from './sequenceTypes';
import { useToast } from '@/hooks/use-toast';

interface UseStepActionsResult {
  handleAddStep: (type: string) => void;
  handleEditStep: (step: MessageStep) => void;
  handleSaveStep: () => void;
  handleDeleteStep: (id: number) => void;
  handleMoveStep: (id: number, direction: 'up' | 'down') => void;
}

export const useStepActions = (
  steps: MessageStep[],
  onUpdateSteps: (steps: MessageStep[]) => void,
  editingStep: MessageStep | null,
  setEditingStep: (step: MessageStep | null) => void,
  setShowEditDialog: (show: boolean) => void
): UseStepActionsResult => {
  const { toast } = useToast();

  const handleAddStep = (type: string) => {
    const newStep: MessageStep = {
      id: Math.max(0, ...steps.map(s => Number(s.id))) + 1,
      type: type !== 'delay' ? type : 'delay',
      content: type !== 'delay' ? '' : null,
      delay: type === 'delay' ? '1 day' : null,
      assignedTo: '',
    };
    
    setEditingStep(newStep);
    setShowEditDialog(true);
  };

  const handleEditStep = (step: MessageStep) => {
    setEditingStep({ ...step });
    setShowEditDialog(true);
  };

  const handleSaveStep = () => {
    if (!editingStep) return;
    
    // Validate required fields
    if (editingStep.type !== 'delay' && !editingStep.content) {
      toast({
        title: "Validation Error",
        description: "Message content is required",
        variant: "destructive"
      });
      return;
    }
    
    // Check if this is an edit or new step
    const existingStepIndex = steps.findIndex(s => s.id === editingStep.id);
    
    if (existingStepIndex >= 0) {
      // Update existing step
      const updatedSteps = [...steps];
      updatedSteps[existingStepIndex] = editingStep;
      onUpdateSteps(updatedSteps);
    } else {
      // Add new step
      onUpdateSteps([...steps, editingStep]);
    }
    
    setShowEditDialog(false);
    setEditingStep(null);
    
    toast({
      title: existingStepIndex >= 0 ? "Step Updated" : "Step Added",
      description: existingStepIndex >= 0 
        ? "Message step has been updated successfully."
        : "New message step has been added to the workflow."
    });
  };

  const handleDeleteStep = (id: number) => {
    onUpdateSteps(steps.filter(step => step.id !== id));
    toast({
      title: "Step Deleted",
      description: "Message step has been removed from the workflow."
    });
  };

  const handleMoveStep = (id: number, direction: 'up' | 'down') => {
    const stepIndex = steps.findIndex(s => s.id === id);
    if ((direction === 'up' && stepIndex <= 0) || 
        (direction === 'down' && stepIndex >= steps.length - 1)) {
      return;
    }
    
    const updatedSteps = [...steps];
    const targetIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;
    [updatedSteps[stepIndex], updatedSteps[targetIndex]] = [updatedSteps[targetIndex], updatedSteps[stepIndex]];
    
    onUpdateSteps(updatedSteps);
  };

  return {
    handleAddStep,
    handleEditStep,
    handleSaveStep,
    handleDeleteStep,
    handleMoveStep
  };
};
