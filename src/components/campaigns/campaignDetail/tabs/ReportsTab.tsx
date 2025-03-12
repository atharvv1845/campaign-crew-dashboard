
import React from 'react';
import CampaignReports from '../CampaignReports';

interface ReportsTabProps {
  campaign: any;
}

const ReportsTab: React.FC<ReportsTabProps> = ({ campaign }) => {
  return (
    <div className="space-y-6">
      <CampaignReports campaign={campaign} />
    </div>
  );
};

export default ReportsTab;
