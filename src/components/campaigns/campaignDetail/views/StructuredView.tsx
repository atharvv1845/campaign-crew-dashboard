
import React from 'react';
import StructuredMessageWorkflow from '../StructuredMessageWorkflow';
import { MessageStep } from '../hooks/sequenceTypes';

interface StructuredViewProps {
  steps: MessageStep[];
  onUpdateSteps: (steps: MessageStep[]) => void;
}

const StructuredView: React.FC<StructuredViewProps> = ({
  steps,
  onUpdateSteps
}) => {
  const handleUpdateSteps = (newSteps: MessageStep[]) => {
    console.log("StructuredView updating steps:", newSteps.length);
    // Ensure all steps have valid IDs
    newSteps.forEach((step, index) => {
      step.id = step.id || index + 1;
    });
    
    // Update steps in parent component
    onUpdateSteps(newSteps);
  };

  return (
    <StructuredMessageWorkflow 
      steps={steps}
      onUpdateSteps={handleUpdateSteps}
    />
  );
};

export default StructuredView;
