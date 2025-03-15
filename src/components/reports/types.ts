
// Campaign Performance Metric Type
export interface CampaignMetric {
  id: string | number;
  name: string;
  status: string;
  totalLeads: number;
  responses: number;
  conversions: number;
  responseRate: number;
  conversionRate: number;
}

// Lead Metrics Type
export interface LeadMetric {
  campaignId: string | number;
  campaignName: string;
  newLeads: number;
  contacted: number;
  responded: number;
  interested: number;
  converted: number;
  responseRate: number;
}

// Message Metrics Type
export interface MessageMetric {
  templateName: string;
  platform: string;
  campaignId: string | number;
  campaignName: string;
  sent: number;
  opened: number;
  responded: number;
  openRate: number;
  responseRate: number;
}

// Team Performance Metric Type
export interface PerformanceMetric {
  id: string;
  name: string;
  role: string;
  leadsAssigned: number;
  leadsContacted: number;
  leadsResponded: number;
  leadsConverted: number;
  responseRate: number;
  conversionRate: number;
}
