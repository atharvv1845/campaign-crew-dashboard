
import React from 'react';
import SequenceList from '../components/SequenceList';
import StepActionButtons from '../components/StepActionButtons';
import { MessageStep } from '../hooks/sequenceTypes';
import { toast } from '@/hooks/use-toast';

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
  const handleDelete = (id: number) => {
    if (sequence.length <= 1) {
      toast({
        title: "Warning",
        description: "Cannot delete the last step in the sequence.",
        variant: "destructive"
      });
      return;
    }
    
    onDelete(id);
  };

  const handleAddStep = (type: string) => {
    console.log("Adding new step of type:", type);
    onAddStep(type);
  };

  return (
    <div className="space-y-4">
      <SequenceList 
        sequence={sequence}
        onEdit={onEdit}
        onDelete={handleDelete}
        onMove={onMove}
      />
      
      <StepActionButtons onAddStep={handleAddStep} />
    </div>
  );
};

export default FlowView;
