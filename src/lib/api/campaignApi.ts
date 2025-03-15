
import { campaignData } from '@/components/campaigns/campaignData';

// Function to fetch all campaigns
export const fetchAllCampaigns = async () => {
  // In a real application, this would be an API call
  // For now, we'll just return the mock data with a simulated delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(campaignData);
    }, 500);
  });
};

// Function to fetch a single campaign by ID
export const fetchCampaignById = async (id: string | number) => {
  // In a real application, this would be an API call
  // For now, we'll just filter the mock data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const campaign = campaignData.find(c => c.id.toString() === id.toString());
      if (campaign) {
        resolve(campaign);
      } else {
        reject(new Error(`Campaign with ID ${id} not found`));
      }
    }, 300);
  });
};

// Function to update a campaign
export const updateCampaign = async (campaignId: string | number, data: any) => {
  // In a real application, this would be an API call
  // For now, we'll just update the mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = campaignData.findIndex(c => c.id.toString() === campaignId.toString());
      if (index !== -1) {
        campaignData[index] = { ...campaignData[index], ...data };
        resolve(campaignData[index]);
      } else {
        // Add a new campaign if it doesn't exist
        const newCampaign = { id: campaignId, ...data };
        campaignData.push(newCampaign);
        resolve(newCampaign);
      }
    }, 300);
  });
};

// Function to update a lead in a campaign
export const updateLead = async (campaignId: string | number, leadId: string | number, data: any) => {
  // In a real application, this would be an API call
  // For now, we'll just update the mock data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const campaignIndex = campaignData.findIndex(c => c.id.toString() === campaignId.toString());
      if (campaignIndex !== -1) {
        const campaign = campaignData[campaignIndex];
        if (Array.isArray(campaign.leads)) {
          const leadIndex = campaign.leads.findIndex((l: any) => l.id.toString() === leadId.toString());
          if (leadIndex !== -1) {
            campaign.leads[leadIndex] = { ...campaign.leads[leadIndex], ...data };
            resolve(campaign.leads[leadIndex]);
          } else {
            reject(new Error(`Lead with ID ${leadId} not found in campaign ${campaignId}`));
          }
        } else {
          reject(new Error(`Campaign ${campaignId} has no leads array`));
        }
      } else {
        reject(new Error(`Campaign with ID ${campaignId} not found`));
      }
    }, 300);
  });
};
