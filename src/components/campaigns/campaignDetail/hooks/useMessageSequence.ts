
import { useSequenceState } from './useSequenceState';
import { useStepOperations } from './useStepOperations';
import { useWorkflowOperations } from './useWorkflowOperations';
import { MessageStep, SavedWorkflow } from './sequenceTypes';

export { type MessageStep, type SavedWorkflow };

export const useMessageSequence = () => {
  const {
    sequence,
    setSequence,
    editingStep,
    setEditingStep,
    editingStepData,
    setEditingStepData,
    showSaveDialog,
    setShowSaveDialog,
    showLoadDialog,
    setShowLoadDialog,
    workflowName,
    setWorkflowName,
    savedWorkflows,
    setSavedWorkflows
  } = useSequenceState();

  const {
    handleAddStep,
    handleEditStep,
    handleUpdateStep,
    handleDeleteStep,
    handleMoveStep
  } = useStepOperations(
    sequence, 
    setSequence, 
    editingStep, // Pass editingStep as parameter
    setEditingStep, 
    editingStepData, // Pass editingStepData as parameter
    setEditingStepData
  );

  const {
    handleSaveWorkflow,
    handleLoadWorkflow
  } = useWorkflowOperations(
    sequence,
    setSequence,
    workflowName,
    setWorkflowName,
    savedWorkflows,
    setSavedWorkflows,
    setShowSaveDialog,
    setShowLoadDialog
  );

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
