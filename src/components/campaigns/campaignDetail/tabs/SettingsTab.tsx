
import React from 'react';
import CampaignExportImport from '../components/CampaignExportImport';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SettingsTabProps {
  campaign: any;
  onExportCampaign: () => void;
  onImportCampaign: () => void;
  updateCampaign?: (data: any) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ 
  campaign, 
  onExportCampaign, 
  onImportCampaign,
  updateCampaign
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Campaign Details</h3>
            <p className="text-sm text-muted-foreground">
              Campaign ID: {campaign.id}<br />
              Created On: {campaign.createdAt}<br />
              Last Modified: {campaign.updatedAt || campaign.createdAt}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Campaign Controls</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className="px-3 py-2 rounded-md bg-muted hover:bg-muted/80 text-sm font-medium"
                onClick={() => updateCampaign && updateCampaign({ status: 'Active' })}
              >
                Activate Campaign
              </button>
              <button 
                className="px-3 py-2 rounded-md bg-muted hover:bg-muted/80 text-sm font-medium"
                onClick={() => updateCampaign && updateCampaign({ status: 'Paused' })}
              >
                Pause Campaign
              </button>
              <button 
                className="px-3 py-2 rounded-md bg-muted hover:bg-muted/80 text-sm font-medium"
                onClick={() => updateCampaign && updateCampaign({ status: 'Completed' })}
              >
                Mark as Completed
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <CampaignExportImport 
        campaign={campaign}
        onExportCampaign={onExportCampaign}
        onImportCampaign={onImportCampaign}
      />
    </div>
  );
};

export default SettingsTab;
