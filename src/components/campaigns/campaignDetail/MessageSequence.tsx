
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import StructuredView from './views/StructuredView';
import FlowView from './views/FlowView';
import { useMessageSequence } from './hooks/useMessageSequence';

interface MessageSequenceProps {
  campaign: any;
  updateCampaign?: (data: any) => void;
}

const MessageSequence: React.FC<MessageSequenceProps> = ({ campaign, updateCampaign }) => {
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Message Sequence</h2>
        <Button onClick={() => handleAddStep('email')}>
          <Plus className="h-4 w-4 mr-1" />
          Add Message
        </Button>
      </div>
      
      <Tabs defaultValue="structured">
        <TabsList>
          <TabsTrigger value="structured">Structured View</TabsTrigger>
          <TabsTrigger value="flow">Flow View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="structured">
          <StructuredView 
            steps={sequence} 
            onUpdateSteps={(newSteps) => setEditingStepData(null)}
            campaign={campaign}
            updateCampaign={updateCampaign}
          />
        </TabsContent>
        
        <TabsContent value="flow">
          <FlowView 
            sequence={sequence}
            onEdit={handleEditStep}
            onDelete={handleDeleteStep}
            onMove={handleMoveStep}
            onAddStep={handleAddStep}
            campaign={campaign}
            updateCampaign={updateCampaign}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessageSequence;
