
import React from 'react';
import CampaignExportImport from '../components/CampaignExportImport';

interface SettingsTabProps {
  campaign: any;
  onExportCampaign: () => void;
  onImportCampaign: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ 
  campaign, 
  onExportCampaign, 
  onImportCampaign 
}) => {
  return (
    <div className="space-y-6">
      <CampaignExportImport 
        campaign={campaign}
        onExportCampaign={onExportCampaign}
        onImportCampaign={onImportCampaign}
      />
    </div>
  );
};

export default SettingsTab;
