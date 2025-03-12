
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Lead } from '../leads/types';
import TabsLayout from '../tabs/TabsLayout';
import OverviewTab from '../tabs/OverviewTab';
import LeadsTab from '../tabs/LeadsTab';
import MessagesTab from '../tabs/MessagesTab';
import ReportsTab from '../tabs/ReportsTab';
import { getTabs } from '../tabs/helpers/tabHelpers';
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
  
  const getLeadsForCampaign = (): Lead[] => {
    console.log('Processing campaign leads:', campaign);
    
    // First check if there are actual lead objects in leadsData array
    if (campaign.leadsData && Array.isArray(campaign.leadsData) && campaign.leadsData.length > 0) {
      console.log('Found actual lead objects in leadsData:', campaign.leadsData.length);
      return campaign.leadsData.map((lead: any, index: number) => {
        // Ensure each lead has the required properties
        return {
          ...lead,
          id: lead.id || index + 1,
          name: lead.name || (lead.firstName && lead.lastName ? `${lead.firstName} ${lead.lastName}` : 
                 (lead.firstName || lead.lastName || `Lead #${index + 1}`)),
          currentStage: lead.currentStage || lead.status || 'New Lead',
          // Make sure platform links are accessible
          linkedin: lead.linkedin || lead.socialProfiles?.linkedin || '',
          twitter: lead.twitter || lead.socialProfiles?.twitter || '',
          facebook: lead.facebook || lead.socialProfiles?.facebook || '',
          instagram: lead.instagram || lead.socialProfiles?.instagram || '',
          whatsapp: lead.whatsapp || lead.socialProfiles?.whatsapp || '',
        };
      });
    }
    
    // Check if campaign.leads is an array of lead objects
    if (Array.isArray(campaign.leads) && campaign.leads.length > 0 && typeof campaign.leads[0] !== 'number') {
      console.log('Found leads array with objects:', campaign.leads.length);
      return campaign.leads.map((lead: any, index: number) => {
        // Same mapping logic as above
        return {
          ...lead,
          id: lead.id || index + 1,
          name: lead.name || (lead.firstName && lead.lastName ? `${lead.firstName} ${lead.lastName}` : 
                 (lead.firstName || lead.lastName || `Lead #${index + 1}`)),
          currentStage: lead.currentStage || lead.status || 'New Lead',
        };
      });
    }
    
    // If we still haven't found actual lead data, check if we have a numeric lead count
    if (typeof campaign.leads === 'number' && campaign.leads > 0) {
      console.log('No actual lead data found, but a lead count exists:', campaign.leads);
      toast({
        title: "No detailed lead data",
        description: "Only lead count is available. Import leads or add them manually for detailed information.",
      });
      
      // At this point, we can return an empty array to avoid showing placeholder data
      return [];
    }
    
    console.log('No leads data found');
    return [];
  };
  
  const campaignLeads = getLeadsForCampaign();
  
  useEffect(() => {
    console.log('Processed Campaign Leads:', campaignLeads);
  }, [campaign]);

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

  return (
    <TabsLayout 
      tabs={getTabs(campaign, campaignLeads)} 
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
