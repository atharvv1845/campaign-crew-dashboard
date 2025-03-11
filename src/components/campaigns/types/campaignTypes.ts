import { Node, Edge } from 'reactflow';

// Campaign form data structure
export interface CampaignFormData {
  name: string;
  description: string;
  channels: string[];
  stages: StageData[];
  teamAssignments: Record<string, string[]>;
  messages: Record<string, string>;
  notes: string;
  shareNotes: boolean;
  leads: LeadData[];
  messageFlow: {
    nodes: Node[];
    edges: Edge[];
  };
  stepFlows: Record<string, any>;
}

// Lead data structure
export interface LeadData {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  status: string;
  assignedTo?: string;
  notes?: string;
  socialProfiles?: Record<string, string>;
  source?: string;
}

// Stage data structure
export interface StageData {
  id: string;
  name: string;
  description: string;
  color: string;
  order?: number; // Add order property
}

// Message step data
export interface MessageStepData {
  id: string;
  type: 'message';
  channel: string;
  templateId?: string;
  content: string;
  subject?: string;
}

// Delay step data
export interface DelayStepData {
  id: string;
  type: 'delay';
  duration: number;
  unit: 'hours' | 'days' | 'weeks';
}

// Condition step data
export interface ConditionStepData {
  id: string;
  type: 'condition';
  field: string;
  operator: string;
  value: string;
  truePath: string[];
  falsePath: string[];
}

// Flow data structure
export interface FlowData {
  steps: Record<string, FlowStepData>;
  connections: Array<{from: string, to: string}>;
  startNode: string | null;
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

// Export these for use in MessageFlow.tsx
export type MessageStep = MessageStepData;
export type DelayStep = DelayStepData;
export type ConditionStep = ConditionStepData;
export type FlowStepData = MessageStepData | DelayStepData | ConditionStepData;
