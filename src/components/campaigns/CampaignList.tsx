
import React, { useState } from 'react';
import { campaignData } from './campaignData';
import CampaignFilters from './CampaignFilters';
import CampaignTable from './CampaignTable';
import NewCampaignButton from './NewCampaignButton';
import CreateCampaign from './CreateCampaign';

const CampaignList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Filter campaigns based on search term and status
  const filteredCampaigns = campaignData.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? campaign.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header and actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <CampaignFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        
        <div className="flex items-center gap-3">
          <NewCampaignButton onClick={() => setShowCreateModal(true)} />
        </div>
      </div>
      
      {/* Campaigns table with scrolling */}
      <div className="flex-1 overflow-auto min-h-[400px]">
        <CampaignTable campaigns={filteredCampaigns} />
      </div>
      
      {/* Create Campaign Modal */}
      {showCreateModal && (
        <CreateCampaign onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default CampaignList;
