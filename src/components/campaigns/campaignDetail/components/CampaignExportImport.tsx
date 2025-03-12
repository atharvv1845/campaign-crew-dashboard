
import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { campaignData } from '../../campaignData';
import { exportCampaignToJson, importCampaignFromJson } from '../../utils/campaignExport';

interface CampaignExportImportProps {
  campaignId: number;
}

const CampaignExportImport: React.FC<CampaignExportImportProps> = ({ campaignId }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const campaign = campaignData.find(c => c.id === campaignId);
    
    if (!campaign) {
      toast({
        title: "Error",
        description: "Campaign not found",
        variant: "destructive",
      });
      return;
    }
    
    try {
      exportCampaignToJson(campaign);
      toast({
        title: "Campaign Exported",
        description: "Your campaign has been successfully exported",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export campaign",
        variant: "destructive",
      });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedCampaign = await importCampaignFromJson(file);
      
      // Find the campaign index to replace
      const campaignIndex = campaignData.findIndex(c => c.id === campaignId);
      
      if (campaignIndex !== -1) {
        // Preserve the original ID
        importedCampaign.id = campaignId;
        
        // Replace the campaign in the array
        campaignData[campaignIndex] = importedCampaign;
        
        toast({
          title: "Campaign Imported",
          description: "Your campaign has been successfully imported",
        });
        
        // Reload the page to show the imported campaign
        window.location.reload();
      } else {
        toast({
          title: "Import Failed",
          description: "Campaign not found",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to import campaign",
        variant: "destructive",
      });
    }
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExport}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleImportClick}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Import
      </Button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
    </div>
  );
};

export default CampaignExportImport;
