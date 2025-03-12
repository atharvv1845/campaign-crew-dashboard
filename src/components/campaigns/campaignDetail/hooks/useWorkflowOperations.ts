
import { useToast } from "@/hooks/use-toast";
import { MessageStep, SavedWorkflow } from './sequenceTypes';

export const useWorkflowOperations = (
  sequence: MessageStep[],
  setSequence: React.Dispatch<React.SetStateAction<MessageStep[]>>,
  workflowName: string,
  setWorkflowName: React.Dispatch<React.SetStateAction<string>>,
  savedWorkflows: SavedWorkflow[],
  setSavedWorkflows: React.Dispatch<React.SetStateAction<SavedWorkflow[]>>,
  setShowSaveDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setShowLoadDialog: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

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
    handleSaveWorkflow,
    handleLoadWorkflow
  };
};
