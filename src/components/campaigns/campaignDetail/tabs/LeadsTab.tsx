
import React from 'react';
import LeadTracking from '../LeadTracking';
import { Lead } from '../leads/types';

interface LeadsTabProps {
  campaign: any;
  leadsData: Lead[];
  view: 'table' | 'kanban';
  setView: (view: 'table' | 'kanban') => void;
  updateCampaign?: (data: any) => void;
}

const LeadsTab: React.FC<LeadsTabProps> = ({ 
  campaign, 
  leadsData, 
  view, 
  setView, 
  updateCampaign 
}) => {
  return (
    <div className="space-y-6">
      <LeadTracking 
        campaign={campaign} 
        leadsData={leadsData}
        view={view}
        setView={setView}
        updateCampaign={updateCampaign}
      />
    </div>
  );
};

export default LeadsTab;
