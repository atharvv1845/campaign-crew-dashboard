
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, FileText, BarChart, Users, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CampaignTable from '@/components/campaigns/CampaignTable';
import CreateCampaign from '@/components/campaigns/CreateCampaign';
import { campaignData } from '@/components/campaigns/campaignData';
import { useToast } from '@/hooks/use-toast';

const CampaignManagement: React.FC = () => {
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
      
      {/* Campaign Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.active} active, {stats.draft} draft, {stats.completed} completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all campaigns</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResponses}</div>
            <p className="text-xs text-muted-foreground mt-1">From all outreach efforts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}</div>
            <p className="text-xs text-muted-foreground mt-1">Positive responses / total leads</p>
          </CardContent>
        </Card>
      </div>
      
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
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              <div className="absolute left-3 top-2.5 text-muted-foreground">
                <Filter className="h-4 w-4" />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Campaign Table */}
          <div className="flex-1 overflow-hidden cursor-pointer">
            <div className="h-full overflow-y-auto pb-4">
              <CampaignTable 
                campaigns={filteredCampaigns}
                refreshList={refreshCampaigns} 
                onCampaignClick={handleCampaignClick}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reporting" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {campaigns.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <BarChart className="h-12 w-12 text-muted-foreground opacity-40" />
                  <h3 className="mt-4 text-lg font-medium">No Campaign Data</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    Create your first campaign to begin tracking and visualizing your outreach performance metrics.
                  </p>
                  <Button 
                    onClick={() => setShowCreateCampaign(true)}
                    className="mt-6"
                    variant="outline"
                  >
                    Create First Campaign
                  </Button>
                </div>
              ) : (
                <div className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Campaign performance charts will appear here when you have active campaigns with data.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leads" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground opacity-40" />
                <h3 className="mt-4 text-lg font-medium">Unified Lead View</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  View and manage all leads across all campaigns in one place. Import your leads to get started.
                </p>
                <Button 
                  onClick={() => setShowCreateCampaign(true)}
                  className="mt-6"
                  variant="outline"
                >
                  Import Leads
                </Button>
              </div>
            </CardContent>
          </Card>
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
