
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import CampaignTable from './CampaignTable';
import CampaignFilters from './CampaignFilters';
import CreateCampaign from './CreateCampaign';
import { campaignData } from './campaignData';
import { useToast } from '@/hooks/use-toast';

const CampaignList: React.FC = () => {
  const { toast } = useToast();
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [campaigns, setCampaigns] = useState([...campaignData]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Update campaigns when campaignData changes or when modal closes
  useEffect(() => {
    console.log("Refreshing campaign list data, found:", campaignData.length);
    setCampaigns([...campaignData]);
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
  
  const handleCampaignCreated = () => {
    // Force refresh of campaign data
    setCampaigns([...campaignData]);
    setRefreshTrigger(prev => prev + 1);
    setShowCreateCampaign(false);
    
    toast({
      title: "Success",
      description: "Campaign has been successfully created."
    });
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
            refreshList={() => setRefreshTrigger(prev => prev + 1)} 
          />
        </div>
      </div>
      
      {showCreateCampaign && (
        <CreateCampaign 
          onClose={handleCampaignCreated} 
        />
      )}
    </div>
  );
};

export default CampaignList;
