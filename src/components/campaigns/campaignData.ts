
export interface CampaignData {
  id: number;
  name: string;
  status: string;
  type: string;
  channels: string[];
  leads: number;
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
  stages?: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  leadsData?: any[];
}

// Empty initial data array - will be populated by actual data
export const campaignData: CampaignData[] = [];
