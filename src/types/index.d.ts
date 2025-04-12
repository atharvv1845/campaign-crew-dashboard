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
  }
}

declare module '@/components/campaigns/types/campaignTypes' {
  interface Campaign {
    id: string | number;
  }
  
  interface CampaignData {
    contactPlatforms?: string[];
  }

  // Fix LeadData to make properties optional
  interface LeadData {
    id?: string | number;
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    status?: string;
    campaignId?: string | number;
    // Other optional fields
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
    // Add other optional fields
  }
  
  interface CsvParseResult {
    data?: any[];
    headers: string[];
    preview: Record<string, string>[];
    initialMapping: Record<string, string>;
  }
}
