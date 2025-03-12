
import React from 'react';
import OverviewTab from './OverviewTab';
import LeadsTab from './LeadsTab';
import MessagesTab from './MessagesTab';
import ReportsTab from './ReportsTab';
import SettingsTab from './SettingsTab';
import { TabConfig } from './helpers/tabHelpers';
import { Lead } from '../leads/types';

interface TabsLayoutProps {
  tabs: TabConfig[];
  activeTab: string;
  campaign: any;
  leadsData: Lead[];
  view: 'table' | 'kanban';
  setView: (view: 'table' | 'kanban') => void;
  updateCampaign?: (data: any) => void;
}

const TabsLayout: React.FC<TabsLayoutProps> = ({ 
  tabs, 
  activeTab, 
  campaign, 
  leadsData, 
  view, 
  setView,
  updateCampaign 
}) => {
  return (
    <>
      {activeTab === 'overview' && (
        <OverviewTab campaign={campaign} leadsData={leadsData} />
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
        <SettingsTab campaign={campaign} updateCampaign={updateCampaign} />
      )}
    </>
  );
};

export default TabsLayout;
