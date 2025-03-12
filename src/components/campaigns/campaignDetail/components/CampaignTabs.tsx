
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Lead } from '../leads/types';
import TabsLayout from '../tabs/TabsLayout';
import OverviewTab from '../tabs/OverviewTab';
import LeadsTab from '../tabs/LeadsTab';
import MessagesTab from '../tabs/MessagesTab';
import ReportsTab from '../tabs/ReportsTab';
import { getTabs, convertImportedLeads } from '../tabs/helpers/tabHelpers';
import { useToast } from '@/hooks/use-toast';

interface CampaignTabsProps {
  campaign: any;
  handleExportCampaign: () => void;
  handleImportCampaign: () => void;
  updateCampaign?: (data: any) => void;
}

const CampaignTabs: React.FC<CampaignTabsProps> = ({ 
  campaign, 
  handleExportCampaign,
  handleImportCampaign,
  updateCampaign
}) => {
  const [view, setView] = useState<'table' | 'kanban'>('table');
  const { toast } = useToast();
  
  // This function properly processes leads data in different formats
  const getLeadsForCampaign = (): Lead[] => {
    console.log('Processing campaign leads:', campaign);
    
    // Case 1: If campaign.leads is a number (indicating count) or undefined/null
    if (!campaign.leads || typeof campaign.leads === 'number') {
      console.log('No actual lead data found, showing placeholder leads');
      
      // Return two placeholder demo leads to demonstrate the functionality
      return [
        {
          id: 1001,
          name: "John Smith",
          email: "john.smith@example.com",
          company: "Acme Corp",
          currentStage: "New",
          lastContacted: "2023-10-15",
          followUpDate: "2023-10-25",
          notes: "Interested in our product features",
          assignedTo: "Alex",
          linkedin: "https://linkedin.com/in/johnsmith",
          twitter: "",
          whatsapp: "",
          facebook: "",
          instagram: ""
        },
        {
          id: 1002,
          name: "Sarah Johnson",
          email: "sarah.j@techcompany.co",
          company: "Tech Company",
          currentStage: "Contacted",
          lastContacted: "2023-10-18",
          followUpDate: "2023-10-28",
          notes: "Had initial call, schedule follow-up",
          assignedTo: "Taylor",
          linkedin: "https://linkedin.com/in/sarahjohnson",
          twitter: "https://twitter.com/sarahj",
          whatsapp: "",
          facebook: "",
          instagram: ""
        }
      ];
    }
    
    // Case 2: If we have an array of leads
    if (Array.isArray(campaign.leads)) {
      console.log('Found leads array:', campaign.leads.length);
      
      // Convert each lead to ensure proper format
      return campaign.leads.map((lead: any, index: number) => ({
        id: lead.id || index + 1,
        name: lead.firstName ? `${lead.firstName} ${lead.lastName || ''}` : lead.name || '',
        email: lead.email || '',
        company: lead.company || '',
        currentStage: lead.status || lead.currentStage || 'New',
        lastContacted: lead.lastContacted || '',
        followUpDate: lead.followUpDate || '',
        notes: lead.notes || '',
        assignedTo: lead.assignedTo || '',
        linkedin: lead.linkedin || lead.socialProfiles?.linkedin || '',
        twitter: lead.twitter || lead.socialProfiles?.twitter || '',
        whatsapp: lead.whatsapp || lead.socialProfiles?.whatsapp || '',
        facebook: lead.facebook || lead.socialProfiles?.facebook || '',
        instagram: lead.instagram || lead.socialProfiles?.instagram || ''
      }));
    }
    
    console.log('No valid leads data found, returning placeholders');
    return [];
  };
  
  const campaignLeads = getLeadsForCampaign();
  
  useEffect(() => {
    console.log('Processed Campaign Leads:', campaignLeads);
  }, [campaign]);
  
  // Create an enhanced campaign with default stages if needed
  const enhancedCampaign = {
    ...campaign,
    stages: campaign.stages || [
      { id: 1, name: 'New', count: 0 },
      { id: 2, name: 'Contacted', count: 0 },
      { id: 3, name: 'Interested', count: 0 },
      { id: 4, name: 'Qualified', count: 0 },
      { id: 5, name: 'Meeting', count: 0 },
      { id: 6, name: 'Closed', count: 0 },
      { id: 7, name: 'Lost', count: 0 },
    ]
  };

  const tabs = getTabs(campaign, campaignLeads);

  return (
    <TabsLayout 
      tabs={tabs} 
      defaultValue="overview"
      campaign={enhancedCampaign}
      leadsData={campaignLeads}
      view={view}
      setView={setView}
      updateCampaign={updateCampaign}
    >
      <TabsContent value="overview">
        <OverviewTab campaign={enhancedCampaign} leadsData={campaignLeads} updateCampaign={updateCampaign} />
      </TabsContent>

      <TabsContent value="leads">
        <LeadsTab 
          campaign={enhancedCampaign} 
          leadsData={campaignLeads}
          view={view}
          setView={setView}
          updateCampaign={updateCampaign}
        />
      </TabsContent>

      <TabsContent value="messages">
        <MessagesTab campaign={enhancedCampaign} updateCampaign={updateCampaign} />
      </TabsContent>

      <TabsContent value="reports">
        <ReportsTab campaign={enhancedCampaign} leadsData={campaignLeads} />
      </TabsContent>
    </TabsLayout>
  );
};

export default CampaignTabs;
