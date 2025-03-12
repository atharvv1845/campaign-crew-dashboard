
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabConfig {
  value: string;
  label: string;
}

interface TabsLayoutProps {
  tabs: TabConfig[];
  children: React.ReactNode;
  defaultValue: string;
}

const TabsLayout: React.FC<TabsLayoutProps> = ({ tabs, children, defaultValue }) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className={`grid w-full max-w-3xl grid-cols-${tabs.length}`}>
        {tabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default TabsLayout;
