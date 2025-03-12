
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
  leadsData?: Lead[];
  messageFlow?: {
    nodes: any[];
    edges: any[];
  };
  stages?: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

// Example lead data format
export const sampleLeadData: Lead[] = [
  {
    id: 1,
    name: "Rabaily",
    socialProfiles: {
      instagram: "rabaily"
    },
    status: "Pending",
    campaignId: 1
  },
  {
    id: 2,
    name: "JJ Buckner",
    socialProfiles: {
      instagram: "jjbuckner"
    },
    status: "Contacted",
    campaignId: 1
  },
  // Add more sample leads as needed
];

// Empty initial data array - will be populated by actual data
export const campaignData: CampaignData[] = [];
