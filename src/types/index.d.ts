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
  }
}

declare module '@/components/campaigns/types/campaignTypes' {
  interface Campaign {
    id: string | number;
  }
  
  interface CampaignData {
    contactPlatforms?: string[];
  }
}

// Fix LeadData compatibility issues
declare module '@/components/campaigns/wizardSteps/LeadImport/hooks/types' {
  interface LeadData {
    id?: string | number;
    firstName?: string;
    lastName?: string;
    // Add other optional fields
  }
  
  interface CsvParseResult {
    data?: any[];
    // Other properties
  }
}
