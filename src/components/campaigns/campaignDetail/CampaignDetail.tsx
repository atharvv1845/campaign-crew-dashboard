
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Filter, Download, Plus, ChevronDown } from 'lucide-react';
import { campaignData, leadsData } from './mockData';
import CampaignHeader from './CampaignHeader';
import CampaignDescription from './CampaignDescription';
import StatCards from './StatCards';
import ChannelsAndStages from './ChannelsAndStages';
import LeadTracking from './LeadTracking';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [view, setView] = useState<'table' | 'kanban'>('table');
  
  // In a real app, we'd fetch the campaign data based on the ID
  // For now, we'll just use our mock data
  const campaign = campaignData;
  
  return (
    <div className="space-y-6">
      {/* Campaign header */}
      <CampaignHeader campaign={campaign} />
      
      {/* Campaign description */}
      {campaign.description && (
        <CampaignDescription description={campaign.description} />
      )}
      
      {/* Stats cards */}
      <StatCards campaign={campaign} />
      
      {/* Channels and stages */}
      <ChannelsAndStages campaign={campaign} />
      
      {/* Leads tracking */}
      <LeadTracking 
        campaign={campaign} 
        leadsData={leadsData} 
        view={view} 
        setView={setView} 
      />
    </div>
  );
};

export default CampaignDetail;
