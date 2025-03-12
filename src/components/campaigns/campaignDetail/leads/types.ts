
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
  lastContacted: string;
  currentStage: string;
  assignedTo: string;
  followUpDate?: string;
  notes?: string;
  // Optional fields for backward compatibility
  title?: string;
  status?: string;
  lastContact?: string;
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
