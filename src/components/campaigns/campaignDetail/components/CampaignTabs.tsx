
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Lead } from '../leads/types';
import TabsLayout from '../tabs/TabsLayout';
import OverviewTab from '../tabs/OverviewTab';
import LeadsTab from '../tabs/LeadsTab';
import MessagesTab from '../tabs/MessagesTab';
import ReportsTab from '../tabs/ReportsTab';
import SettingsTab from '../tabs/SettingsTab';
import { getTabs, getMockLeads, enhanceCampaign } from '../tabs/helpers/tabHelpers';

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
  
  // Mock leads data - in a real app, this would be fetched from an API
  const mockLeads: Lead[] = getMockLeads();

  // Filter leads to only show leads for this campaign
  const campaignLeads = mockLeads.filter(lead => lead.campaignId === campaign.id);
  
  // Enhance campaign with stages data if needed
  const enhancedCampaign = enhanceCampaign(campaign);

  // Generate tabs based on campaign information
  const tabs = getTabs(campaign, campaignLeads);

  return (
    <div>
      {/* Use individual tab components directly instead of TabsLayout with children */}
      <TabsLayout 
        tabs={tabs} 
        activeTab="overview" 
        campaign={campaign} 
        leadsData={campaignLeads}
        view={view}
        setView={setView}
        updateCampaign={updateCampaign}
      >
        <TabsContent value="overview">
          <OverviewTab campaign={campaign} leadsData={campaignLeads} updateCampaign={updateCampaign} />
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
          <MessagesTab campaign={campaign} updateCampaign={updateCampaign} />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab campaign={campaign} leadsData={campaignLeads} />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab 
            campaign={campaign}
            onExportCampaign={handleExportCampaign}
            onImportCampaign={handleImportCampaign}
            updateCampaign={updateCampaign}
          />
        </TabsContent>
      </TabsLayout>
    </div>
  );
};

export default CampaignTabs;
