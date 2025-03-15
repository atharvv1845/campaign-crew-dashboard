
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { DataTable } from '@/components/reports/DataTable';
import { CampaignMetric } from '@/components/reports/types';
import { getCampaignPerformanceData } from '@/components/reports/utils';
import { campaignData } from '@/components/campaigns/campaignData';

interface CampaignReportsProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  selectedCampaigns: string[];
  selectedTeamMembers: string[];
  selectedPlatforms: string[];
}

const CampaignReports: React.FC<CampaignReportsProps> = ({
  dateRange,
  selectedCampaigns,
  selectedTeamMembers,
  selectedPlatforms
}) => {
  // Filter campaigns based on selections
  const filteredCampaigns = campaignData.filter(campaign => {
    if (selectedCampaigns.length > 0 && !selectedCampaigns.includes(campaign.id.toString())) {
      return false;
    }
    return true;
  });
  
  // Generate campaign metrics data
  const campaignMetrics: CampaignMetric[] = getCampaignPerformanceData(filteredCampaigns);
  
  // Chart data for campaign performance comparison
  const performanceComparisonData = campaignMetrics.map(campaign => ({
    name: campaign.name.length > 15 ? `${campaign.name.substring(0, 15)}...` : campaign.name,
    leads: campaign.totalLeads,
    responses: campaign.responses,
    conversions: campaign.conversions,
  }));
  
  // Data for engagement by status
  const engagementData = [
    { name: 'New', contacted: 120, interested: 0, meeting: 0, converted: 0 },
    { name: 'Contacted', contacted: 100, interested: 45, meeting: 0, converted: 0 },
    { name: 'Interested', contacted: 0, interested: 45, meeting: 22, converted: 0 },
    { name: 'Meeting', contacted: 0, interested: 0, meeting: 22, converted: 15 },
    { name: 'Converted', contacted: 0, interested: 0, meeting: 0, converted: 15 },
  ];
  
  return (
    <div className="space-y-6">
      {/* Campaign Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="aspect-square md:aspect-video">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={performanceComparisonData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 70,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" name="Total Leads" fill="#8884d8" />
                <Bar dataKey="responses" name="Responses" fill="#82ca9d" />
                <Bar dataKey="conversions" name="Conversions" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Lead Status Flow */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Status Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="aspect-square md:aspect-video">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={engagementData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="contacted" stackId="a" name="Contacted" fill="#8884d8" />
                <Bar dataKey="interested" stackId="a" name="Interested" fill="#82ca9d" />
                <Bar dataKey="meeting" stackId="a" name="Meeting" fill="#ffc658" />
                <Bar dataKey="converted" stackId="a" name="Converted" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Campaign Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={campaignMetrics} 
            type="campaign"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignReports;
