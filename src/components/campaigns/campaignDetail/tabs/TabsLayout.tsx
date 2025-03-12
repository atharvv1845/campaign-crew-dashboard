import React from 'react';
import OverviewTab from './OverviewTab';
import LeadsTab from './LeadsTab';
import MessagesTab from './MessagesTab';
import ReportsTab from './ReportsTab';
import SettingsTab from './SettingsTab';
import { TabConfig } from './helpers/tabHelpers';
import { Lead } from '../leads/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabsLayoutProps {
  tabs: TabConfig[];
  activeTab?: string;
  defaultValue: string;
  campaign: any;
  leadsData: Lead[];
  view?: 'table' | 'kanban';
  setView?: (view: 'table' | 'kanban') => void;
  updateCampaign?: (data: any) => void;
  children?: React.ReactNode;
}

const TabsLayout: React.FC<TabsLayoutProps> = ({ 
  tabs, 
  activeTab, 
  defaultValue,
  campaign, 
  leadsData, 
  view = 'table', 
  setView,
  updateCampaign,
  children
}) => {
  if (children) {
    return (
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              {tab.icon && <tab.icon className="h-4 w-4" />}
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {children}
      </Tabs>
    );
  }
  
  return (
    <>
      {activeTab === 'overview' && (
        <OverviewTab campaign={campaign} leadsData={leadsData} updateCampaign={updateCampaign} />
      )}
      
      {activeTab === 'leads' && (
        <LeadsTab 
          campaign={campaign} 
          leadsData={leadsData}
          view={view}
          setView={setView}
          updateCampaign={updateCampaign}
        />
      )}
      
      {activeTab === 'messages' && (
        <MessagesTab campaign={campaign} />
      )}
      
      {activeTab === 'reports' && (
        <ReportsTab campaign={campaign} leadsData={leadsData} />
      )}
      
      {activeTab === 'settings' && (
        <SettingsTab 
          campaign={campaign} 
          onExportCampaign={() => {}} 
          onImportCampaign={() => {}}
          updateCampaign={updateCampaign}
        />
      )}
    </>
  );
};

export default TabsLayout;
