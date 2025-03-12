
import React from 'react';
import {
  LeadsContactedCard,
  ResponseBreakdownCard,
  CampaignStatusCard,
  TeamPerformanceCard,
  outreachMockData,
} from './outreachSummary';

interface OutreachSummaryProps {
  campaign: any;
  teamMembers?: string[];
}

const OutreachSummary: React.FC<OutreachSummaryProps> = ({ campaign, teamMembers = [] }) => {
  // Using the mock data from the extracted file
  const outreachData = outreachMockData;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Outreach Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LeadsContactedCard 
          today={outreachData.today} 
          thisWeek={outreachData.thisWeek} 
          thisMonth={outreachData.thisMonth} 
        />
        
        <ResponseBreakdownCard 
          positiveResponses={outreachData.positiveResponses}
          negativeResponses={outreachData.negativeResponses}
          notReplied={outreachData.notReplied}
          responseRate={outreachData.responseRate}
        />
        
        <CampaignStatusCard 
          campaign={campaign}
          teamMembers={teamMembers}
        />
      </div>
      
      <TeamPerformanceCard 
        teamPerformance={outreachData.teamPerformance}
      />
    </div>
  );
};

export default OutreachSummary;
