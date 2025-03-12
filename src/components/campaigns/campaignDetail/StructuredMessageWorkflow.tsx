
import React from 'react';
import { useStructuredWorkflow } from './hooks/useStructuredWorkflow';
import { MessageStep } from './hooks/sequenceTypes';
import WorkflowHeader from './components/structuredWorkflow/WorkflowHeader';
import WorkflowContent from './components/structuredWorkflow/WorkflowContent';
import WorkflowDialogs from './components/structuredWorkflow/WorkflowDialogs';

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
    handleLoadWorkflow,
    handleAddStep,
    handleEditStep,
    handleSaveStep,
    handleDeleteStep,
    handleMoveStep
  } = useStructuredWorkflow(steps, onUpdateSteps);

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <WorkflowHeader 
        onSaveClick={() => setShowSaveDialog(true)}
        onLoadClick={() => setShowLoadDialog(true)}
      />
      
      {/* Workflow content (table and buttons) */}
      <WorkflowContent
        steps={steps}
        onAddStep={handleAddStep}
        onEditStep={handleEditStep}
        onDeleteStep={handleDeleteStep}
        onMoveStep={handleMoveStep}
      />
      
      {/* Dialogs */}
      <WorkflowDialogs
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        editingStep={editingStep}
        setEditingStep={setEditingStep}
        showSaveDialog={showSaveDialog}
        setShowSaveDialog={setShowSaveDialog}
        showLoadDialog={showLoadDialog}
        setShowLoadDialog={setShowLoadDialog}
        workflowName={workflowName}
        setWorkflowName={setWorkflowName}
        savedWorkflows={savedWorkflows}
        onSaveWorkflow={handleSaveWorkflow}
        onLoadWorkflow={handleLoadWorkflow}
        onSaveStep={handleSaveStep}
      />
    </div>
  );
};

export default StructuredMessageWorkflow;
