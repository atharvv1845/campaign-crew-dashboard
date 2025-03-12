
import React from 'react';
import StructuredMessageWorkflow from '../StructuredMessageWorkflow';
import { MessageStep } from '../hooks/sequenceTypes';

interface StructuredViewProps {
  steps: MessageStep[];
  onUpdateSteps: (steps: MessageStep[]) => void;
  campaign?: any;
  updateCampaign?: (data: any) => void;
}

const StructuredView: React.FC<StructuredViewProps> = ({
  steps,
  onUpdateSteps,
  campaign,
  updateCampaign
}) => {
  const handleUpdateSteps = (newSteps: MessageStep[]) => {
    console.log("StructuredView updating steps:", newSteps.length);
    
    // Create a deep copy of steps to avoid reference issues
    const updatedSteps = newSteps.map(step => ({
      ...step,
      id: step.id || Math.floor(Math.random() * 1000) // Ensure all steps have valid IDs
    }));
    
    // Update steps in parent component
    onUpdateSteps(updatedSteps);
  };

  return (
    <StructuredMessageWorkflow 
      steps={steps}
      onUpdateSteps={handleUpdateSteps}
    />
  );
};

export default StructuredView;
