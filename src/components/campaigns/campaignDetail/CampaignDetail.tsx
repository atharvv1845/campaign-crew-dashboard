
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CampaignHeader from './CampaignHeader';
import CampaignLoading from './components/CampaignLoading';
import CampaignNotFound from './components/CampaignNotFound';
import CampaignTabs from './components/CampaignTabs';
import { useCampaignData } from './hooks/useCampaignData';
import { useCampaignActions } from './hooks/useCampaignActions';
import CreateCampaign from '../CreateCampaign';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, campaign, refreshCampaign, updateCampaign } = useCampaignData(id);
  const { handleEditCampaign, handleExportCampaign, handleImportCampaign } = useCampaignActions();
  const [showEditCampaign, setShowEditCampaign] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // Only force a refresh on initial load or when ID changes, but not on every render
  useEffect(() => {
    if (id && !initialLoadDone) {
      console.log('Initial campaign load for ID:', id);
      refreshCampaign();
      setInitialLoadDone(true);
    }
  }, [id, refreshCampaign, initialLoadDone]);

  // Reset initialLoadDone when ID changes
  useEffect(() => {
    return () => {
      setInitialLoadDone(false);
    };
  }, [id]);

  // Handle edit campaign modal
  const handleEditCampaignClick = () => {
    setShowEditCampaign(true);
  };

  const handleCloseEditCampaign = (updatedCampaign?: any) => {
    setShowEditCampaign(false);
    if (updatedCampaign) {
      // Only refresh after edit is complete
      refreshCampaign();
    }
  };

  if (loading && !initialLoadDone) {
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
    leads: campaign.leads || [],  // Ensure leads is an array
    contacted: campaign.contacted || 0,
    stages: campaign.stages || []
  };

  console.log('Rendering campaign detail for:', safeCampaign.id, safeCampaign.name);
  console.log('Campaign leads:', safeCampaign.leads);

  return (
    <div className="space-y-6">
      <CampaignHeader 
        campaign={safeCampaign} 
        onEditCampaign={handleEditCampaignClick}
        onExportCampaign={() => handleExportCampaign(safeCampaign)}
      />

      <CampaignTabs 
        campaign={safeCampaign}
        handleExportCampaign={() => handleExportCampaign(safeCampaign)}
        handleImportCampaign={handleImportCampaign}
        updateCampaign={updateCampaign}
      />

      {showEditCampaign && (
        <CreateCampaign 
          onClose={handleCloseEditCampaign} 
          existingCampaign={safeCampaign}
        />
      )}
    </div>
  );
};

export default CampaignDetail;
