
export interface Lead {
  id: number | string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  channel?: string;
  status: string;
  lastContact?: string;
  notes?: string;
  campaignId: number | string;
  // Social profiles
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  // Additional fields
  title?: string;
  socialProfiles?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export interface CampaignStage {
  id: number | string;
  name: string;
  count: number;
}

export interface Campaign {
  id: number | string;
  name: string;
  status: string;
  leads: Lead[];
  responses: number;
  positive: number;
  negative: number;
  conversion: string;
  teamMembers: string[];
  stages: CampaignStage[];
  description?: string;
  leadsData?: Lead[];
}
