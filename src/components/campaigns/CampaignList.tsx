import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CampaignTable from './CampaignTable';
import CampaignFilters from './CampaignFilters';
import CreateCampaign from './CreateCampaign';
import CampaignCreatedSummary from './CampaignCreatedSummary';
import { campaignData } from './campaignData';
import { useToast } from '@/hooks/use-toast';
import { CampaignFormData, LeadData } from './types/campaignTypes';

const CampaignList: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [campaigns, setCampaigns] = useState([...campaignData]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [createdCampaign, setCreatedCampaign] = useState<CampaignFormData | null>(null);
  
  const refreshList = () => {
    console.log("Manually refreshing campaign list");
    setCampaigns([...campaignData]); // Directly update campaigns state
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    console.log("Refreshing campaign list data, found:", campaignData.length, "campaigns");
    
    const sanitizedCampaigns = campaignData.map(campaign => ({
      id: campaign.id,
      name: campaign.name || 'Untitled Campaign',
      description: campaign.description || '',
      status: campaign.status || 'Draft',
      type: campaign.type || 'Email',
      channels: campaign.channels || [],
      leads: campaign.leads || 0,
      responses: campaign.responses || 0,
      positive: campaign.positive || 0,
      negative: campaign.negative || 0,
      conversion: campaign.conversion || '0%',
      teamMembers: campaign.teamMembers || [],
      createdAt: campaign.createdAt || new Date().toISOString().slice(0, 10),
      contacted: campaign.contacted || 0,
      stages: campaign.stages || [],
      messageFlow: campaign.messageFlow || { nodes: [], edges: [] }
    }));
    
    setCampaigns(sanitizedCampaigns);
  }, [refreshTrigger, showCreateCampaign]);
  
  const handleCampaignCreated = (campaign: CampaignFormData) => {
    const newCampaignId = campaignData[campaignData.length - 1].id;
    console.log("New campaign created with ID:", newCampaignId, "Total campaigns:", campaignData.length);
    
    refreshList(); // Refresh the list immediately
    setShowCreateCampaign(false);
    setCreatedCampaign(campaign);
    
    toast({
      title: "Success",
      description: "Campaign has been successfully created."
    });
    
    setTimeout(() => {
      console.log("Navigating to newly created campaign:", newCampaignId);
      navigate(`/campaigns/${newCampaignId}`);
    }, 1000);
  };
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const handleLeadUpdate = (leadId: string, updates: Partial<LeadData>) => {
    if (!createdCampaign) return;
    
    const updatedLeads = createdCampaign.leads.map(lead => 
      lead.id === leadId ? { ...lead, ...updates } : lead
    );
    
    setCreatedCampaign({
      ...createdCampaign,
      leads: updatedLeads
    });
    
    console.log(`Updated lead ${leadId} with`, updates);
  };
  
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <button
          onClick={() => setShowCreateCampaign(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Create Campaign</span>
        </button>
      </div>
      
      <CampaignFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pb-4">
          <CampaignTable 
            campaigns={filteredCampaigns}
            refreshList={refreshList} 
          />
        </div>
      </div>
      
      {showCreateCampaign && (
        <CreateCampaign 
          onClose={(campaign) => {
            if (campaign) {
              handleCampaignCreated(campaign);
            } else {
              setShowCreateCampaign(false);
            }
          }} 
        />
      )}
      
      {createdCampaign && (
        <CampaignCreatedSummary
          campaign={createdCampaign}
          onClose={() => {
            setCreatedCampaign(null);
            refreshList();
          }}
          onLeadUpdate={handleLeadUpdate}
        />
      )}
    </div>
  );
};

export default CampaignList;
