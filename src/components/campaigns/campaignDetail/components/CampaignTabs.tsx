
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Lead } from '../leads/types';
import TabsLayout from '../tabs/TabsLayout';
import OverviewTab from '../tabs/OverviewTab';
import LeadsTab from '../tabs/LeadsTab';
import MessagesTab from '../tabs/MessagesTab';
import ReportsTab from '../tabs/ReportsTab';
import { getTabs, enhanceCampaign, convertImportedLeads } from '../tabs/helpers/tabHelpers';
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
  
  // Get leads from campaign data
  const getLeadsForCampaign = (): Lead[] => {
    console.log('Campaign object:', campaign);
    
    // Check if campaign has direct leads property that is an array
    if (campaign.leads && Array.isArray(campaign.leads)) {
      console.log('Found leads array in campaign:', campaign.leads.length);
      
      // If these are already in the Lead format, use them directly
      if (campaign.leads.length > 0 && campaign.leads[0].hasOwnProperty('name') && campaign.leads[0].hasOwnProperty('company')) {
        console.log('Leads are already in correct format');
        return campaign.leads as Lead[];
      }
      
      // Otherwise convert them from the imported format
      console.log('Converting imported leads to Lead format');
      return convertImportedLeads({
        ...campaign,
        importedLeads: campaign.leads
      });
    }
    
    // No leads found, return empty array
    console.log('No leads found in campaign, returning empty array');
    return [];
  };
  
  const campaignLeads = getLeadsForCampaign();
  
  useEffect(() => {
    console.log('Campaign Leads:', campaignLeads);
  }, [campaign]);
  
  // Enhance campaign with stages data if needed
  const enhancedCampaign = enhanceCampaign(campaign);

  // Generate tabs based on campaign information
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
