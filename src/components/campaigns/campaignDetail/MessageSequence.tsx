
import React from 'react';
import { Card } from '@/components/ui/card';
import SequenceHeader from './components/SequenceHeader';
import SequenceList from './components/SequenceList';
import StepActionButtons from './components/StepActionButtons';
import StepEditDialog from './components/StepEditDialog';
import { SaveWorkflowDialog, LoadWorkflowDialog } from './components/WorkflowDialogs';
import { useMessageSequence } from './hooks/useMessageSequence';

const MessageSequence: React.FC = () => {
  const {
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
  } = useMessageSequence();

  return (
    <div className="space-y-6">
      <SequenceHeader 
        onSaveClick={() => setShowSaveDialog(true)}
        onLoadClick={() => setShowLoadDialog(true)}
      />
      
      <div className="space-y-4">
        <SequenceList 
          sequence={sequence}
          onEdit={handleEditStep}
          onDelete={handleDeleteStep}
          onMove={handleMoveStep}
        />
        
        <StepActionButtons onAddStep={handleAddStep} />
      </div>
      
      {/* Edit Step Dialog */}
      <StepEditDialog
        open={editingStep !== null}
        onOpenChange={(open) => !open && setEditingStep(null)}
        editingStepData={editingStepData}
        setEditingStepData={setEditingStepData}
        onSave={handleUpdateStep}
      />
      
      {/* Save Workflow Dialog */}
      <SaveWorkflowDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        workflowName={workflowName}
        setWorkflowName={setWorkflowName}
        onSave={handleSaveWorkflow}
      />
      
      {/* Load Workflow Dialog */}
      <LoadWorkflowDialog
        open={showLoadDialog}
        onOpenChange={setShowLoadDialog}
        savedWorkflows={savedWorkflows}
        onLoad={handleLoadWorkflow}
      />
    </div>
  );
};

export default MessageSequence;
