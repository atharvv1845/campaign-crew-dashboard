
import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText, BarChart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateCampaign from '@/components/campaigns/CreateCampaign';
import { campaignData } from '@/components/campaigns/campaignData';
import { useToast } from '@/hooks/use-toast';
import { useCampaignStats } from '@/hooks/useCampaignStats';
import CampaignStatistics from '@/components/campaigns/management/CampaignStatistics';
import CampaignsTabContent from '@/components/campaigns/management/CampaignsTabContent';
import ReportingTabContent from '@/components/campaigns/management/ReportingTabContent';
import LeadsTabContent from '@/components/campaigns/management/LeadsTabContent';

const CampaignManagement: React.FC = () => {
  const { toast } = useToast();
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [campaigns, setCampaigns] = useState([...campaignData]);
  const { stats, calculateStats } = useCampaignStats();
  
  const refreshCampaigns = () => {
    console.log("Refreshing campaign list");
    setCampaigns([...campaignData]);
    calculateStats();
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

  return (
    <div className="space-y-6 h-[calc(100vh-6rem)] flex flex-col p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Campaign Management</h1>
        <Button 
          onClick={() => setShowCreateCampaign(true)}
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>
      
      <CampaignStatistics stats={stats} />
      
      <Tabs defaultValue="campaigns" className="flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Campaigns</span>
          </TabsTrigger>
          <TabsTrigger value="reporting" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Reporting</span>
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>All Leads</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="flex-1 flex flex-col space-y-4 mt-4">
          <CampaignsTabContent
            campaigns={campaigns}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            refreshCampaigns={refreshCampaigns}
          />
        </TabsContent>
        
        <TabsContent value="reporting" className="space-y-4 mt-4">
          <ReportingTabContent 
            campaigns={campaigns} 
            onCreateCampaignClick={() => setShowCreateCampaign(true)} 
          />
        </TabsContent>
        
        <TabsContent value="leads" className="space-y-4 mt-4">
          <LeadsTabContent onImportLeadsClick={() => setShowCreateCampaign(true)} />
        </TabsContent>
      </Tabs>
      
      {showCreateCampaign && (
        <CreateCampaign 
          onClose={(campaign) => {
            if (campaign) {
              handleCampaignCreated();
            } else {
              setShowCreateCampaign(false);
            }
          }} 
        />
      )}
    </div>
  );
};

export default CampaignManagement;
