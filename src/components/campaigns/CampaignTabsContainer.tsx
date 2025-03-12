
import React from 'react';
import { FileText, BarChart, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CampaignTabsContent from './CampaignTabsContent';
import { CampaignData } from './campaignData';

interface CampaignTabsContainerProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  filteredCampaigns: CampaignData[];
  refreshCampaigns: () => void;
  onCreateCampaign: () => void;
  handleCampaignClick: (campaignId: number) => void;
  campaigns: CampaignData[];
}

const CampaignTabsContainer: React.FC<CampaignTabsContainerProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  filteredCampaigns,
  refreshCampaigns,
  onCreateCampaign,
  handleCampaignClick,
  campaigns
}) => {
  return (
    <Tabs defaultValue="campaigns" className="flex-1 flex flex-col">
      <TabsList>
        <TabsTrigger value="campaigns" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Campaigns</span>
        </TabsTrigger>
        <TabsTrigger value="reporting" className="flex items-center gap-2">
          <BarChart className="h-4 w-4" />
          <span>Reporting</span>
        </TabsTrigger>
        <TabsTrigger value="leads" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>All Leads</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="campaigns">
        <CampaignTabsContent
          activeTab="campaigns"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          filteredCampaigns={filteredCampaigns}
          refreshCampaigns={refreshCampaigns}
          onCreateCampaign={onCreateCampaign}
          handleCampaignClick={handleCampaignClick}
          campaigns={campaigns}
        />
      </TabsContent>
      
      <TabsContent value="reporting">
        <CampaignTabsContent
          activeTab="reporting"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          filteredCampaigns={filteredCampaigns}
          refreshCampaigns={refreshCampaigns}
          onCreateCampaign={onCreateCampaign}
          handleCampaignClick={handleCampaignClick}
          campaigns={campaigns}
        />
      </TabsContent>
      
      <TabsContent value="leads">
        <CampaignTabsContent
          activeTab="leads"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          filteredCampaigns={filteredCampaigns}
          refreshCampaigns={refreshCampaigns}
          onCreateCampaign={onCreateCampaign}
          handleCampaignClick={handleCampaignClick}
          campaigns={campaigns}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CampaignTabsContainer;
