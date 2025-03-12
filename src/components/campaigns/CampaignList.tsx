
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
  
  // Update campaigns when campaignData changes or when modal closes
  useEffect(() => {
    console.log("Refreshing campaign list data, found:", campaignData.length);
    // Create a deep copy to avoid reference issues
    const campaignsCopy = JSON.parse(JSON.stringify(campaignData));
    
    // Ensure each campaign has all required fields with default values
    const sanitizedCampaigns = campaignsCopy.map((campaign: any) => ({
      ...campaign,
      channels: campaign.channels || [],
      teamMembers: campaign.teamMembers || [],
      createdAt: campaign.createdAt || new Date().toISOString().slice(0, 10),
      leads: campaign.leads || 0,
      responses: campaign.responses || 0
    }));
    
    setCampaigns(sanitizedCampaigns);
  }, [showCreateCampaign, refreshTrigger]);
  
  // Filter campaigns based on search term and status
  const filteredCampaigns = campaigns.filter(campaign => {
    // Apply search filter
    const matchesSearch = 
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter if not "All"
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
    
    // Return true if both conditions are met
    return matchesSearch && matchesStatus;
  });
  
  const handleCampaignCreated = (campaign: CampaignFormData) => {
    // Find the new campaign in the campaignData array
    const newCampaignId = campaignData[campaignData.length - 1].id;
    
    // Force refresh of campaign data
    setRefreshTrigger(prev => prev + 1);
    
    // Close the campaign creation modal
    setShowCreateCampaign(false);
    
    // Set the created campaign to show the summary
    setCreatedCampaign(campaign);
    
    toast({
      title: "Success",
      description: "Campaign has been successfully created."
    });
    
    // Navigate to the new campaign after a short delay
    setTimeout(() => {
      navigate(`/campaigns/${newCampaignId}`);
    }, 1000);
  };
  
  const refreshList = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  const handleLeadUpdate = (leadId: string, updates: Partial<LeadData>) => {
    if (!createdCampaign) return;
    
    // Update the lead in the created campaign
    const updatedLeads = createdCampaign.leads.map(lead => 
      lead.id === leadId ? { ...lead, ...updates } : lead
    );
    
    setCreatedCampaign({
      ...createdCampaign,
      leads: updatedLeads
    });
    
    // In a real app, this would also update the lead in the database
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
          onClose={() => setCreatedCampaign(null)}
          onLeadUpdate={handleLeadUpdate}
        />
      )}
    </div>
  );
};

export default CampaignList;
