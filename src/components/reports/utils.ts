
import { campaignData } from '@/components/campaigns/campaignData';
import { TeamMember } from '@/components/team/types';
import { 
  CampaignMetric, 
  LeadMetric, 
  MessageMetric, 
  PerformanceMetric 
} from './types';

// Generate campaign performance data
export const getCampaignPerformanceData = (campaigns = campaignData): CampaignMetric[] => {
  return campaigns.map(campaign => {
    // Calculate total leads
    const totalLeads = typeof campaign.leads === 'number' 
      ? campaign.leads 
      : Array.isArray(campaign.leads) 
        ? campaign.leads.length 
        : 0;
    
    // Calculate responses
    const responses = campaign.responses || Math.floor(totalLeads * 0.4);
    
    // Calculate conversions (positive responses that led to next stage)
    const conversions = campaign.positive || Math.floor(responses * 0.3);
    
    // Calculate rates
    const responseRate = totalLeads > 0 ? Math.round((responses / totalLeads) * 100) : 0;
    const conversionRate = responses > 0 ? Math.round((conversions / responses) * 100) : 0;
    
    return {
      id: campaign.id,
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

// Generate lead metrics data
export const getLeadMetricsData = (): LeadMetric[] => {
  return campaignData.map(campaign => {
    // Calculate total leads
    const totalLeads = typeof campaign.leads === 'number' 
      ? campaign.leads 
      : Array.isArray(campaign.leads) 
        ? campaign.leads.length 
        : 0;
    
    // Generate mock lead metrics
    const newLeads = Math.floor(totalLeads * 0.2);
    const contacted = Math.floor(totalLeads * 0.6);
    const responded = Math.floor(contacted * 0.4);
    const interested = Math.floor(responded * 0.6);
    const converted = Math.floor(interested * 0.4);
    
    // Calculate response rate
    const responseRate = contacted > 0 ? Math.round((responded / contacted) * 100) : 0;
    
    return {
      campaignId: campaign.id,
      campaignName: campaign.name,
      newLeads,
      contacted,
      responded,
      interested,
      converted,
      responseRate
    };
  });
};

// Generate message metrics data
export const getMessageMetricsData = (): MessageMetric[] => {
  const templates = [
    'Introduction Email',
    'Follow-up Message',
    'LinkedIn Connection',
    'Meeting Request',
    'Value Proposition',
    'Case Study Share',
    'Testimonial Email'
  ];
  
  const platforms = [
    'Email',
    'LinkedIn',
    'Twitter',
    'Phone',
    'WhatsApp'
  ];
  
  // Generate 15 message metric entries
  const messageMetrics: MessageMetric[] = [];
  
  for (let i = 0; i < 15; i++) {
    const campaignIndex = i % campaignData.length;
    const templateIndex = i % templates.length;
    const platformIndex = i % platforms.length;
    
    const campaign = campaignData[campaignIndex];
    const template = templates[templateIndex];
    const platform = platforms[platformIndex];
    
    // Generate random metrics
    const sent = Math.floor(Math.random() * 100) + 50;
    const opened = Math.floor(sent * (Math.random() * 0.4 + 0.4)); // 40-80% open rate
    const responded = Math.floor(opened * (Math.random() * 0.3 + 0.1)); // 10-40% response rate
    
    // Calculate rates
    const openRate = Math.round((opened / sent) * 100);
    const responseRate = Math.round((responded / opened) * 100);
    
    messageMetrics.push({
      templateName: template,
      platform,
      campaignId: campaign.id,
      campaignName: campaign.name,
      sent,
      opened,
      responded,
      openRate,
      responseRate
    });
  }
  
  return messageMetrics;
};

// Generate team performance data
export const getTeamPerformanceData = (teamMembers: TeamMember[]): PerformanceMetric[] => {
  // If there are no team members, return an empty array
  if (teamMembers.length === 0) {
    return [];
  }
  
  return teamMembers.map(member => {
    // Generate performance metrics
    const leadsAssigned = Math.floor(Math.random() * 50) + 20;
    const leadsContacted = Math.floor(leadsAssigned * (Math.random() * 0.3 + 0.6)); // 60-90% contact rate
    const leadsResponded = Math.floor(leadsContacted * (Math.random() * 0.4 + 0.2)); // 20-60% response rate
    const leadsConverted = Math.floor(leadsResponded * (Math.random() * 0.4 + 0.1)); // 10-50% conversion rate
    
    // Calculate rates
    const responseRate = Math.round((leadsResponded / leadsContacted) * 100);
    const conversionRate = Math.round((leadsConverted / leadsResponded) * 100);
    
    return {
      id: member.id,
      name: member.name,
      role: member.role,
      leadsAssigned,
      leadsContacted,
      leadsResponded,
      leadsConverted,
      responseRate,
      conversionRate
    };
  });
};
