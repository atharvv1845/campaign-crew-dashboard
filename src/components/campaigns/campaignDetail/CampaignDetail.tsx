
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { campaignData, leadsData } from './mockData';
import CampaignHeader from './CampaignHeader';
import CampaignDescription from './CampaignDescription';
import StatCards from './StatCards';
import ChannelsAndStages from './ChannelsAndStages';
import LeadTracking from './LeadTracking';
import CreateCampaign from '../CreateCampaign';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [view, setView] = useState<'table' | 'kanban'>('table');
  const [showEditModal, setShowEditModal] = useState(false);
  
  // In a real app, we'd fetch the campaign data based on the ID
  // For now, we'll just use our mock data
  const campaign = campaignData;
  
  const handleEditCampaign = () => {
    setShowEditModal(true);
  };
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  
  return (
    <div className="space-y-6 h-[calc(100vh-6rem)] overflow-y-auto pr-2">
      {/* Campaign header with edit functionality */}
      <CampaignHeader 
        campaign={campaign} 
        onEdit={handleEditCampaign}
      />
      
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
      
      {/* Edit Campaign Modal */}
      {showEditModal && (
        <CreateCampaign onClose={handleCloseEditModal} />
      )}
    </div>
  );
};

export default CampaignDetail;
