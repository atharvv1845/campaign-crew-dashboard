
import React from 'react';
import MessageStepCard from './MessageStepCard';
import { MessageStep } from '../hooks/useMessageSequence';

interface SequenceListProps {
  sequence: MessageStep[];
  onEdit: (step: MessageStep) => void;
  onDelete: (id: number) => void;
  onMove: (id: number, direction: 'up' | 'down') => void;
}

const SequenceList: React.FC<SequenceListProps> = ({
  sequence,
  onEdit,
  onDelete,
  onMove
}) => {
  return (
    <div className="grid grid-cols-5 gap-4 p-2 text-sm font-medium text-muted-foreground">
      <div>Step</div>
      <div>Channel</div>
      <div className="col-span-2">Message / Delay</div>
      <div>Actions</div>
      
      <div className="col-span-5 relative">
        <div className="space-y-3">
          {sequence.map((step, index) => (
            <MessageStepCard
              key={step.id}
              step={step}
              index={index}
              totalSteps={sequence.length}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SequenceList;
