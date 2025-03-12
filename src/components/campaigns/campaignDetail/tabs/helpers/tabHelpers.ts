
import { Lead } from '../../leads/types';
import { Icon } from 'lucide-react';

interface Campaign {
  id: number;
  name: string;
  channels?: any[];
  responses?: number;
  leads?: any[];
  [key: string]: any;
}

export interface TabConfig {
  value: string;
  label: string;
  icon?: React.ComponentType<any>;
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
    ...(hasLeadsOrResponses ? [{ value: "reports", label: "Reports" }] : [])
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
      campaignId: 8
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
      campaignId: 8
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
      campaignId: 8
    },
    // Add more leads to match the total of 18
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 4,
      name: `Lead ${i + 4}`,
      company: `Company ${i + 4}`,
      email: `lead${i + 4}@example.com`,
      lastContacted: '2023-10-05',
      currentStage: 'New Lead',
      assignedTo: 'user1',
      campaignId: 8
    }))
  ];
};

// Enhanced function to convert imported leads to the Lead format
export const convertImportedLeads = (campaignData: any): Lead[] => {
  console.log('Converting leads for campaign ID:', campaignData.id);
  
  if (!campaignData || !campaignData.importedLeads || !Array.isArray(campaignData.importedLeads)) {
    console.log('No imported leads found or invalid data structure');
    return [];
  }
  
  console.log(`Found ${campaignData.importedLeads.length} leads to convert`);
  
  return campaignData.importedLeads.map((lead: any, index: number) => {
    // Handle both formats - the imported lead format and any other possible format
    const firstName = lead.firstName || '';
    const lastName = lead.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    
    // Create a standardized lead object from the imported data
    const convertedLead = {
      id: lead.id || index + 1000, // Use provided ID or generate one
      name: fullName || lead.name || `Lead ${index + 1}`,
      company: lead.company || 'Not specified',
      email: lead.email || '',
      linkedin: lead.socialProfiles?.linkedin || lead.linkedin || '',
      whatsapp: lead.socialProfiles?.whatsapp || lead.whatsapp || '',
      twitter: lead.socialProfiles?.twitter || lead.twitter || '',
      facebook: lead.socialProfiles?.facebook || lead.facebook || '',
      instagram: lead.socialProfiles?.instagram || lead.instagram || '',
      lastContacted: lead.lastContacted || new Date().toISOString().slice(0, 10),
      currentStage: lead.status || lead.currentStage || 'New',
      assignedTo: lead.assignedTo || 'Unassigned',
      followUpDate: lead.followUpDate || '',
      notes: lead.notes || '',
      campaignId: campaignData.id || 8
    };
    
    console.log(`Converted lead: ${convertedLead.name} (ID: ${convertedLead.id})`);
    return convertedLead;
  });
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
