
export interface CsvParseResult {
  headers: string[];
  preview: Record<string, string>[];
  initialMapping: Record<string, string>;
  data?: any[]; // Add data property to fix the errors
}

// Add additional type definitions as needed
export interface ImportStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface LeadData {
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
  // Unified date field names to support both property patterns
  lastContact?: Date | string;
  lastContacted?: Date | string;
  nextFollowUpDate?: Date | string;
  followUpDate?: Date | string;
  firstContactDate?: Date | string;
  assignedTo?: string;
  assignedTeamMember?: string;
  // Social media and contact methods
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  notes?: string;
  // Make contactMethods and socialProfiles more flexible to support both formats
  socialProfiles?: Record<string, string> | { 
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  contactMethods?: Record<string, string> | string[];
  contacted?: boolean;
  contactPlatforms?: string[];
  tags?: string[];
}
