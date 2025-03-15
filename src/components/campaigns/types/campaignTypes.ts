
export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  location: string;
  industry: string;
  stage: string;
  [key: string]: any;
}

export interface CampaignFormData {
  name: string;
  description: string;
  channels: string[];
  contactPlatforms: string[];
  stages: Array<{ id: string; name: string }>;
  customStages: Array<{ id: string; name: string }>;
  leadsData: LeadData[];
  teamMembers: Array<{ id: string; name: string; role: string }>;
  createdAt: string;
  customPlatforms?: Array<{ id: string; name: string }>;
  outreachFlowId?: number | null;
}
