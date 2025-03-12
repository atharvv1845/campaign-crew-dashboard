
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmptyTabContent from './EmptyTabContent';
import LeadTableComponent, { Lead } from '@/components/leads/LeadTableComponent';
import { campaignData } from '@/components/campaigns/campaignData';

interface LeadsTabContentProps {
  onImportLeadsClick: () => void;
}

const LeadsTabContent: React.FC<LeadsTabContentProps> = ({ onImportLeadsClick }) => {
  // Collect all leads from all campaigns
  const getAllLeads = (): Lead[] => {
    const allLeads: Lead[] = [];
    
    campaignData.forEach(campaign => {
      if (Array.isArray(campaign.leads)) {
        // Transform campaign leads into the format needed for LeadTableComponent
        const transformedLeads = campaign.leads.map((lead: any, index: number) => {
          const name = lead.name || 
                      (lead.firstName && lead.lastName ? `${lead.firstName} ${lead.lastName}` : 
                      lead.firstName || lead.lastName || `Lead #${lead.id || index}`);
          
          return {
            id: lead.id || index + 1000,
            name,
            email: lead.email || '',
            company: lead.company || '',
            title: lead.title || '',
            status: lead.currentStage || lead.status || 'New',
            campaign: campaign.name,
            lastContact: lead.lastContacted || lead.lastContact || 'Not contacted',
            contactMethods: [
              lead.email ? 'email' : '',
              lead.linkedin ? 'linkedin' : '',
              lead.twitter ? 'twitter' : '',
              lead.facebook ? 'facebook' : '',
              lead.instagram ? 'instagram' : '',
              lead.whatsapp ? 'whatsapp' : '',
            ].filter(Boolean)
          };
        });
        
        allLeads.push(...transformedLeads);
      }
    });
    
    return allLeads;
  };
  
  const leads = getAllLeads();

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Leads</CardTitle>
      </CardHeader>
      <CardContent>
        {leads.length > 0 ? (
          <LeadTableComponent leads={leads} />
        ) : (
          <EmptyTabContent
            icon={Users}
            title="Unified Lead View"
            description="View and manage all leads across all campaigns in one place. Import your leads to get started."
            buttonText="Import Leads"
            onButtonClick={onImportLeadsClick}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LeadsTabContent;
