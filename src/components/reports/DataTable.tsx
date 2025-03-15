
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  CampaignMetric, 
  LeadMetric, 
  MessageMetric, 
  PerformanceMetric 
} from '@/components/reports/types';
import { Badge } from '@/components/ui/badge';

interface DataTableProps {
  data: CampaignMetric[] | LeadMetric[] | MessageMetric[] | PerformanceMetric[];
  type: 'campaign' | 'lead' | 'message' | 'performance';
}

export const DataTable: React.FC<DataTableProps> = ({ data, type }) => {
  if (data.length === 0) {
    return <p className="text-muted-foreground text-center py-4">No data available</p>;
  }

  // Render different table structures based on data type
  if (type === 'campaign') {
    const campaignData = data as CampaignMetric[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Leads</TableHead>
            <TableHead>Responses</TableHead>
            <TableHead>Conversions</TableHead>
            <TableHead>Response Rate</TableHead>
            <TableHead>Conversion Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaignData.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className={
                  campaign.status === 'Active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : campaign.status === 'Completed'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                }>
                  {campaign.status}
                </Badge>
              </TableCell>
              <TableCell>{campaign.totalLeads}</TableCell>
              <TableCell>{campaign.responses}</TableCell>
              <TableCell>{campaign.conversions}</TableCell>
              <TableCell>{campaign.responseRate}%</TableCell>
              <TableCell>{campaign.conversionRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else if (type === 'lead') {
    const leadData = data as LeadMetric[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>New Leads</TableHead>
            <TableHead>Contacted</TableHead>
            <TableHead>Responded</TableHead>
            <TableHead>Interested</TableHead>
            <TableHead>Converted</TableHead>
            <TableHead>Response Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leadData.map((lead) => (
            <TableRow key={lead.campaignId}>
              <TableCell className="font-medium">{lead.campaignName}</TableCell>
              <TableCell>{lead.newLeads}</TableCell>
              <TableCell>{lead.contacted}</TableCell>
              <TableCell>{lead.responded}</TableCell>
              <TableCell>{lead.interested}</TableCell>
              <TableCell>{lead.converted}</TableCell>
              <TableCell>{lead.responseRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else if (type === 'message') {
    const messageData = data as MessageMetric[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Template Name</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Sent</TableHead>
            <TableHead>Opened</TableHead>
            <TableHead>Responded</TableHead>
            <TableHead>Open Rate</TableHead>
            <TableHead>Response Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messageData.map((message, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{message.templateName}</TableCell>
              <TableCell>{message.platform}</TableCell>
              <TableCell>{message.campaignName}</TableCell>
              <TableCell>{message.sent}</TableCell>
              <TableCell>{message.opened}</TableCell>
              <TableCell>{message.responded}</TableCell>
              <TableCell>{message.openRate}%</TableCell>
              <TableCell>{message.responseRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else if (type === 'performance') {
    const performanceData = data as PerformanceMetric[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Leads Assigned</TableHead>
            <TableHead>Leads Contacted</TableHead>
            <TableHead>Leads Responded</TableHead>
            <TableHead>Leads Converted</TableHead>
            <TableHead>Response Rate</TableHead>
            <TableHead>Conversion Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {performanceData.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.leadsAssigned}</TableCell>
              <TableCell>{member.leadsContacted}</TableCell>
              <TableCell>{member.leadsResponded}</TableCell>
              <TableCell>{member.leadsConverted}</TableCell>
              <TableCell>{member.responseRate}%</TableCell>
              <TableCell>{member.conversionRate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  
  return null;
};
