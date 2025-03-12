
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SequenceHeader from './components/SequenceHeader';
import { SaveWorkflowDialog, LoadWorkflowDialog } from './components/WorkflowDialogs';
import { useMessageSequence } from './hooks/useMessageSequence';
import StructuredView from './views/StructuredView';
import FlowView from './views/FlowView';
import EditStepDialog from './components/EditStepDialog';

const MessageSequence: React.FC = () => {
  const [activeTab, setActiveTab] = useState('structured');
  
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="structured">Structured View</TabsTrigger>
          <TabsTrigger value="flow">Flow View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="structured" className="mt-4">
          <StructuredView 
            steps={sequence}
            onUpdateSteps={(newSteps) => {
              newSteps.forEach((step, index) => {
                step.id = step.id || index + 1;
              });
              sequence.splice(0, sequence.length, ...newSteps);
            }}
          />
        </TabsContent>
        
        <TabsContent value="flow" className="mt-4">
          <FlowView 
            sequence={sequence}
            onEdit={handleEditStep}
            onDelete={handleDeleteStep}
            onMove={handleMoveStep}
            onAddStep={handleAddStep}
          />
        </TabsContent>
      </Tabs>
      
      {/* Edit Step Dialog */}
      <EditStepDialog
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
