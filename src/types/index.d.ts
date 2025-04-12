
// Global TypeScript definitions to fix build errors

// Add missing type definitions or property compatibilities
declare module '@/components/campaigns/campaignDetail/leads/types' {
  interface Lead {
    // Make id accept both string and number
    id: string | number;
    
    // These properties can be used interchangeably
    lastContact?: Date | string;
    lastContacted?: Date | string;
    
    nextFollowUpDate?: Date | string;
    followUpDate?: Date | string;

    // Add missing properties that are being referenced
    tags?: string[];
    
    // Add social profiles and contact methods
    socialProfiles?: {
      linkedin?: string;
      twitter?: string;
      facebook?: string;
      instagram?: string;
    };
    contactMethods?: {
      email?: string;
      phone?: string;
      whatsapp?: string;
    };
    contactPlatforms?: string[];
    company?: string;
    title?: string;
    name?: string;
    contacted?: boolean;
    notes?: string;
    assignedTo?: string;
    assignedTeamMember?: string;
  }
}

declare module '@/components/campaigns/types/campaignTypes' {
  interface Campaign {
    id: string | number;
  }
  
  interface CampaignData {
    contactPlatforms?: string[];
  }

  // Fix LeadData to make properties optional and add missing properties
  interface LeadData {
    id?: string | number;
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    status?: string;
    campaignId?: string | number;
    campaign?: string;
    currentStage?: string;
    phone?: string;
    company?: string;
    title?: string;
    lastContact?: Date | string;
    lastContacted?: Date | string;
    nextFollowUpDate?: Date | string;
    followUpDate?: Date | string;
    firstContactDate?: Date | string;
    assignedTo?: string;
    assignedTeamMember?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    notes?: string;
    socialProfiles?: Record<string, string>;
    contactMethods?: Record<string, string>;
    contacted?: boolean;
    contactPlatforms?: string[];
    tags?: string[];
  }
}

// Fix LeadData compatibility issues
declare module '@/components/campaigns/wizardSteps/LeadImport/hooks/types' {
  interface LeadData {
    id?: string | number;
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    status?: string;
    campaignId?: string | number;
    campaign?: string;
    currentStage?: string;
    phone?: string;
    company?: string;
    title?: string;
    lastContact?: Date | string;
    lastContacted?: Date | string;
    nextFollowUpDate?: Date | string;
    followUpDate?: Date | string;
    firstContactDate?: Date | string;
    assignedTo?: string;
    assignedTeamMember?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    notes?: string;
    socialProfiles?: Record<string, string>;
    contactMethods?: Record<string, string>;
    contacted?: boolean;
    contactPlatforms?: string[];
    tags?: string[];
  }
  
  interface CsvParseResult {
    data?: any[];
    headers: string[];
    preview: Record<string, string>[];
    initialMapping: Record<string, string>;
  }
}

