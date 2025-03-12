
import { useState } from 'react';
import { MessageStep } from './sequenceTypes';
import { useWorkflowDialogs } from './useWorkflowDialogs';
import { useStepActions } from './useStepActions';

export const useStructuredWorkflow = (
  steps: MessageStep[],
  onUpdateSteps: (steps: MessageStep[]) => void
) => {
  const [editingStep, setEditingStep] = useState<MessageStep | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const {
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
    handleLoadWorkflow,
    handleAddStep,
    handleEditStep,
    handleSaveStep,
    handleDeleteStep,
    handleMoveStep
  };
};
