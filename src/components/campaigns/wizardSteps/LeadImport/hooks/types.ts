
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
