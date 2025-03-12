
import { useState, useEffect } from 'react';
import { campaignData } from '@/components/campaigns/campaignData';

export const useCampaignStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    draft: 0,
    completed: 0,
    totalLeads: 0,
    totalResponses: 0,
    conversionRate: '0%'
  });

  const calculateStats = () => {
    const total = campaignData.length;
    const active = campaignData.filter(c => c.status === 'Active').length;
    const draft = campaignData.filter(c => c.status === 'Draft').length;
    const completed = campaignData.filter(c => c.status === 'Completed').length;
    
    const totalLeads = campaignData.reduce((sum, campaign) => {
      const leadCount = typeof campaign.leads === 'number' ? campaign.leads : 
                       Array.isArray(campaign.leads) ? campaign.leads.length : 0;
      return sum + leadCount;
    }, 0);
    
    const totalResponses = campaignData.reduce((sum, c) => sum + (c.responses || 0), 0);
    
    const positiveResponses = campaignData.reduce((sum, c) => sum + (c.positive || 0), 0);
    
    const conversionRate = totalLeads > 0 
      ? `${((positiveResponses / totalLeads) * 100).toFixed(1)}%` 
      : '0%';
    
    setStats({
      total,
      active,
      draft,
      completed,
      totalLeads,
      totalResponses,
      conversionRate
    });
  };

  return { stats, calculateStats };
};
