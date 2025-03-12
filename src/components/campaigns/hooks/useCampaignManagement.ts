
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { campaignData } from '../campaignData';
import { useToast } from '@/hooks/use-toast';

export const useCampaignManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [campaigns, setCampaigns] = useState([...campaignData]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Campaign stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    draft: 0,
    completed: 0,
    totalLeads: 0,
    totalResponses: 0,
    conversionRate: '0%'
  });
  
  const refreshCampaigns = () => {
    console.log("Refreshing campaign list");
    setCampaigns([...campaignData]);
    setRefreshTrigger(prev => prev + 1);
    calculateStats();
  };
  
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
  
  useEffect(() => {
    refreshCampaigns();
  }, []);
  
  const handleCampaignCreated = () => {
    refreshCampaigns();
    setShowCreateCampaign(false);
    
    toast({
      title: "Success",
      description: "Campaign has been successfully created."
    });
  };
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const handleCampaignClick = (campaignId: number) => {
    console.log("Navigating to campaign details:", campaignId);
    navigate(`/campaigns/${campaignId}`);
  };

  return {
    showCreateCampaign,
    setShowCreateCampaign,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    campaigns,
    stats,
    refreshCampaigns,
    handleCampaignCreated,
    filteredCampaigns,
    handleCampaignClick
  };
};
