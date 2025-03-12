
import { useToast } from '@/hooks/use-toast';

export const useCampaignActions = () => {
  const { toast } = useToast();
  
  const handleEditCampaign = () => {
    toast({
      title: "Edit Campaign",
      description: "Campaign editing feature is not yet implemented.",
    });
  };

  const handleExportCampaign = () => {
    toast({
      title: "Export Campaign",
      description: "Campaign export feature is not yet implemented.",
    });
  };

  const handleImportCampaign = () => {
    toast({
      title: "Import Campaign",
      description: "Campaign import feature is not yet implemented.",
    });
  };

  return {
    handleEditCampaign,
    handleExportCampaign,
    handleImportCampaign
  };
};
