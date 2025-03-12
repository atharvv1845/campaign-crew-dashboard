
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import StatCards from '../StatCards';
import LeadTracking from '../LeadTracking';
import MessageSequence from '../MessageSequence';
import ChannelsAndStages from '../ChannelsAndStages';
import CampaignReports from '../CampaignReports';
import CampaignExportImport from './CampaignExportImport';
import CampaignDescription from '../CampaignDescription';
import { Lead } from '../leads/types';
import {
  LeadsContactedCard,
  ResponseBreakdownCard,
  CampaignStatusCard,
  TeamPerformanceCard,
  outreachMockData
} from '../outreachSummary';

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
  const mockLeads: Lead[] = [
    {
      id: 1,
      name: 'John Smith',
      company: 'Tech Corp',
      email: 'john@techcorp.com',
      linkedin: 'linkedin.com/in/johnsmith',
      lastContacted: '2023-10-01',
      currentStage: 'Contacted',
      assignedTo: 'Sarah Lee'
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
      assignedTo: 'John Smith'
    },
    {
      id: 3,
      name: 'Michael Brown',
      company: 'Innovative Inc',
      email: 'michael@innovative.com',
      lastContacted: '2023-09-28',
      currentStage: 'Interested',
      assignedTo: 'Sarah Lee',
      followUpDate: '2023-10-15'
    }
  ];

  const stagesData = campaign.stages || [
    { id: 1, name: 'New', count: 5 },
    { id: 2, name: 'Contacted', count: 12 },
    { id: 3, name: 'Interested', count: 8 },
    { id: 4, name: 'Qualified', count: 4 },
    { id: 5, name: 'Meeting', count: 2 },
    { id: 6, name: 'Closed', count: 1 },
    { id: 7, name: 'Lost', count: 3 },
  ];

  const enhancedCampaign = {
    ...campaign,
    stages: stagesData
  };

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full max-w-3xl grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="leads">Leads</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <StatCards campaign={campaign} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CampaignDescription campaign={campaign} updateCampaign={updateCampaign} />
          <ChannelsAndStages campaign={campaign} />
        </div>
        <Separator />
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Outreach Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LeadsContactedCard 
              today={outreachMockData.today} 
              thisWeek={outreachMockData.thisWeek} 
              thisMonth={outreachMockData.thisMonth} 
            />
            
            <ResponseBreakdownCard 
              positiveResponses={outreachMockData.positiveResponses}
              negativeResponses={outreachMockData.negativeResponses}
              notReplied={outreachMockData.notReplied}
              responseRate={outreachMockData.responseRate}
            />
            
            <CampaignStatusCard 
              campaign={campaign}
            />
          </div>
          
          <TeamPerformanceCard 
            teamPerformance={outreachMockData.teamPerformance}
          />
        </div>
      </TabsContent>

      <TabsContent value="leads" className="space-y-6">
        <LeadTracking 
          campaign={enhancedCampaign} 
          leadsData={mockLeads}
          view={view}
          setView={setView}
          updateCampaign={updateCampaign}
        />
      </TabsContent>

      <TabsContent value="messages" className="space-y-6">
        <MessageSequence campaign={campaign} updateCampaign={updateCampaign} />
      </TabsContent>

      <TabsContent value="reports" className="space-y-6">
        <CampaignReports campaign={campaign} />
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <CampaignExportImport 
          campaign={campaign}
          onExportCampaign={handleExportCampaign}
          onImportCampaign={handleImportCampaign}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CampaignTabs;
