
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

  // Handle form submission
  const handleSubmit = useCallback(() => {
    // Validate form
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Campaign name is required",
        variant: "destructive"
      });
      setCurrentStep(1); // Go back to the first step
      return;
    }

    // Create new campaign or update existing
    const campaignId = existingCampaign ? existingCampaign.id : Math.max(...campaignData.map(c => Number(c.id)), 0) + 1;
    
    // Create a sanitized version of messageFlow to avoid circular references
    const messageFlow = formData.messageFlow ? {
      nodes: formData.messageFlow.nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: { ...node.position },
        data: { ...node.data }
      })),
      edges: formData.messageFlow.edges ? formData.messageFlow.edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: edge.animated,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle
      })) : []
    } : { nodes: [], edges: [] };
    
    const newCampaign = {
      id: campaignId,
      name: formData.name,
      description: formData.description,
      status: 'Active', // Always set to Active for better visibility
      type: 'Email', // Default type
      channels: formData.channels.map(channel => {
        // Convert channel id to display name (first letter uppercase)
        return channel.charAt(0).toUpperCase() + channel.slice(1);
      }),
      leads: formData.leads.length,
      responses: 0,
      positive: 0,
      negative: 0,
      conversion: '0%',
      teamMembers: formData.team || [],
      createdAt: new Date().toISOString().slice(0, 10),
      contacted: 0,
      messageFlow: messageFlow,
      stages: formData.stages || [],
    };

    try {
      if (existingCampaign) {
        // Find and update existing campaign
        const index = campaignData.findIndex(c => c.id === existingCampaign.id);
        if (index !== -1) {
          campaignData[index] = { ...campaignData[index], ...newCampaign };
          console.log("Updated existing campaign:", campaignData[index]);
          toast({
            title: "Campaign Updated",
            description: `${formData.name} has been updated.`
          });
        }
      } else {
        // Add new campaign to the list
        campaignData.push(newCampaign);
        console.log("Added new campaign:", newCampaign);
        toast({
          title: "Campaign Created",
          description: `${formData.name} has been created successfully.`
        });
      }

      // Close the form with animation and pass the campaign data
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
    nextStep,
    prevStep,
    handleSubmit,
    handleClose,
    exitAnimation
  };
};

export default useCampaignCreation;
