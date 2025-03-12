
import React from 'react';
import { MessageStep } from './hooks/sequenceTypes';
import { useWorkflowDialogs } from './hooks/useWorkflowDialogs';
import { useStepActions } from './hooks/useStepActions';
import { 
  WorkflowHeader, 
  WorkflowStepTable, 
  AddStepButtons, 
  StepEditDialog 
} from './components/structuredWorkflow';
import { 
  SaveWorkflowDialog, 
  LoadWorkflowDialog 
} from './components/dialogs/WorkflowDialogs';

interface StructuredMessageWorkflowProps {
  steps: MessageStep[];
  onUpdateSteps: (steps: MessageStep[]) => void;
}

const StructuredMessageWorkflow: React.FC<StructuredMessageWorkflowProps> = ({ 
  steps, 
  onUpdateSteps 
}) => {
  const {
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
  } = useWorkflowDialogs(steps, onUpdateSteps);

  const {
    handleAddStep,
    handleEditStep,
    handleSaveStep,
    handleDeleteStep,
    handleMoveStep
  } = useStepActions(
    steps,
    onUpdateSteps,
    editingStep,
    setEditingStep,
    setShowEditDialog
  );

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <WorkflowHeader 
        onSaveClick={() => setShowSaveDialog(true)}
        onLoadClick={() => setShowLoadDialog(true)}
      />
      
      {/* Message workflow table */}
      <WorkflowStepTable 
        steps={steps}
        onEditStep={handleEditStep}
        onDeleteStep={handleDeleteStep}
        onMoveStep={handleMoveStep}
      />
      
      {/* Add step buttons */}
      <AddStepButtons onAddStep={handleAddStep} />
      
      {/* Step edit dialog */}
      <StepEditDialog 
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        editingStep={editingStep}
        onEditingStepChange={setEditingStep}
        onSave={handleSaveStep}
      />
      
      {/* Save workflow dialog */}
      <SaveWorkflowDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        workflowName={workflowName}
        setWorkflowName={setWorkflowName}
        onSave={handleSaveWorkflow}
      />
      
      {/* Load workflow dialog */}
      <LoadWorkflowDialog
        open={showLoadDialog}
        onOpenChange={setShowLoadDialog}
        savedWorkflows={savedWorkflows}
        onLoad={handleLoadWorkflow}
      />
    </div>
  );
};

export default StructuredMessageWorkflow;
