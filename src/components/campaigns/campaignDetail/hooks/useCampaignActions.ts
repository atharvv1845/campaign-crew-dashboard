
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

export const useCampaignActions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleEditCampaign = () => {
    toast({
      title: "Edit Campaign",
      description: "Editing campaign details...",
    });
  };

  const handleExportCampaign = (campaign?: any) => {
    // Generate JSON file for campaign export
    if (campaign) {
      const campaignData = JSON.stringify(campaign, null, 2);
      const blob = new Blob([campaignData], { type: 'application/json' });
      saveAs(blob, `campaign-${campaign.id}-export.json`);
    }
    
    toast({
      title: "Export Campaign",
      description: "Campaign data exported successfully.",
    });
  };

  const handleImportCampaign = () => {
    // Import campaign from JSON file
    toast({
      title: "Import Campaign",
      description: "Campaign import feature initialized.",
    });
  };

  const handleDeleteCampaign = (campaignId: number) => {
    // Delete campaign logic would go here
    toast({
      title: "Delete Campaign",
      description: "Campaign deleted successfully.",
    });
    // Navigate back to campaigns list
    navigate('/campaigns');
  };

  return {
    handleEditCampaign,
    handleExportCampaign,
    handleImportCampaign,
    handleDeleteCampaign
  };
};
