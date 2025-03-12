export interface Lead {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  channel?: string;
  status: string;
  lastContact?: string;
  notes?: string;
  campaignId: number;
  socialProfiles?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    whatsapp?: string;
  };
  firstName?: string;
  lastName?: string;
  currentStage?: string;
  assignedTo?: string;
  followUpDate?: string;
  lastContacted?: string;
  firstContacted?: string;
}

export interface CampaignStage {
  id: number;
  name: string;
  count: number;
}

export interface Campaign {
  id: number;
  name: string;
  status: string;
  leads: Lead[];
  responses: number;
  positive: number;
  negative: number;
  conversion: string;
  teamMembers: string[];
  stages: CampaignStage[];
}
