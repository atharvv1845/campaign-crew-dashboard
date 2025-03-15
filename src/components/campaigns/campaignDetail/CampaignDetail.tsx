
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { campaignData } from '../campaignData';
import LeadTable from './leads/LeadTable';
import StatusBadge from './components/StatusBadge';
import { Lead } from './leads/types';
import CreateCampaign from '../CreateCampaign';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    // Find the campaign by ID
    const foundCampaign = campaignData.find(c => String(c.id) === id);
    
    if (foundCampaign) {
      // Use the leads directly if they exist as an array
      if (Array.isArray(foundCampaign.leads)) {
        foundCampaign.leadsData = foundCampaign.leads;
      } 
      // If leadsData already exists, use that
      else if (Array.isArray(foundCampaign.leadsData)) {
        // leadsData already exists, do nothing
      }
      // If there's just a number, create placeholder leads
      else if (typeof foundCampaign.leads === 'number') {
        // Create more detailed placeholder leads with contact information
        const dummyLeads: Lead[] = Array.from({ length: foundCampaign.leads }, (_, i) => {
          // Generate random social profiles for demonstration
          const socialProfiles = {
            linkedin: Math.random() > 0.5 ? `linkedin.com/in/lead-${i + 1}` : undefined,
            twitter: Math.random() > 0.6 ? `twitter.com/lead_${i + 1}` : undefined,
            facebook: Math.random() > 0.7 ? `facebook.com/lead.${i + 1}` : undefined,
            instagram: Math.random() > 0.8 ? `instagram.com/lead_${i + 1}` : undefined,
            whatsapp: Math.random() > 0.9 ? `+1234567890${i}` : undefined,
          };
          
          // Generate random contact platforms
          const contactPlatforms: string[] = [];
          if (Math.random() > 0.3) contactPlatforms.push('email');
          if (Math.random() > 0.5) contactPlatforms.push('phone');
          if (socialProfiles.linkedin) contactPlatforms.push('linkedin');
          if (socialProfiles.twitter) contactPlatforms.push('twitter');
          if (socialProfiles.facebook) contactPlatforms.push('facebook');
          if (socialProfiles.instagram) contactPlatforms.push('instagram');
          if (socialProfiles.whatsapp) contactPlatforms.push('whatsapp');
          
          return {
            id: `${i + 1}`,
            name: `Lead ${i + 1}`,
            email: Math.random() > 0.3 ? `lead${i + 1}@example.com` : undefined,
            phone: Math.random() > 0.5 ? `(123) 456-${7890 + i}` : undefined,
            company: `Company ${i + 1}`,
            status: ['Pending', 'Contacted', 'Interested', 'Not Interested', 'Converted'][Math.floor(Math.random() * 5)],
            currentStage: ['Pending', 'Contacted', 'Interested', 'Not Interested', 'Converted'][Math.floor(Math.random() * 5)],
            lastContact: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            campaignId: id,
            // Add social profiles
            linkedin: socialProfiles.linkedin,
            twitter: socialProfiles.twitter,
            facebook: socialProfiles.facebook,
            instagram: socialProfiles.instagram,
            whatsapp: socialProfiles.whatsapp,
            socialProfiles: socialProfiles,
            contactPlatforms: contactPlatforms,
            assignedTo: Math.random() > 0.5 ? ['John Doe', 'Jane Smith', 'Mike Johnson'][Math.floor(Math.random() * 3)] : undefined
          };
        });
        
        foundCampaign.leadsData = dummyLeads;
      } else {
        // If no leads data at all, initialize an empty array
        foundCampaign.leadsData = [];
      }
      
      // Ensure campaign stages exist
      if (!foundCampaign.stages) {
        foundCampaign.stages = [
          { id: "1", name: 'Pending', count: 0 },
          { id: "2", name: 'Contacted', count: 0 },
          { id: "3", name: 'Interested', count: 0 },
          { id: "4", name: 'Not Interested', count: 0 },
          { id: "5", name: 'Converted', count: 0 }
        ];
      }
      
      // Ensure team members exist
      if (!foundCampaign.teamMembers) {
        foundCampaign.teamMembers = ['John Doe', 'Jane Smith', 'Mike Johnson'];
      }
      
      // Ensure contactPlatforms exist
      if (!foundCampaign.contactPlatforms) {
        foundCampaign.contactPlatforms = ['email', 'phone', 'linkedin'];
      }
      
      setCampaign(foundCampaign);
    }
    
    setLoading(false);
  }, [id]);

  const handleEditCampaignClose = (updatedCampaign?: any) => {
    setShowEditModal(false);
    
    if (updatedCampaign) {
      // Refresh the campaign data by refetching from campaignData
      const refreshedCampaign = campaignData.find(c => String(c.id) === id);
      if (refreshedCampaign) {
        setCampaign(refreshedCampaign);
        toast({
          title: "Campaign updated",
          description: "Campaign has been successfully updated.",
        });
      }
    }
  };

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

  const handleUpdateLead = (leadId: string | number, value: string) => {
    // Check if this is a special field update (contains ':::')
    if (value.includes(':::')) {
      const [field, fieldValue] = value.split(':::');
      
      // Update lead with the new field value
      const updatedLeadsData = campaign.leadsData.map((lead: Lead) => {
        if (lead.id === leadId) {
          return { ...lead, [field]: fieldValue };
        }
        return lead;
      });
      
      setCampaign(prev => ({
        ...prev,
        leadsData: updatedLeadsData
      }));
      
      // Show success message
      toast({
        title: "Lead updated",
        description: `Lead ${field} has been updated`,
      });
    } else {
      // This is a regular status update
      const updatedLeadsData = campaign.leadsData.map((lead: Lead) => 
        lead.id === leadId ? { ...lead, status: value } : lead
      );
      
      setCampaign(prev => ({
        ...prev,
        leadsData: updatedLeadsData
      }));
      
      // Show success message
      toast({
        title: "Lead status updated",
        description: `Lead status has been changed to ${value}`,
      });
    }
  };

  const handleLeadClick = (lead: Lead) => {
    // Here we would open the lead detail view
    console.log("Lead clicked:", lead);
    // For now, just show a toast
    toast({
      title: "Lead Selected",
      description: `${lead.name} selected`,
    });
  };

  const handleLeadUpdate = (updatedLead: Lead) => {
    // Update the lead data
    const updatedLeadsData = campaign.leadsData.map((lead: Lead) => 
      lead.id === updatedLead.id ? updatedLead : lead
    );
    
    setCampaign(prev => ({
      ...prev,
      leadsData: updatedLeadsData
    }));
    
    // Show success message
    toast({
      title: "Lead updated",
      description: "Lead contact information has been updated",
    });
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
        
        <Button onClick={() => setShowEditModal(true)}>Edit Campaign</Button>
      </div>
      
      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Array.isArray(campaign.leadsData) ? campaign.leadsData.length : 0}
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
              campaign={campaign}
              onStatusChange={handleUpdateLead}
              onLeadClick={handleLeadClick}
              onUpdateLead={handleLeadUpdate}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No lead details available for this campaign.</p>
              <Button className="mt-4">Import Leads</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Campaign Modal */}
      {showEditModal && (
        <CreateCampaign 
          onClose={handleEditCampaignClose} 
          existingCampaign={campaign}
        />
      )}
    </div>
  );
};

export default CampaignDetail;
