
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save, Mail, Clock, AlertCircle } from 'lucide-react';
import FlowStepDialog from './FlowStepDialog';
import SequenceStepList from './SequenceStepList';
import { FlowStep } from '../OutreachFlow';
import { MessageScript } from '../MessageTemplates';

interface SequenceEditorProps {
  steps: FlowStep[];
  onAddStep: (step: FlowStep) => void;
  onUpdateStep: (step: FlowStep) => void;
  onDeleteStep: (id: number) => void;
  onReorderStep: (id: number, direction: 'up' | 'down') => void;
  onSaveFlow: () => void;
  templates: MessageScript[];
  isLoading: boolean;
}

const SequenceEditor: React.FC<SequenceEditorProps> = ({
  steps,
  onAddStep,
  onUpdateStep,
  onDeleteStep,
  onReorderStep,
  onSaveFlow,
  templates,
  isLoading
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [stepType, setStepType] = useState<'message' | 'delay' | 'condition'>('message');
  const [currentStep, setCurrentStep] = useState<FlowStep | null>(null);

  const handleAddStepClick = (type: 'message' | 'delay' | 'condition') => {
    setStepType(type);
    
    // Create initial data for each step type
    let initialData: FlowStep = {
      id: 0,
      type: type
    };
    
    if (type === 'message') {
      initialData = {
        ...initialData,
        platform: 'email',
        content: '',
        subject: ''
      };
    } else if (type === 'delay') {
      initialData = {
        ...initialData,
        delay: '1 day'
      };
    } else if (type === 'condition') {
      initialData = {
        ...initialData,
        condition: 'noreply'
      };
    }
    
    setCurrentStep(initialData);
    setShowDialog(true);
  };

  const handleEditStep = (step: FlowStep) => {
    setStepType(step.type as any);
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
        <h3 className="text-lg font-medium">Sequence Editor</h3>
        <Button onClick={onSaveFlow}>
          <Save className="h-4 w-4 mr-2" />
          Save Flow
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground mr-1 flex items-center">Add step:</span>
        <Button size="sm" variant="outline" onClick={() => handleAddStepClick('message')}>
          <Mail className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleAddStepClick('delay')}>
          <Clock className="h-4 w-4 mr-2" />
          Delay
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleAddStepClick('condition')}>
          <AlertCircle className="h-4 w-4 mr-2" />
          Condition
        </Button>
      </div>

      {steps.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-md">
          <p className="text-muted-foreground mb-4">
            Your outreach sequence is empty. Add steps using the buttons above.
          </p>
        </div>
      ) : (
        <SequenceStepList 
          steps={steps} 
          onEditStep={handleEditStep} 
          onDeleteStep={onDeleteStep}
          onReorderStep={onReorderStep}
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

export default SequenceEditor;
