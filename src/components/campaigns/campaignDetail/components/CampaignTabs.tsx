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
  
  const getLeadsForCampaign = (): Lead[] => {
    console.log('Processing campaign leads:', campaign);
    
    // Check if campaign.leads is a number (indicating count) or array
    if (typeof campaign.leads === 'number') {
      console.log('Leads property is a number, no actual lead data found');
      return [];
    }
    
    // If we have an array of leads
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
    
    console.log('No valid leads data found');
    return [];
  };
  
  const campaignLeads = getLeadsForCampaign();
  
  useEffect(() => {
    console.log('Processed Campaign Leads:', campaignLeads);
  }, [campaign]);
  
  const enhancedCampaign = enhanceCampaign(campaign);

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
