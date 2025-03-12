
import React from 'react';
import { MessageStep } from '../../hooks/sequenceTypes';
import { 
  SaveWorkflowDialog, 
  LoadWorkflowDialog 
} from '../dialogs/WorkflowDialogs';
import StepEditDialog from './StepEditDialog';

interface WorkflowDialogsProps {
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
  savedWorkflows: any[];
  onSaveWorkflow: () => void;
  onLoadWorkflow: (id: number) => void;
  onSaveStep: () => void;
}

const WorkflowDialogs: React.FC<WorkflowDialogsProps> = ({
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
  onSaveWorkflow,
  onLoadWorkflow,
  onSaveStep
}) => {
  return (
    <>
      {/* Step edit dialog */}
      <StepEditDialog 
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        editingStep={editingStep}
        onEditingStepChange={setEditingStep}
        onSave={onSaveStep}
      />
      
      {/* Save workflow dialog */}
      <SaveWorkflowDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        workflowName={workflowName}
        setWorkflowName={setWorkflowName}
        onSave={onSaveWorkflow}
      />
      
      {/* Load workflow dialog */}
      <LoadWorkflowDialog
        open={showLoadDialog}
        onOpenChange={setShowLoadDialog}
        savedWorkflows={savedWorkflows}
        onLoad={onLoadWorkflow}
      />
    </>
  );
};

export default WorkflowDialogs;
