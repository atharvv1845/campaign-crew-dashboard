
import React from 'react';
import StatCards from '../StatCards';
import { Separator } from '@/components/ui/separator';
import CampaignDescription from '../CampaignDescription';
import ChannelsAndStages from '../ChannelsAndStages';
import {
  LeadsContactedCard,
  ResponseBreakdownCard,
  CampaignStatusCard,
  TeamPerformanceCard,
  outreachMockData
} from '../outreachSummary';

interface OverviewTabProps {
  campaign: any;
  updateCampaign?: (data: any) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ campaign, updateCampaign }) => {
  return (
    <div className="space-y-6">
      <StatCards campaign={campaign} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CampaignDescription campaign={campaign} updateCampaign={updateCampaign} />
        <ChannelsAndStages campaign={campaign} />
      </div>
      <Separator />
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Outreach Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LeadsContactedCard 
            today={outreachMockData.today} 
            thisWeek={outreachMockData.thisWeek} 
            thisMonth={outreachMockData.thisMonth} 
          />
          
          <ResponseBreakdownCard 
            positiveResponses={outreachMockData.positiveResponses}
            negativeResponses={outreachMockData.negativeResponses}
            notReplied={outreachMockData.notReplied}
            responseRate={outreachMockData.responseRate}
          />
          
          <CampaignStatusCard 
            campaign={campaign}
          />
        </div>
        
        <TeamPerformanceCard 
          teamPerformance={outreachMockData.teamPerformance}
        />
      </div>
    </div>
  );
};

export default OverviewTab;
