
export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  linkedin?: string;
  whatsapp?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  firstContacted?: string;
  lastContacted: string;
  currentStage: string;
  assignedTo: string;
  followUpDate?: string;
  notes?: string;
  campaignId?: number;
  // Optional fields for backward compatibility
  title?: string;
  status?: string;
  lastContact?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  socialProfiles?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export interface CampaignStage {
  id: number;
  name: string;
  count: number;
}

export interface Campaign {
  stages: CampaignStage[];
  leads: number;
  teamMembers?: string[];
}
