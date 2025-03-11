
// Define the campaign data structure
export interface CampaignFormData {
  name: string;
  description: string;
  channels: string[];
  stages: { id: string; name: string; order: number }[];
  teamAssignments: Record<string, string[]>;
  messages: Record<string, string>;
  notes: string;
  shareNotes: boolean;
  leads: LeadData[];
  messageFlow: FlowData;
}

// Lead data structure
export interface LeadData {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  socialProfiles?: Record<string, string>;
  status: string;
  assignedTo?: string;
  notes?: string;
  source: 'manual' | 'csv';
}

// Message flow data structure
export interface FlowData {
  nodes: any[];
  edges: any[];
}

// Default stages for the campaign
export const defaultStages = [
  { id: '1', name: 'Not Contacted', order: 1 },
  { id: '2', name: 'Contacted', order: 2 },
  { id: '3', name: 'Follow-Up Needed', order: 3 },
  { id: '4', name: 'Positive Response', order: 4 },
  { id: '5', name: 'Converted', order: 5 },
];
