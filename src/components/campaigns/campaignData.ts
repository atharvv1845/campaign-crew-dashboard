
import { Lead } from './campaignDetail/leads/types';

export interface CampaignData {
  id: number | string;
  name: string;
  status: string;
  type: string;
  channels: string[];
  leads: Lead[] | number;
  responses: number;
  positive: number;
  negative: number;
  conversion: string;
  teamMembers: string[];
  createdAt: string;
  description?: string;
  contacted?: number;
  messageFlow?: {
    nodes: any[];
    edges: any[];
  };
  contactPlatforms?: string[]; // Add contactPlatforms property
  stages?: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  leadsData?: Lead[];
}

// Empty initial data array - will be populated by actual data
export const campaignData: CampaignData[] = [];
