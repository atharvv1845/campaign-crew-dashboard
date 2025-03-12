
import React from 'react';
import CampaignDescription from '../CampaignDescription';
import StatCards from '../StatCards';
import ChannelsAndStages from '../ChannelsAndStages';
import OutreachSummary from '../OutreachSummary';
import { Lead } from '../leads/types';

interface OverviewTabProps {
  campaign: any;
  leadsData: Lead[];
  updateCampaign?: (data: any) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ campaign, leadsData, updateCampaign }) => {
  return (
    <div className="space-y-6">
      <CampaignDescription campaign={campaign} />
      <StatCards campaign={campaign} leadsData={leadsData} />
      <ChannelsAndStages campaign={campaign} leadsData={leadsData} />
      <OutreachSummary campaign={campaign} />
    </div>
  );
};

export default OverviewTab;
