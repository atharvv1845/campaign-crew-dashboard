
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CampaignSetup from './wizardSteps/CampaignSetup';
import LeadStages from './wizardSteps/LeadStages';
import TeamAssignment from './wizardSteps/TeamAssignment';
import MessageSequence from './wizardSteps/MessageSequence';
import ReviewLaunch from './wizardSteps/ReviewLaunch';
import WizardProgress from './wizardSteps/WizardProgress';

// Define the campaign data structure
export interface CampaignFormData {
  name: string;
  description: string;
  channels: string[];
  stages: { id: string; name: string; order: number }[];
  teamAssignments: Record<string, string[]>;
  messages: Record<string, string>;
  notes: string;
  shareNotes: boolean;
}

// Available channels for outreach
export const availableChannels = [
  { id: 'email', name: 'Email' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'twitter', name: 'Twitter' },
  { id: 'whatsapp', name: 'WhatsApp' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'facebook', name: 'Facebook' },
];

// Default stages for the campaign
const defaultStages = [
  { id: '1', name: 'Not Contacted', order: 1 },
  { id: '2', name: 'Contacted', order: 2 },
  { id: '3', name: 'Follow-Up Needed', order: 3 },
  { id: '4', name: 'Positive Response', order: 4 },
  { id: '5', name: 'Converted', order: 5 },
];

const CreateCampaign: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    description: '',
    channels: [],
    stages: [...defaultStages],
    teamAssignments: {},
    messages: {},
    notes: '',
    shareNotes: false,
  });

  // Array of step components to display
  const steps = [
    <CampaignSetup
      formData={formData}
      setFormData={setFormData}
      onNext={() => nextStep()}
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
    <MessageSequence
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

  // Move to the next step
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Move to the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // In a real app, you would send this data to your backend
    console.log('Campaign created:', formData);
    
    // Show success notification
    toast({
      title: 'Campaign Created',
      description: `${formData.name} campaign has been created successfully!`,
    });
    
    // Redirect to campaigns list
    navigate('/campaigns');
  };

  // Close the wizard
  const handleClose = () => {
    // You might want to show a confirmation dialog if there are unsaved changes
    navigate('/campaigns');
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative bg-card w-full max-w-4xl rounded-xl shadow-lg">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Create New Campaign</h2>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-muted/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress indicator */}
        <WizardProgress currentStep={currentStep} totalSteps={5} />

        {/* Step content */}
        <div className="p-6">
          {steps[currentStep - 1]}
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
