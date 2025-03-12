
import React, { useState } from 'react';
import OverviewTab from './OverviewTab';
import LeadsTab from './LeadsTab';
import MessagesTab from './MessagesTab';
import ReportsTab from './ReportsTab';
import { TabConfig } from './helpers/tabHelpers';
import { Lead } from '../leads/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Users, MessageSquare, BarChart } from 'lucide-react';

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

const getTabIcon = (value: string) => {
  switch (value) {
    case 'overview':
      return LayoutDashboard;
    case 'leads':
      return Users;
    case 'messages':
      return MessageSquare;
    case 'reports':
      return BarChart;
    default:
      return LayoutDashboard;
  }
};

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
  const [currentTab, setCurrentTab] = useState(defaultValue || 'overview');

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };

  // If children are provided, render them within the tabs
  if (children) {
    return (
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {tabs.map((tab) => {
            const IconComponent = getTabIcon(tab.value);
            return (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value} 
                className="flex items-center gap-2"
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {children}
      </Tabs>
    );
  }
  
  // If no children, render tabs content based on active tab
  return (
    <Tabs defaultValue={activeTab || defaultValue} className="w-full" onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-4">
        {tabs.map((tab) => {
          const IconComponent = getTabIcon(tab.value);
          return (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value} 
              className="flex items-center gap-2"
            >
              <IconComponent className="h-4 w-4" />
              <span>{tab.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
      
      <TabsContent value="overview">
        <OverviewTab campaign={campaign} leadsData={leadsData} updateCampaign={updateCampaign} />
      </TabsContent>
      
      <TabsContent value="leads">
        <LeadsTab 
          campaign={campaign} 
          leadsData={leadsData}
          view={view}
          setView={setView}
          updateCampaign={updateCampaign}
        />
      </TabsContent>
      
      <TabsContent value="messages">
        <MessagesTab campaign={campaign} updateCampaign={updateCampaign} />
      </TabsContent>
      
      <TabsContent value="reports">
        <ReportsTab campaign={campaign} leadsData={leadsData} />
      </TabsContent>
    </Tabs>
  );
};

export default TabsLayout;
