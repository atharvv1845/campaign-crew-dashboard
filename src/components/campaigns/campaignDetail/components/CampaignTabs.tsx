
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
    
    // Check if campaign.leads exists and is a number (count of leads)
    if (typeof campaign.leads === 'number') {
      console.log('Found leads count:', campaign.leads, 'but no actual lead objects');
      // Generate placeholder leads for demonstration
      return Array.from({ length: campaign.leads }, (_, index) => ({
        id: index + 1,
        name: `Lead #${index + 1}`,
        company: 'Sample Company',
        email: `lead${index + 1}@example.com`,
        currentStage: 'New Lead',
        lastContacted: '',
        // You may add more default properties as needed
      }));
    }
    
    if (!campaign.leads) {
      console.log('No leads data found');
      return [];
    }
    
    if (Array.isArray(campaign.leads)) {
      console.log('Found leads array:', campaign.leads.length);
      
      return campaign.leads.map((lead: any, index: number) => {
        // Generate a display name based on available fields
        let displayName = '';
        
        if (lead.name) {
          displayName = lead.name;
        } else if (lead.firstName && lead.lastName) {
          displayName = `${lead.firstName} ${lead.lastName}`;
        } else if (lead.firstName) {
          displayName = lead.firstName;
        } else if (lead.lastName) {
          displayName = lead.lastName;
        } else if (lead.fullName) {
          displayName = lead.fullName;
        } else {
          displayName = `Lead #${index + 1}`;
        }
        
        return {
          ...lead,
          id: lead.id || `lead-${index}`,
          name: displayName,
          currentStage: lead.currentStage || lead.status || lead.statusName || 'New',
          // Ensure platform links are accessible
          linkedin: lead.linkedin || lead.socialProfiles?.linkedin || '',
          twitter: lead.twitter || lead.socialProfiles?.twitter || '',
          facebook: lead.facebook || lead.socialProfiles?.facebook || '',
          instagram: lead.instagram || lead.socialProfiles?.instagram || '',
          whatsapp: lead.whatsapp || lead.socialProfiles?.whatsapp || '',
          // Date fields
          firstContacted: lead.firstContacted || lead.createdAt || '',
          lastContacted: lead.lastContacted || lead.lastContact || '',
          followUpDate: lead.followUpDate || lead.nextFollowUp || '',
          // Team assignee
          assignedTo: lead.assignedTo || lead.teamMember || '',
        };
      });
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
