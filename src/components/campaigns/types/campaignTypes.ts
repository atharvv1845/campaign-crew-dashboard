
import { Node, Edge } from 'reactflow';

// Campaign form data structure
export interface CampaignFormData {
  name: string;
  description: string;
  channels: string[];
  stages: StageData[];
  team: string[]; // Adding the team property
  leads: LeadData[];
  flows: any[]; // Adding the flows property
  messageFlow: {
    nodes: Node[];
    edges: Edge[];
  };
  teamAssignments?: Record<string, string[]>;
  messages?: Record<string, string>;
  notes?: string;
  shareNotes?: boolean;
  stepFlows?: Record<string, MessageStep[]>;
  contactPlatforms?: string[]; // Platforms for contacting leads (same as channels)
  customPlatforms?: Array<{ id: string; name: string }>; // Custom contact platforms added by user
}

// Campaign data structure
export interface CampaignData {
  id: number | string;
  name: string;
  status: string;
  type: string;
  channels: string[];
  leads: number | LeadData[];
  responses: number;
  positive: number;
  negative: number;
  conversion: string;
  teamMembers: string[];
  createdAt: string;
  description: string;
  messageFlow?: {
    nodes: Node[];
    edges: Edge[];
  };
  contacted?: number;
  contactPlatforms?: string[]; // Same as channels
  customPlatforms?: Array<{ id: string; name: string }>;
  stages?: any[]; // Campaign stages
  leadsData?: LeadData[]; // Processed leads data
}

// Lead data structure
export interface LeadData {
  id: string | number;
  firstName: string;
  lastName: string;
  name?: string;
  company?: string;
  email: string;
  phone?: string;
  status: string;
  assignedTo?: string;
  assignedTeamMember?: string;
  notes?: string;
  socialProfiles?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    [key: string]: string | undefined; // Allow for custom platform fields
  };
  source?: string;
  statusName?: string; // Added this optional property for temporary use during import
  contactPlatforms?: string[]; // Platforms this lead can be contacted on (same as channels)
  campaignId: string | number;
  campaign?: string;
  lastContact?: string;
  firstContactDate?: string;
  nextFollowUpDate?: string;
  
  // For consistency with existing code using these properties
  currentStage?: string;
}

// Stage data structure
export interface StageData {
  id: string;
  name: string;
  description: string;
  color: string;
  order?: number;
}

// Message step data
export interface MessageStep {
  id: string;
  type: 'message' | 'delay' | 'condition';
  channel?: string;
  order: number;
  data: MessageStepData | DelayStepData | ConditionStepData;
}

// Message step specific data
export interface MessageStepData {
  id?: string;
  type?: string;
  label?: string;
  message: string;
  assignedTo: string;
  templateId?: string;
  subject?: string;
  channel?: string;
  platform?: string;
  content?: string;
}

// Delay step data
export interface DelayStepData {
  id?: string;
  type?: string;
  label?: string;
  days: number;
  hours?: number;
  delay?: string;
}

// Condition step data
export interface ConditionStepData {
  id?: string;
  type?: string;
  label?: string;
  condition: string;
  action?: string;
  targetStage?: string;
  waitDays?: number;
}

// Default stages for new campaigns
export const defaultStages: StageData[] = [
  {
    id: 'new',
    name: 'New',
    description: 'Lead has been added to the campaign',
    color: 'bg-blue-500',
    order: 1,
  },
  {
    id: 'contacted',
    name: 'Contacted',
    description: 'Initial contact has been made',
    color: 'bg-purple-500',
    order: 2,
  },
  {
    id: 'interested',
    name: 'Interested',
    description: 'Lead has shown interest',
    color: 'bg-green-500',
    order: 3,
  },
  {
    id: 'qualified',
    name: 'Qualified',
    description: 'Lead has been qualified as a good fit',
    color: 'bg-yellow-500',
    order: 4,
  },
  {
    id: 'meeting',
    name: 'Meeting Scheduled',
    description: 'Meeting has been scheduled',
    color: 'bg-orange-500',
    order: 5,
  },
  {
    id: 'closed',
    name: 'Closed',
    description: 'Deal has been closed',
    color: 'bg-green-700',
    order: 6,
  },
  {
    id: 'lost',
    name: 'Lost',
    description: 'Opportunity has been lost',
    color: 'bg-red-500',
    order: 7,
  },
];

// Type aliases for MessageFlow.tsx
export type FlowStepData = MessageStepData | DelayStepData | ConditionStepData;
