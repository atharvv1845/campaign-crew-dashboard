
import { Lead } from '../../leads/types';

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

// Convert imported leads to the Lead format
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
      campaignId: campaignData.id || 0
    };
    
    console.log(`Converted lead: ${convertedLead.name} (ID: ${convertedLead.id})`);
    return convertedLead;
  });
};

export const enhanceCampaign = (campaign: any) => {
  const stagesData = campaign.stages || [
    { id: 1, name: 'New', count: 0 },
    { id: 2, name: 'Contacted', count: 0 },
    { id: 3, name: 'Interested', count: 0 },
    { id: 4, name: 'Qualified', count: 0 },
    { id: 5, name: 'Meeting', count: 0 },
    { id: 6, name: 'Closed', count: 0 },
    { id: 7, name: 'Lost', count: 0 },
  ];

  return {
    ...campaign,
    stages: stagesData
  };
};
