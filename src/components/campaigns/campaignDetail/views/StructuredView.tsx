
import React from 'react';
import StructuredMessageWorkflow from '../StructuredMessageWorkflow';
import { MessageStep } from '../hooks/useMessageSequence';

interface StructuredViewProps {
  steps: MessageStep[];
  onUpdateSteps: (steps: MessageStep[]) => void;
}

const StructuredView: React.FC<StructuredViewProps> = ({
  steps,
  onUpdateSteps
}) => {
  return (
    <StructuredMessageWorkflow 
      steps={steps}
      onUpdateSteps={onUpdateSteps}
    />
  );
};

export default StructuredView;
