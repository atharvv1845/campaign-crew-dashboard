
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CampaignFormData, defaultStages } from '../types/campaignTypes';

// Enhanced hook for campaign creation wizard
const useCampaignCreation = (onClose?: () => void, existingCampaign?: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [exitAnimation, setExitAnimation] = useState(false);
  
  // Initialize with defaults or existing campaign data
  const initialFormData: CampaignFormData = existingCampaign || {
    name: '',
    description: '',
    channels: [],
    stages: defaultStages,
    teamAssignments: {},
    messages: {},
    notes: '',
    shareNotes: false,
    leads: [],
    messageFlow: {
      nodes: [],
      edges: []
    },
    stepFlows: {}
  };

  const [formData, setFormData] = useState<CampaignFormData>(initialFormData);

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Campaign created:', formData);
    
    // In a real app, you would save to the backend here
    
    // Close the modal with animation
    handleClose();
  };

  // Handle closing the modal with animation
  const handleClose = () => {
    setExitAnimation(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Match the duration of the exit animation
  };

  return {
    currentStep,
    formData,
    setFormData,
    nextStep,
    prevStep,
    handleSubmit,
    handleClose,
    exitAnimation
  };
};

export default useCampaignCreation;
