
import { 
  CampaignMetric, 
  LeadMetric, 
  MessageMetric, 
  PerformanceMetric 
} from './types';
import { CampaignData } from '@/components/campaigns/campaignData';

// Generate campaign performance metrics from campaign data
export const getCampaignPerformanceData = (campaigns: CampaignData[]): CampaignMetric[] => {
  return campaigns.map(campaign => {
    const totalLeads = typeof campaign.leads === 'number' 
      ? campaign.leads 
      : Array.isArray(campaign.leads) ? campaign.leads.length : 0;
    
    const responses = campaign.responses || 0;
    const conversions = campaign.positive || 0;
    
    const responseRate = totalLeads > 0 ? (responses / totalLeads) * 100 : 0;
    const conversionRate = responses > 0 ? (conversions / responses) * 100 : 0;
    
    return {
      id: typeof campaign.id === 'string' ? campaign.id : campaign.id.toString(),
      name: campaign.name,
      status: campaign.status,
      totalLeads,
      responses,
      conversions,
      responseRate,
      conversionRate
    };
  });
};

// Generate mock lead metrics data - in a real app, this would come from an API
export const getLeadMetricsData = (): LeadMetric[] => {
  return [
    {
      campaignId: 1,
      campaignName: 'Email Outreach Q2',
      newLeads: 150,
      contacted: 120,
      responded: 45,
      interested: 30,
      converted: 15,
      responseRate: 37.5
    },
    {
      campaignId: 2,
      campaignName: 'LinkedIn Prospecting',
      newLeads: 100,
      contacted: 85,
      responded: 42,
      interested: 28,
      converted: 12,
      responseRate: 49.4
    },
    {
      campaignId: 3,
      campaignName: 'Conference Follow-ups',
      newLeads: 75,
      contacted: 70,
      responded: 38,
      interested: 25,
      converted: 18,
      responseRate: 54.3
    },
    {
      campaignId: 4,
      campaignName: 'Product Launch Outreach',
      newLeads: 200,
      contacted: 180,
      responded: 65,
      interested: 40,
      converted: 25,
      responseRate: 36.1
    },
    {
      campaignId: 5,
      campaignName: 'Webinar Registration',
      newLeads: 300,
      contacted: 250,
      responded: 100,
      interested: 80,
      converted: 45,
      responseRate: 40.0
    }
  ];
};

// Generate mock message metrics data
export const getMessageMetricsData = (): MessageMetric[] => {
  return [
    {
      templateName: 'Initial Outreach',
      platform: 'Email',
      campaignId: 1,
      campaignName: 'Email Outreach Q2',
      sent: 120,
      opened: 75,
      responded: 30,
      openRate: 62.5,
      responseRate: 25.0
    },
    {
      templateName: 'Follow-up Message',
      platform: 'Email',
      campaignId: 1,
      campaignName: 'Email Outreach Q2',
      sent: 90,
      opened: 68,
      responded: 22,
      openRate: 75.6,
      responseRate: 24.4
    },
    {
      templateName: 'Connection Request',
      platform: 'LinkedIn',
      campaignId: 2,
      campaignName: 'LinkedIn Prospecting',
      sent: 85,
      opened: 70,
      responded: 42,
      openRate: 82.4,
      responseRate: 49.4
    },
    {
      templateName: 'Conference Reminder',
      platform: 'Email',
      campaignId: 3,
      campaignName: 'Conference Follow-ups',
      sent: 70,
      opened: 55,
      responded: 38,
      openRate: 78.6,
      responseRate: 54.3
    },
    {
      templateName: 'Product Announcement',
      platform: 'Email',
      campaignId: 4,
      campaignName: 'Product Launch Outreach',
      sent: 180,
      opened: 110,
      responded: 65,
      openRate: 61.1,
      responseRate: 36.1
    },
    {
      templateName: 'Webinar Invitation',
      platform: 'Email',
      campaignId: 5,
      campaignName: 'Webinar Registration',
      sent: 250,
      opened: 150,
      responded: 100,
      openRate: 60.0,
      responseRate: 40.0
    },
    {
      templateName: 'LinkedIn Message',
      platform: 'LinkedIn',
      campaignId: 2,
      campaignName: 'LinkedIn Prospecting',
      sent: 65,
      opened: 50,
      responded: 30,
      openRate: 76.9,
      responseRate: 46.2
    },
    {
      templateName: 'SMS Reminder',
      platform: 'SMS',
      campaignId: 3,
      campaignName: 'Conference Follow-ups',
      sent: 50,
      opened: 48,
      responded: 30,
      openRate: 96.0,
      responseRate: 60.0
    },
    {
      templateName: 'Phone Call Follow-up',
      platform: 'Phone',
      campaignId: 4,
      campaignName: 'Product Launch Outreach',
      sent: 100,
      opened: 100,
      responded: 55,
      openRate: 100.0,
      responseRate: 55.0
    },
    {
      templateName: 'WhatsApp Message',
      platform: 'WhatsApp',
      campaignId: 5,
      campaignName: 'Webinar Registration',
      sent: 120,
      opened: 110,
      responded: 65,
      openRate: 91.7,
      responseRate: 54.2
    }
  ];
};

// Generate team performance data
export const getTeamPerformanceData = (teamMembers: any[]): PerformanceMetric[] => {
  return teamMembers.map(member => {
    // Generate random metrics for demonstration purposes
    const leadsAssigned = Math.floor(Math.random() * 100) + 50; // 50-150
    const leadsContacted = Math.floor(leadsAssigned * (Math.random() * 0.3 + 0.6)); // 60-90% of assigned
    const leadsResponded = Math.floor(leadsContacted * (Math.random() * 0.3 + 0.3)); // 30-60% of contacted
    const leadsConverted = Math.floor(leadsResponded * (Math.random() * 0.3 + 0.2)); // 20-50% of responded
    
    const responseRate = leadsContacted > 0 ? (leadsResponded / leadsContacted) * 100 : 0;
    const conversionRate = leadsResponded > 0 ? (leadsConverted / leadsResponded) * 100 : 0;
    
    return {
      id: member.id,
      name: member.name,
      role: member.role || 'Sales Representative',
      leadsAssigned,
      leadsContacted,
      leadsResponded,
      leadsConverted,
      responseRate,
      conversionRate
    };
  });
};
