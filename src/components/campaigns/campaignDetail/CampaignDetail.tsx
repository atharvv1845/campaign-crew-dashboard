
import React from 'react';
import { useParams } from 'react-router-dom';
import CampaignHeader from './CampaignHeader';
import CampaignLoading from './components/CampaignLoading';
import CampaignNotFound from './components/CampaignNotFound';
import CampaignTabs from './components/CampaignTabs';
import { useCampaignData } from './hooks/useCampaignData';
import { useCampaignActions } from './hooks/useCampaignActions';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, campaign } = useCampaignData(id);
  const { handleEditCampaign, handleExportCampaign, handleImportCampaign } = useCampaignActions();

  if (loading) {
    return <CampaignLoading />;
  }

  if (!campaign) {
    return <CampaignNotFound />;
  }

  // Ensure all required fields exist for the campaign
  const safeCampaign = {
    ...campaign,
    id: campaign.id,
    name: campaign.name || '',
    status: campaign.status || 'Draft',
    createdAt: campaign.createdAt || new Date().toISOString().slice(0, 10),
    channels: campaign.channels || [],
    teamMembers: campaign.teamMembers || [],
    messageFlow: campaign.messageFlow || { nodes: [], edges: [] },
    responses: campaign.responses || 0,
    positive: campaign.positive || 0,
    negative: campaign.negative || 0,
    leads: campaign.leads || 0,
    contacted: campaign.contacted || 0,
    stages: campaign.stages || []
  };

  return (
    <div className="space-y-6">
      <CampaignHeader 
        campaign={safeCampaign} 
        onEditCampaign={handleEditCampaign}
        onExportCampaign={handleExportCampaign}
      />

      <CampaignTabs 
        campaign={safeCampaign}
        handleExportCampaign={handleExportCampaign}
        handleImportCampaign={handleImportCampaign}
      />
    </div>
  );
};

export default CampaignDetail;
