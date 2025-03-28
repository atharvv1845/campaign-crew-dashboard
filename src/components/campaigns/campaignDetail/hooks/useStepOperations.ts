
import { useToast } from "@/hooks/use-toast";
import { MessageStep } from './sequenceTypes';

export const useStepOperations = (
  sequence: MessageStep[], 
  setSequence: React.Dispatch<React.SetStateAction<MessageStep[]>>,
  editingStep: number | null, // Added editingStep as a parameter
  setEditingStep: React.Dispatch<React.SetStateAction<number | null>>,
  editingStepData: MessageStep | null, // Added editingStepData as a parameter
  setEditingStepData: React.Dispatch<React.SetStateAction<MessageStep | null>>
) => {
  const { toast } = useToast();

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
    // Now we can use editingStepData and editingStep directly since they're parameters
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

  return {
    handleAddStep,
    handleEditStep,
    handleUpdateStep,
    handleDeleteStep,
    handleMoveStep
  };
};
