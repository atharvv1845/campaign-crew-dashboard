
import React from 'react';
import { WorkflowActionButtons } from './WorkflowDialogs';

interface SequenceHeaderProps {
  onSaveClick: () => void;
  onLoadClick: () => void;
}

const SequenceHeader: React.FC<SequenceHeaderProps> = ({ 
  onSaveClick, 
  onLoadClick 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Message Sequence</h2>
      <WorkflowActionButtons 
        onSaveClick={onSaveClick}
        onLoadClick={onLoadClick}
      />
    </div>
  );
};

export default SequenceHeader;
