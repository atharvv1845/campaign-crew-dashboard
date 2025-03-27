
import React, { useMemo } from 'react';
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
  selectedStages: string[];
  allStages: string[];
  isLoading: boolean;
}

const ReportsDashboard: React.FC<ReportsDashboardProps> = ({
  dateRange,
  selectedCampaigns,
  selectedTeamMembers,
  selectedPlatforms,
  selectedStages,
  allStages,
  isLoading
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
  
  // Filter data based on selected stages
  const filteredCampaignData = useMemo(() => {
    if (selectedStages.length === 0) return campaignData;
    
    return campaignData.filter(campaign => {
      if (campaign.stages) {
        return campaign.stages.some(stage => 
          selectedStages.includes(stage.name)
        );
      }
      return true;
    });
  }, [campaignData, selectedStages]);
  
  // Data for platform distribution chart
  const platformData = [
    { name: 'Email', value: 45 },
    { name: 'LinkedIn', value: 30 },
    { name: 'Phone', value: 15 },
    { name: 'Twitter', value: 5 },
    { name: 'Other', value: 5 },
  ].filter(platform => 
    selectedPlatforms.length === 0 || 
    selectedPlatforms.includes(platform.name)
  );
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Data for campaign status chart - filter by selected campaigns
  const statusData = useMemo(() => {
    const filtered = selectedCampaigns.length === 0 
      ? campaignData 
      : campaignData.filter(c => selectedCampaigns.includes(c.id.toString()));
    
    const active = filtered.filter(c => c.status === 'Active').length;
    const completed = filtered.filter(c => c.status === 'Completed').length;
    const draft = filtered.length - active - completed;
    
    return [
      { name: 'Active', value: active },
      { name: 'Completed', value: completed },
      { name: 'Draft', value: draft },
    ];
  }, [campaignData, selectedCampaigns]);
  
  // Lead stage distribution chart
  const stageDistributionData = useMemo(() => {
    // If no custom stages available, use default stage categories
    if (allStages.length === 0) {
      return [
        { name: 'New', value: 35 },
        { name: 'Contacted', value: 25 },
        { name: 'Interested', value: 20 },
        { name: 'Meeting', value: 10 },
        { name: 'Converted', value: 5 },
        { name: 'Lost', value: 5 },
      ];
    }
    
    // Create data from available stages
    const stageData = allStages.map(stage => {
      // Count leads in this stage across all campaigns
      let count = 0;
      campaignData.forEach(campaign => {
        if (campaign.stages) {
          const stageInfo = campaign.stages.find(s => s.name === stage);
          if (stageInfo) {
            count += stageInfo.count || 0;
          }
        }
      });
      
      return { name: stage, value: count || 5 }; // Use minimum value of 5 for visualization
    });
    
    return stageData;
  }, [allStages, campaignData]);
  
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
  const sortedPerformanceData = [...performanceData]
    .filter(member => 
      selectedTeamMembers.length === 0 || 
      selectedTeamMembers.includes(member.id)
    )
    .sort((a, b) => b.leadsConverted - a.leadsConverted);
  
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
        
        {/* Lead Stage Distribution Chart - Using custom stages */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-square md:aspect-video">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stageDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stageDistributionData.map((entry, index) => (
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
