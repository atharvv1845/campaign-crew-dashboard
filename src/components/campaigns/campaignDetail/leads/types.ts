export interface Lead {
  id: number | string;
  name: string;                 // Required full name
  firstName?: string;           // Optional components
  lastName?: string;
  fullName?: string;            // Alternative to name
  email?: string;
  phone?: string;
  company?: string;
  title?: string;               // Job title
  channel?: string;
  status: string;              // Current status
  currentStage?: string;       // For stage tracking
  assignedTeamMember?: string; // For team assignment
  assignedTo?: string;         // Alias for team assignment
  lastContact?: string;        // For tracking contacts
  lastContacted?: string;      // Alias for lastContact
  firstContactDate?: string;   // First contact tracking
  nextFollowUpDate?: string;   // Next follow-up
  followUpDate?: string;       // Alias for nextFollowUpDate
  notes?: string;
  campaignId: number | string;
  // Social profiles
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  // Additional tracking
  socialProfiles?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  // Contact platforms
  contactPlatforms?: string[];  // Array of enabled contact platforms for this lead
  contactMethods?: Record<string, string> | string[];  // More flexible type to support both usages
  // Metadata
  source?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];  // Add tags support
  contacted?: boolean;  // Flag to indicate if lead has been contacted
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
  leads: Lead[] | number;
  responses: number;
  positive: number;
  negative: number;
  conversion: string;
  teamMembers: string[];
  stages: CampaignStage[];
  description?: string;
  leadsData?: Lead[];
  channels?: string[];         // Communication channels used in this campaign
  contactPlatforms?: string[]; // Contact platforms enabled for this campaign
}
