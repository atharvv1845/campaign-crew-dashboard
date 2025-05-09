
import React from 'react';
import CampaignDescription from '../CampaignDescription';
import StatCards from '../StatCards';
import ChannelsAndStages from '../ChannelsAndStages';
import OutreachSummary from '../OutreachSummary';
import { Lead } from '../leads/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OverviewTabProps {
  campaign: any;
  leadsData: Lead[];
  updateCampaign?: (data: any) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ campaign, leadsData, updateCampaign }) => {
  // Process leads to ensure required fields with defaults
  const processedLeads = leadsData.map(lead => ({
    ...lead,
    id: lead.id,
    currentStage: lead.currentStage || lead.status || 'New Lead',
    name: lead.name || 
          (lead.firstName && lead.lastName ? `${lead.firstName} ${lead.lastName}` : 
          lead.firstName || lead.lastName || `Lead #${lead.id}`),
    lastContact: lead.lastContact || lead.lastContacted || '',
  }));

  return (
    <div className="space-y-6">
      <CampaignDescription campaign={campaign} />
      
      {/* Campaign Overview Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Campaign Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Details</h3>
              <ul className="mt-2 space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Creation Date:</span>
                  <span className="font-medium">{campaign.createdAt}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">{campaign.status}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{campaign.type || 'Standard'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Team Size:</span>
                  <span className="font-medium">{campaign.teamMembers?.length || 0} members</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Progress</h3>
              <ul className="mt-2 space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Total Leads:</span>
                  <span className="font-medium">{processedLeads.length}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Contacted:</span>
                  <span className="font-medium">
                    {processedLeads.filter(l => l.currentStage !== 'New Lead').length}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Response Rate:</span>
                  <span className="font-medium">
                    {processedLeads.length > 0 
                      ? Math.round((processedLeads.filter(l => 
                          l.currentStage !== 'New Lead' && 
                          l.currentStage !== 'Contacted'
                        ).length / processedLeads.length) * 100) 
                      : 0}%
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Conversion:</span>
                  <span className="font-medium">{campaign.conversion || '0%'}</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <StatCards campaign={campaign} leadsData={processedLeads as any} />
      <ChannelsAndStages campaign={campaign} leadsData={processedLeads as any} />
      <OutreachSummary campaign={campaign} leadsData={processedLeads} teamMembers={campaign.teamMembers} />
    </div>
  );
};

export default OverviewTab;
