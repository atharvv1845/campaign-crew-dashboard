
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save } from 'lucide-react';
import FlowStepDialog from './FlowStepDialog';
import FlowVisualization from './FlowVisualization';
import { FlowStep } from '../OutreachFlow';
import { MessageScript } from '../MessageTemplates';

interface FlowBuilderProps {
  flowSteps: FlowStep[];
  onAddStep: (step: FlowStep) => void;
  onUpdateStep: (step: FlowStep) => void;
  onDeleteStep: (id: number) => void;
  onSaveFlow: () => void;
  templates: MessageScript[];
  isLoading: boolean;
}

const FlowBuilder: React.FC<FlowBuilderProps> = ({
  flowSteps,
  onAddStep,
  onUpdateStep,
  onDeleteStep,
  onSaveFlow,
  templates,
  isLoading
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState<FlowStep | null>(null);

  const handleOpenAddDialog = () => {
    setCurrentStep({
      id: 0,
      type: 'message',
      platform: 'email',
      content: '',
      subject: '',
    });
    setShowDialog(true);
  };

  const handleEditStep = (step: FlowStep) => {
    setCurrentStep(step);
    setShowDialog(true);
  };

  const handleSaveStep = (step: FlowStep) => {
    if (step.id === 0) {
      onAddStep(step);
    } else {
      onUpdateStep(step);
    }
    setShowDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Visual Flow Builder</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleOpenAddDialog}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Step
          </Button>
          <Button onClick={onSaveFlow}>
            <Save className="h-4 w-4 mr-2" />
            Save Flow
          </Button>
        </div>
      </div>

      {flowSteps.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-md">
          <p className="text-muted-foreground mb-4">
            Your outreach flow is empty. Add your first step to get started.
          </p>
          <Button onClick={handleOpenAddDialog}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add First Step
          </Button>
        </div>
      ) : (
        <FlowVisualization 
          steps={flowSteps} 
          onEditStep={handleEditStep} 
          onDeleteStep={onDeleteStep} 
        />
      )}

      {showDialog && currentStep && (
        <FlowStepDialog 
          open={showDialog}
          onOpenChange={setShowDialog}
          step={currentStep}
          onSave={handleSaveStep}
          templates={templates}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default FlowBuilder;
