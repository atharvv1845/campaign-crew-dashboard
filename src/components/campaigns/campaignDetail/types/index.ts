
import { Lead as OriginalLead } from "@/components/campaigns/campaignDetail/leads/types";

// Adding type compatibility fixes to address build errors
// This helps with property name discrepancies in the codebase

// Extended Lead interface that maps properties with different names
export interface Lead extends OriginalLead {
  // Make id accept both string and number
  id: string | number;
  
  // Adding property aliases for compatibility
  // Support both naming conventions used in the codebase
  lastContact?: Date | string;
  lastContacted?: Date | string;
  nextFollowUpDate?: Date | string;
  followUpDate?: Date | string;
  
  // Optional social media properties
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  
  // Optional additional properties
  contactMethods?: Record<string, string> | string[];
  contacted?: boolean;
  tags?: string[];
  title?: string;
}

// Team performance type
export interface TeamMemberPerformance {
  memberId: string;
  member: string;
  responses: number;
  positive: number;
}

// Ensure CampaignData has contactPlatforms
export interface CampaignDataFix {
  contactPlatforms?: string[];
  // Add other properties as needed
}
