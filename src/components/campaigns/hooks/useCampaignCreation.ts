import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define the types for messageFlow
type MessageFlowType = {
  id: string;
  name: string;
  trigger: string;
  timeDelay: number;
  message: string;
};

// Define the type for channels
type ChannelType = 'email' | 'sms' | 'whatsapp';

// Define the type for CampaignData
export type CampaignData = {
  id: number;
  name: string;
  type: string;
  channels: ChannelType[];
  leads: number;
  responses: number;
  createdAt: string;
  status: string;
  description: string;
  messageFlow: MessageFlowType[];
};

const useCampaignCreation = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    channels: [] as ChannelType[],
    description: '',
    messageFlow: [] as MessageFlowType[],
  });
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prevData => {
      let updatedChannels = [...prevData.channels];
      if (checked) {
        updatedChannels.push(name as ChannelType);
      } else {
        updatedChannels = updatedChannels.filter(channel => channel !== name);
      }
      return {
        ...prevData,
        channels: updatedChannels
      };
    });
  };

  const addMessageFlow = () => {
    const newMessageFlow = {
      id: uuidv4(),
      name: '',
      trigger: '',
      timeDelay: 0,
      message: ''
    };
    setFormData(prevData => ({
      ...prevData,
      messageFlow: [...prevData.messageFlow, newMessageFlow]
    }));
  };

  const updateMessageFlow = (id: string, field: string, value: string | number) => {
    setFormData(prevData => ({
      ...prevData,
      messageFlow: prevData.messageFlow.map(flow =>
        flow.id === id ? { ...flow, [field]: value } : flow
      )
    }));
  };

  const deleteMessageFlow = (id: string) => {
    setFormData(prevData => ({
      ...prevData,
      messageFlow: prevData.messageFlow.filter(flow => flow.id !== id)
    }));
  };

  const createCampaign = () => {
    const newCampaign = {
      ...formData,
      id: nextId,
      createdAt: new Date().toLocaleDateString(),
      status: 'draft',
      responses: 0,
      messageFlow: formData.messageFlow || []
    } as unknown as CampaignData; // use type assertion
    setCampaigns([...campaigns, newCampaign]);
    setNextId(nextId + 1);
    // Reset form data after campaign creation
    setFormData({
      name: '',
      type: '',
      channels: [],
      description: '',
      messageFlow: []
    });
  };

  const getCampaign = (campaignId: number) => {
    const campaign = campaigns.find(campaign => campaign.id === campaignId);
    return campaign || null;
  };

   const updateCampaign = (campaignId: number) => {
    const updatedCampaign = {
      ...formData,
      id: campaignId,
      messageFlow: formData.messageFlow || []
    } as unknown as CampaignData; // use type assertion

    setCampaigns(campaigns.map(campaign => campaign.id === campaignId ? updatedCampaign : campaign));
  };

  const deleteCampaign = (campaignId: number) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
  };

  const setCampaignStatus = (campaignId: number, status: string) => {
     setCampaigns(campaigns.map(campaign => campaign.id === campaignId ? {...campaign, status: status} : campaign));
  };

  return {
    formData,
    campaigns,
    handleChange,
    handleCheckboxChange,
    addMessageFlow,
    updateMessageFlow,
    deleteMessageFlow,
    createCampaign,
    getCampaign,
    updateCampaign,
    deleteCampaign,
    setCampaignStatus
  };
};

export default useCampaignCreation;
