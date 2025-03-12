
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import useCampaignCreation from './hooks/useCampaignCreation';

// Import wizard steps
import CampaignSetup from './wizardSteps/CampaignSetup';
import LeadStages from './wizardSteps/LeadStages';
import TeamAssignment from './wizardSteps/TeamAssignment';
import ReviewLaunch from './wizardSteps/ReviewLaunch';
import WizardProgress from './wizardSteps/WizardProgress';
import LeadImport from './wizardSteps/LeadImport';
import MessageFlow from './wizardSteps/MessageFlow';

// Re-export types for backward compatibility
export { type CampaignFormData, type LeadData, type FlowData } from './types/campaignTypes';
export { availableChannels } from './constants/channels';

interface CreateCampaignProps {
  onClose: () => void;
  existingCampaign?: any; // For edit mode
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({ onClose, existingCampaign }) => {
  const {
    currentStep,
    formData,
    setFormData,
    nextStep,
    prevStep,
    handleSubmit,
    handleClose,
    exitAnimation
  } = useCampaignCreation(onClose, existingCampaign);

  // Prevent closing when clicking outside by stopping event propagation
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Array of step components to display
  const steps = [
    <CampaignSetup
      formData={formData}
      setFormData={setFormData}
      onNext={() => nextStep()}
    />,
    <LeadImport
      formData={formData}
      setFormData={setFormData}
      onNext={() => nextStep()}
      onBack={() => prevStep()}
    />,
    <MessageFlow
      formData={formData}
      setFormData={setFormData}
      onNext={() => nextStep()}
      onBack={() => prevStep()}
    />,
    <LeadStages
      formData={formData}
      setFormData={setFormData}
      onNext={() => nextStep()}
      onBack={() => prevStep()}
    />,
    <TeamAssignment
      formData={formData}
      setFormData={setFormData}
      onNext={() => nextStep()}
      onBack={() => prevStep()}
    />,
    <ReviewLaunch
      formData={formData}
      onSubmit={handleSubmit}
      onBack={() => prevStep()}
    />,
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out">
      <div 
        className={cn(
          "relative bg-card w-full max-w-4xl max-h-[90vh] rounded-xl shadow-lg transition-all duration-300",
          exitAnimation ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
        onClick={handleModalClick} // Stop propagation
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-semibold">
            {existingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
          </h2>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-muted/50 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress indicator */}
        <WizardProgress currentStep={currentStep} totalSteps={6} />

        {/* Step content with scroll */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)]">
          {steps[currentStep - 1]}
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
