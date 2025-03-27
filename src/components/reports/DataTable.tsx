
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CampaignMetric, LeadMetric, MessageMetric, PerformanceMetric } from './types';

interface DataTableProps {
  data: any[];
  type: 'campaign' | 'lead' | 'message' | 'performance';
}

export const DataTable: React.FC<DataTableProps> = ({ data, type }) => {
  if (data.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No data available with the current filters
      </div>
    );
  }

  if (type === 'campaign') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total Leads</TableHead>
            <TableHead className="text-right">Responses</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            <TableHead className="text-right">Response Rate</TableHead>
            <TableHead className="text-right">Conversion Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data as CampaignMetric[]).map((campaign) => (
            <TableRow key={campaign.id.toString()}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell className="text-right">{campaign.totalLeads}</TableCell>
              <TableCell className="text-right">{campaign.responses}</TableCell>
              <TableCell className="text-right">{campaign.conversions}</TableCell>
              <TableCell className="text-right">{campaign.responseRate.toFixed(1)}%</TableCell>
              <TableCell className="text-right">{campaign.conversionRate.toFixed(1)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (type === 'lead') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead className="text-right">New Leads</TableHead>
            <TableHead className="text-right">Contacted</TableHead>
            <TableHead className="text-right">Responded</TableHead>
            <TableHead className="text-right">Interested</TableHead>
            <TableHead className="text-right">Converted</TableHead>
            <TableHead className="text-right">Response Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data as LeadMetric[]).map((metric) => (
            <TableRow key={metric.campaignId.toString()}>
              <TableCell className="font-medium">{metric.campaignName}</TableCell>
              <TableCell className="text-right">{metric.newLeads}</TableCell>
              <TableCell className="text-right">{metric.contacted}</TableCell>
              <TableCell className="text-right">{metric.responded}</TableCell>
              <TableCell className="text-right">{metric.interested}</TableCell>
              <TableCell className="text-right">{metric.converted}</TableCell>
              <TableCell className="text-right">{metric.responseRate.toFixed(1)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (type === 'message') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Template</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead className="text-right">Sent</TableHead>
            <TableHead className="text-right">Opened</TableHead>
            <TableHead className="text-right">Responded</TableHead>
            <TableHead className="text-right">Open Rate</TableHead>
            <TableHead className="text-right">Response Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data as MessageMetric[]).map((metric, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{metric.templateName}</TableCell>
              <TableCell>{metric.platform}</TableCell>
              <TableCell>{metric.campaignName}</TableCell>
              <TableCell className="text-right">{metric.sent}</TableCell>
              <TableCell className="text-right">{metric.opened}</TableCell>
              <TableCell className="text-right">{metric.responded}</TableCell>
              <TableCell className="text-right">{metric.openRate.toFixed(1)}%</TableCell>
              <TableCell className="text-right">{metric.responseRate.toFixed(1)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (type === 'performance') {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Leads Assigned</TableHead>
            <TableHead className="text-right">Leads Contacted</TableHead>
            <TableHead className="text-right">Leads Responded</TableHead>
            <TableHead className="text-right">Leads Converted</TableHead>
            <TableHead className="text-right">Response Rate</TableHead>
            <TableHead className="text-right">Conversion Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data as PerformanceMetric[]).map((metric) => (
            <TableRow key={metric.id}>
              <TableCell className="font-medium">{metric.name}</TableCell>
              <TableCell>{metric.role}</TableCell>
              <TableCell className="text-right">{metric.leadsAssigned}</TableCell>
              <TableCell className="text-right">{metric.leadsContacted}</TableCell>
              <TableCell className="text-right">{metric.leadsResponded}</TableCell>
              <TableCell className="text-right">{metric.leadsConverted}</TableCell>
              <TableCell className="text-right">{metric.responseRate.toFixed(1)}%</TableCell>
              <TableCell className="text-right">{metric.conversionRate.toFixed(1)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return null;
};
