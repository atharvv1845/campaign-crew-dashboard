
import React from 'react';
import CreateCampaign from '@/components/campaigns/CreateCampaign';
import CampaignHeader from '@/components/campaigns/CampaignHeader';
import CampaignStats from '@/components/campaigns/CampaignStats';
import CampaignTabsContainer from '@/components/campaigns/CampaignTabsContainer';
import { useCampaignManagement } from '@/components/campaigns/hooks/useCampaignManagement';

const CampaignManagement: React.FC = () => {
  const {
    showCreateCampaign,
    setShowCreateCampaign,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    campaigns,
    stats,
    refreshCampaigns,
    handleCampaignCreated,
    filteredCampaigns,
    handleCampaignClick
  } = useCampaignManagement();

  return (
    <div className="space-y-6 h-[calc(100vh-6rem)] flex flex-col p-6">
      <CampaignHeader onCreateCampaign={() => setShowCreateCampaign(true)} />
      
      {/* Campaign Statistics */}
      <CampaignStats stats={stats} />
      
      {/* Campaign Tabs */}
      <CampaignTabsContainer
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        filteredCampaigns={filteredCampaigns}
        refreshCampaigns={refreshCampaigns}
        onCreateCampaign={() => setShowCreateCampaign(true)}
        handleCampaignClick={handleCampaignClick}
        campaigns={campaigns}
      />
      
      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <CreateCampaign 
          onClose={(campaign) => {
            if (campaign) {
              handleCampaignCreated();
            } else {
              setShowCreateCampaign(false);
            }
          }} 
        />
      )}
    </div>
  );
};

export default CampaignManagement;
