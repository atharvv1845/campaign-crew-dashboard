
import React from 'react';
import CampaignTable from '@/components/campaigns/CampaignTable';
import CampaignSearchFilters from './CampaignSearchFilters';

interface CampaignsTabContentProps {
  campaigns: any[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  refreshCampaigns: () => void;
}

const CampaignsTabContent: React.FC<CampaignsTabContentProps> = ({
  campaigns,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  refreshCampaigns
}) => {
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col space-y-4">
      <CampaignSearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pb-4">
          <CampaignTable 
            campaigns={filteredCampaigns}
            refreshList={refreshCampaigns} 
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignsTabContent;
