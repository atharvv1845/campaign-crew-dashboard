
import { Lead } from '../../leads/types';

interface Campaign {
  id: number;
  name: string;
  channels?: any[];
  responses?: number;
  [key: string]: any;
}

export interface TabConfig {
  value: string;
  label: string;
}

export const getTabs = (campaign: Campaign, campaignLeads: Lead[]): TabConfig[] => {
  // Base tabs that always show
  const baseTabs = [
    { value: "overview", label: "Overview" },
    { value: "leads", label: `Leads (${campaignLeads.length})` }
  ];
  
  // Only show Messages tab if the campaign has channels
  const hasChannels = campaign.channels && campaign.channels.length > 0;
  
  // Only show Reports tab if the campaign has leads or responses
  const hasLeadsOrResponses = campaignLeads.length > 0 || campaign.responses > 0;
  
  // Build complete tab list
  const tabs = [
    ...baseTabs,
    ...(hasChannels ? [{ value: "messages", label: "Messages" }] : []),
    ...(hasLeadsOrResponses ? [{ value: "reports", label: "Reports" }] : []),
    { value: "settings", label: "Settings" }
  ];
  
  return tabs;
};

export const getMockLeads = (): Lead[] => {
  return [
    {
      id: 1,
      name: 'John Smith',
      company: 'Tech Corp',
      email: 'john@techcorp.com',
      linkedin: 'linkedin.com/in/johnsmith',
      lastContacted: '2023-10-01',
      currentStage: 'Contacted',
      assignedTo: 'Sarah Lee',
      campaignId: 1
    },
    {
      id: 2,
      name: 'Emily Johnson',
      company: 'Creative Solutions',
      email: 'emily@creativesolutions.com',
      linkedin: 'linkedin.com/in/emilyjohnson',
      whatsapp: '+1234567890',
      lastContacted: '2023-10-03',
      currentStage: 'New',
      assignedTo: 'John Smith',
      campaignId: 1
    },
    {
      id: 3,
      name: 'Michael Brown',
      company: 'Innovative Inc',
      email: 'michael@innovative.com',
      lastContacted: '2023-09-28',
      currentStage: 'Interested',
      assignedTo: 'Sarah Lee',
      followUpDate: '2023-10-15',
      campaignId: 2
    },
    {
      id: 4,
      name: 'Campaign 7 Lead',
      company: 'Test Company',
      email: 'test@example.com',
      lastContacted: '2023-10-05',
      currentStage: 'New Lead',
      assignedTo: 'user1',
      campaignId: 7
    }
  ];
};

export const enhanceCampaign = (campaign: any) => {
  const stagesData = campaign.stages || [
    { id: 1, name: 'New', count: 5 },
    { id: 2, name: 'Contacted', count: 12 },
    { id: 3, name: 'Interested', count: 8 },
    { id: 4, name: 'Qualified', count: 4 },
    { id: 5, name: 'Meeting', count: 2 },
    { id: 6, name: 'Closed', count: 1 },
    { id: 7, name: 'Lost', count: 3 },
  ];

  return {
    ...campaign,
    stages: stagesData
  };
};
