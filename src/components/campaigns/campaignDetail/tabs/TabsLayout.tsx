
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
  children?: React.ReactNode;
  defaultValue?: string;
}

const TabsLayout: React.FC<TabsLayoutProps> = ({ 
  tabs, 
  activeTab, 
  campaign, 
  leadsData, 
  view, 
  setView,
  updateCampaign,
  children
}) => {
  return (
    <>
      {children ? (
        children
      ) : (
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
            <MessagesTab campaign={campaign} updateCampaign={updateCampaign} />
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
      )}
    </>
  );
};

export default TabsLayout;
