
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
  stages: Array<{ id: string; name: string; description?: string; color?: string }>;
  customStages: Array<{ id: string; name: string; description?: string; color?: string }>;
  leadsData: LeadData[];
  teamMembers: Array<{ id: string; name: string; role: string }>;
  createdAt: string;
  customPlatforms?: Array<{ id: string; name: string }>;
  outreachFlowId?: number | null;
  
  // Additional fields needed by the codebase
  leads?: LeadData[];
  team?: Array<{ id: string; name: string; role: string }>;
  messageFlow?: { nodes: any[]; edges: any[] };
  teamAssignments?: any[];
  messages?: any[];
  notes?: string;
  shareNotes?: boolean;
}

export interface StageData {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface MessageStepData {
  id: string;
  type: 'message';
  platform: string;
  subject?: string;
  content: string;
  data?: any;
}

export interface DelayStepData {
  id: string;
  type: 'delay';
  delay: string;
  data?: any;
}

export interface ConditionStepData {
  id: string;
  type: 'condition';
  condition: string;
  target?: string;
  data?: any;
}
