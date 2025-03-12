
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { campaignData } from '../campaignData';
import LeadTable from './leads/LeadTable';
import StatusBadge from './components/StatusBadge';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    // Simulate API call to fetch campaign data
    setTimeout(() => {
      const foundCampaign = campaignData.find(c => c.id === parseInt(id));
      
      if (foundCampaign) {
        // Create dummy leads if they don't exist as objects already
        if (typeof foundCampaign.leads === 'number') {
          const dummyLeads = Array.from({ length: foundCampaign.leads }, (_, i) => ({
            id: i + 1,
            name: `Lead ${i + 1}`,
            email: `lead${i + 1}@example.com`,
            company: `Company ${i + 1}`,
            status: ['Pending', 'Contacted', 'Interested', 'Not Interested', 'Converted'][Math.floor(Math.random() * 5)],
            lastContact: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            campaignId: parseInt(id)
          }));
          
          foundCampaign.leadsData = dummyLeads;
        }
        
        setCampaign(foundCampaign);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Campaign Not Found</h2>
        <p className="mt-2 text-muted-foreground">The campaign you're looking for doesn't exist or has been deleted.</p>
        <Button 
          className="mt-4" 
          onClick={() => navigate('/campaigns')}
        >
          Back to Campaigns
        </Button>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate('/campaigns');
  };

  const handleUpdateLeadStatus = (leadId: number, newStatus: string) => {
    // Update in local state first (optimistic update)
    const updatedLeadsData = campaign.leadsData.map((lead: any) => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    
    setCampaign(prev => ({
      ...prev,
      leadsData: updatedLeadsData
    }));
    
    // Show success message
    toast({
      title: "Lead status updated",
      description: `Lead status has been changed to ${newStatus}`,
    });
    
    // In a real app, you would make an API call here to update the backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{campaign.name}</h1>
            <div className="flex items-center mt-1">
              <StatusBadge status={campaign.status} />
            </div>
          </div>
        </div>
        
        <Button>Edit Campaign</Button>
      </div>
      
      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {typeof campaign.leads === 'number' ? campaign.leads : campaign.leads.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.responses || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.conversion || '0%'}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {campaign.leadsData && campaign.leadsData.length > 0 ? (
            <LeadTable 
              leads={campaign.leadsData} 
              onStatusChange={handleUpdateLeadStatus} 
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No lead details available for this campaign.</p>
              <Button className="mt-4">Import Leads</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignDetail;
