
import React from 'react';
import CampaignList from '@/components/campaigns/CampaignList';

const Campaigns: React.FC = () => {
  return (
    <div className="h-[calc(100vh-6rem)]">
      <CampaignList />
    </div>
  );
};

export default Campaigns;
