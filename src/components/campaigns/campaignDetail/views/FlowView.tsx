
import React from 'react';
import SequenceList from '../components/SequenceList';
import StepActionButtons from '../components/StepActionButtons';
import { MessageStep } from '../hooks/sequenceTypes';

interface FlowViewProps {
  sequence: MessageStep[];
  onEdit: (step: MessageStep) => void;
  onDelete: (id: number) => void;
  onMove: (id: number, direction: 'up' | 'down') => void;
  onAddStep: (type: string) => void;
}

const FlowView: React.FC<FlowViewProps> = ({
  sequence,
  onEdit,
  onDelete,
  onMove,
  onAddStep
}) => {
  return (
    <div className="space-y-4">
      <SequenceList 
        sequence={sequence}
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
      />
      
      <StepActionButtons onAddStep={onAddStep} />
    </div>
  );
};

export default FlowView;
