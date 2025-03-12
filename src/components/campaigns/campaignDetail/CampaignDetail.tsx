
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

  return (
    <div className="space-y-6">
      <CampaignHeader 
        campaign={campaign} 
        onEditCampaign={handleEditCampaign}
        onExportCampaign={handleExportCampaign}
      />

      <CampaignTabs 
        campaign={campaign}
        handleExportCampaign={handleExportCampaign}
        handleImportCampaign={handleImportCampaign}
      />
    </div>
  );
};

export default CampaignDetail;
