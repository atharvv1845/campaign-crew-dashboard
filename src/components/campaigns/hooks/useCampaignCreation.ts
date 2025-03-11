
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { CampaignFormData, defaultStages } from '../types/campaignTypes';
import { campaignData } from '../campaignData';

export const useCampaignCreation = (onClose: () => void) => {
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
    leads: [],
    messageFlow: { nodes: [], edges: [] },
    stepFlows: {},
  });
  const [exitAnimation, setExitAnimation] = useState(false);

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Move to the next step
  const nextStep = () => {
    if (currentStep < 6) {
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
    // Create a new campaign object for the campaign list
    const newCampaign = {
      id: campaignData.length + 1,
      name: formData.name,
      status: 'Active',
      type: 'Email', // Default type or could be derived from formData
      channels: formData.channels,
      leads: formData.leads.length,
      responses: 0,
      positive: 0,
      negative: 0,
      conversion: '0%',
      teamMembers: Object.values(formData.teamAssignments).flat(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Add it to the campaigns data
    campaignData.unshift(newCampaign);
    
    // Show success notification
    toast({
      title: 'Campaign Created',
      description: `${formData.name} campaign has been created successfully!`,
    });
    
    // Close the modal with animation
    handleClose();
    
    // Redirect to campaigns list after animation
    setTimeout(() => {
      navigate('/campaigns');
    }, 300);
  };

  // Close the wizard with animation
  const handleClose = () => {
    setExitAnimation(true);
    setTimeout(() => {
      onClose();
    }, 300);
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
