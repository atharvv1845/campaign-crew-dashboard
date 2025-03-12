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
    
    if (!campaign.leads) {
      console.log('No leads data found');
      return [];
    }
    
    if (Array.isArray(campaign.leads)) {
      console.log('Found leads array:', campaign.leads.length);
      
      return campaign.leads.map((lead: any, index: number) => ({
        ...lead,
        id: lead.id || `lead-${index}`,
        currentStage: lead.status || lead.currentStage || 'New'
      }));
    }
    
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
