
import { saveAs } from 'file-saver';
import { CampaignData } from '../campaignData';

/**
 * Export a campaign to a JSON file
 */
export function exportCampaignToJson(campaign: CampaignData) {
  // Create a copy of the campaign data to avoid modifying the original
  const campaignExport = { ...campaign };
  
  // Add metadata for import validation
  const exportData = {
    exportedAt: new Date().toISOString(),
    version: '1.0',
    campaignData: campaignExport
  };
  
  // Convert to JSON string
  const jsonString = JSON.stringify(exportData, null, 2);
  
  // Create a blob and save it
  const blob = new Blob([jsonString], { type: 'application/json' });
  saveAs(blob, `campaign-${campaign.id}-${campaign.name.replace(/\s+/g, '-').toLowerCase()}.json`);
}

/**
 * Import a campaign from a JSON file
 */
export function importCampaignFromJson(file: File): Promise<CampaignData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          throw new Error('Failed to read file');
        }
        
        const json = JSON.parse(event.target.result as string);
        
        // Validate the imported data
        if (!json.campaignData || !json.version) {
          throw new Error('Invalid campaign file format');
        }
        
        // Extract the campaign data
        const importedCampaign = json.campaignData as CampaignData;
        
        // Return the validated campaign
        resolve(importedCampaign);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
}
