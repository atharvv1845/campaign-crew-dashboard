
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { campaignData } from '@/components/campaigns/campaignData';
import { useTeamStore } from '@/hooks/useTeamStore';
import { DataTable } from '@/components/reports/DataTable';
import { PerformanceMetric } from '@/components/reports/types';
import { getTeamPerformanceData } from '@/components/reports/utils';

interface ReportsDashboardProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  selectedCampaigns: string[];
  selectedTeamMembers: string[];
  selectedPlatforms: string[];
}

const ReportsDashboard: React.FC<ReportsDashboardProps> = ({
  dateRange,
  selectedCampaigns,
  selectedTeamMembers,
  selectedPlatforms
}) => {
  const { teamMembers } = useTeamStore();
  
  // Calculate summary stats
  const totalCampaigns = campaignData.length;
  const activeCampaigns = campaignData.filter(c => c.status === 'Active').length;
  const completedCampaigns = campaignData.filter(c => c.status === 'Completed').length;
  
  // Calculate total leads
  const totalLeads = campaignData.reduce((total, campaign) => {
    if (typeof campaign.leads === 'number') {
      return total + campaign.leads;
    } else if (Array.isArray(campaign.leads)) {
      return total + campaign.leads.length;
    }
    return total;
  }, 0);
  
  // Calculate total responses
  const totalResponses = campaignData.reduce((total, campaign) => {
    return total + (campaign.responses || 0);
  }, 0);
  
  // Calculate average conversion rate
  const averageConversion = campaignData.length > 0 
    ? campaignData.reduce((sum, campaign) => {
        const conversionRate = campaign.conversion 
          ? parseInt(campaign.conversion.replace('%', '')) 
          : 0;
        return sum + conversionRate;
      }, 0) / campaignData.length
    : 0;
  
  // Data for platform distribution chart
  const platformData = [
    { name: 'Email', value: 45 },
    { name: 'LinkedIn', value: 30 },
    { name: 'Phone', value: 15 },
    { name: 'Twitter', value: 5 },
    { name: 'Other', value: 5 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Data for campaign status chart
  const statusData = [
    { name: 'Active', value: activeCampaigns },
    { name: 'Completed', value: completedCampaigns },
    { name: 'Draft', value: totalCampaigns - activeCampaigns - completedCampaigns },
  ];
  
  // Data for lead activity timeline
  const activityData = [
    { name: 'Week 1', leads: 120, responses: 45, conversions: 10 },
    { name: 'Week 2', leads: 150, responses: 60, conversions: 15 },
    { name: 'Week 3', leads: 180, responses: 70, conversions: 22 },
    { name: 'Week 4', leads: 220, responses: 90, conversions: 30 },
  ];
  
  // Team performance data for leaderboard
  const performanceData: PerformanceMetric[] = getTeamPerformanceData(teamMembers);
  
  // Sort team members by performance (leads converted)
  const sortedPerformanceData = [...performanceData].sort((a, b) => b.leadsConverted - a.leadsConverted);
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCampaigns}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeCampaigns} active, {completedCampaigns} completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all campaigns</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResponses}</div>
            <p className="text-xs text-muted-foreground mt-1">Response rate: {totalLeads > 0 ? ((totalResponses / totalLeads) * 100).toFixed(1) : 0}%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageConversion.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Leads to conversions</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campaign Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-square md:aspect-video">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Platform Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Outreach by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-square md:aspect-video">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Lead Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="aspect-square md:aspect-video">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={activityData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="responses" stroke="#82ca9d" />
                <Line type="monotone" dataKey="conversions" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Team Performance Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={sortedPerformanceData} 
            type="performance"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsDashboard;
