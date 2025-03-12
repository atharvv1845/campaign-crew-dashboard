
import React from 'react';
import { MessageStep } from '../../hooks/sequenceTypes';
import WorkflowStepTable from './WorkflowStepTable';
import AddStepButtons from './AddStepButtons';

interface WorkflowContentProps {
  steps: MessageStep[];
  onAddStep: (type: string) => void;
  onEditStep: (step: MessageStep) => void;
  onDeleteStep: (id: number) => void;
  onMoveStep: (id: number, direction: 'up' | 'down') => void;
}

const WorkflowContent: React.FC<WorkflowContentProps> = ({ 
  steps, 
  onAddStep,
  onEditStep,
  onDeleteStep,
  onMoveStep
}) => {
  return (
    <div className="space-y-6">
      {/* Message workflow table */}
      <WorkflowStepTable 
        steps={steps}
        onEditStep={onEditStep}
        onDeleteStep={onDeleteStep}
        onMoveStep={onMoveStep}
      />
      
      {/* Add step buttons */}
      <AddStepButtons onAddStep={onAddStep} />
    </div>
  );
};

export default WorkflowContent;
