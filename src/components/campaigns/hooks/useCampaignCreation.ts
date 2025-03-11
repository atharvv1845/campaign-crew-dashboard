
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { CampaignFormData, defaultStages } from '../types/campaignTypes';
import { campaignData } from '../campaignData';

export const useCampaignCreation = (onClose: () => void, existingCampaign?: any) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CampaignFormData>(() => {
    if (existingCampaign) {
      return {
        name: existingCampaign.name || '',
        description: existingCampaign.description || '',
        channels: existingCampaign.channels || [],
        stages: existingCampaign.stages || [...defaultStages],
        teamAssignments: existingCampaign.teamAssignments || {},
        messages: existingCampaign.messages || {},
        notes: existingCampaign.notes || '',
        shareNotes: existingCampaign.shareNotes || false,
        leads: existingCampaign.leads || [],
        messageFlow: existingCampaign.messageFlow || { nodes: [], edges: [] },
        stepFlows: existingCampaign.stepFlows || {},
      };
    }
    
    return {
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
    };
  });
  const [exitAnimation, setExitAnimation] = useState(false);

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

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (existingCampaign) {
      const campaignIndex = campaignData.findIndex(c => c.id === existingCampaign.id);
      if (campaignIndex !== -1) {
        // Update the existing campaign
        campaignData[campaignIndex] = {
          ...campaignData[campaignIndex],
          name: formData.name,
          channels: formData.channels,
          leads: formData.leads.length,
          teamMembers: Object.values(formData.teamAssignments).flat(),
          description: formData.description // Make sure description is updated
        };
        
        toast({
          title: 'Campaign Updated',
          description: `${formData.name} campaign has been updated successfully!`,
        });
      }
    } else {
      // Create a new campaign
      const newCampaign = {
        id: campaignData.length + 1,
        name: formData.name,
        status: 'Active',
        type: 'Email',
        channels: formData.channels,
        leads: formData.leads.length,
        responses: 0,
        positive: 0,
        negative: 0,
        conversion: '0%',
        teamMembers: Object.values(formData.teamAssignments).flat(),
        createdAt: new Date().toISOString().split('T')[0],
        description: formData.description // Add description property
      };

      campaignData.unshift(newCampaign);
      
      toast({
        title: 'Campaign Created',
        description: `${formData.name} campaign has been created successfully!`,
      });
    }
    
    handleClose();
    
    setTimeout(() => {
      navigate('/campaigns');
    }, 300);
  };

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
