
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CampaignFormData } from '../types/campaignTypes';
import { campaignData } from '../campaignData';

// Default empty form data
const defaultFormData: CampaignFormData = {
  name: '',
  description: '',
  channels: [],
  leads: [],
  flows: [],
  stages: [
    { id: "1", name: "New Lead", description: "Initial outreach not yet started", color: "bg-blue-500" },
    { id: "2", name: "Contacted", description: "First contact made", color: "bg-purple-500" },
    { id: "3", name: "Interested", description: "Showed interest", color: "bg-green-500" },
    { id: "4", name: "Meeting", description: "Meeting scheduled", color: "bg-yellow-500" },
    { id: "5", name: "Qualified", description: "Ready for opportunity", color: "bg-orange-500" }
  ],
  team: [],
  messageFlow: {
    nodes: [],
    edges: []
  },
  teamAssignments: {}
};

const useCampaignCreation = (onClose: (campaign?: CampaignFormData) => void, existingCampaign?: any) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CampaignFormData>(defaultFormData);
  const [exitAnimation, setExitAnimation] = useState(false);

  // Load existing campaign data if in edit mode
  useEffect(() => {
    if (existingCampaign) {
      // Transform the existing campaign data into the form data structure
      const transformedData: CampaignFormData = {
        name: existingCampaign.name || '',
        description: existingCampaign.description || '',
        channels: existingCampaign.channels?.map((c: string) => c.toLowerCase()) || [],
        leads: [], // We would need to fetch leads data
        flows: [], // We would need to fetch message flow data
        stages: existingCampaign.stages || defaultFormData.stages, 
        team: existingCampaign.teamMembers || [],
        messageFlow: existingCampaign.messageFlow || {
          nodes: [],
          edges: []
        },
        teamAssignments: {}
      };
      
      setFormData(transformedData);
    }
  }, [existingCampaign]);

  // Navigate to next step
  const nextStep = useCallback(() => {
    if (currentStep < 6) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  }, [currentStep]);

  // Navigate to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  }, [currentStep]);

  // Handle closing the form
  const handleClose = useCallback(() => {
    setExitAnimation(true);
    // Wait for animation to complete before closing
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    // Basic validation
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Campaign name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      // Generate new campaign ID
      const campaignId = existingCampaign 
        ? existingCampaign.id 
        : Math.max(...campaignData.map(c => Number(c.id)), 0) + 1;
      
      console.log("Creating campaign with ID:", campaignId);
      
      // Create normalized stages data with counts for the campaign data structure
      const normalizedStages = formData.stages.map(stage => ({
        id: stage.id,
        name: stage.name,
        description: stage.description || "",
        color: stage.color || "bg-blue-500",
        count: 0 // Initialize count to zero
      }));
      
      // Create a new, properly formatted campaign object
      const newCampaign = {
        id: campaignId,
        name: formData.name,
        description: formData.description,
        status: 'Active',
        type: 'Email',
        channels: formData.channels,
        leads: formData.leads.length,
        responses: 0,
        positive: 0,
        negative: 0,
        conversion: '0%',
        teamMembers: formData.team,
        createdAt: new Date().toISOString().slice(0, 10),
        contacted: 0,
        messageFlow: formData.messageFlow || { nodes: [], edges: [] },
        stages: normalizedStages
      };

      if (existingCampaign) {
        // Update existing campaign
        const index = campaignData.findIndex(c => c.id === existingCampaign.id);
        if (index !== -1) {
          campaignData[index] = { ...campaignData[index], ...newCampaign };
          console.log("Updated existing campaign:", campaignData[index]);
        }
      } else {
        // Add new campaign
        campaignData.push(newCampaign);
        console.log("Added new campaign:", newCampaign, "Total campaigns now:", campaignData.length);
      }

      // Close form with animation
      setExitAnimation(true);
      setTimeout(() => {
        onClose(formData);
      }, 300);
      
    } catch (error) {
      console.error("Error saving campaign:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your campaign. Please try again.",
        variant: "destructive"
      });
    }
  }, [formData, existingCampaign, toast, onClose]);

  return {
    currentStep,
    formData,
    setFormData,
    nextStep: () => setCurrentStep(prev => prev < 6 ? prev + 1 : prev),
    prevStep: () => setCurrentStep(prev => prev > 1 ? prev - 1 : prev),
    handleSubmit,
    handleClose: () => {
      setExitAnimation(true);
      setTimeout(() => onClose(), 300);
    },
    exitAnimation
  };
};

export default useCampaignCreation;
