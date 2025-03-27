
import React, { useMemo } from 'react';
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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
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
  selectedStages: string[];
  allStages: string[];
}

const CampaignReports: React.FC<CampaignReportsProps> = ({
  dateRange,
  selectedCampaigns,
  selectedTeamMembers,
  selectedPlatforms,
  selectedStages,
  allStages
}) => {
  // Filter campaigns based on selections
  const filteredCampaigns = useMemo(() => {
    return campaignData.filter(campaign => {
      // Filter by selected campaigns
      if (selectedCampaigns.length > 0 && !selectedCampaigns.includes(campaign.id.toString())) {
        return false;
      }
      
      // Filter by selected stages
      if (selectedStages.length > 0 && campaign.stages) {
        const hasStage = campaign.stages.some(stage => 
          selectedStages.includes(stage.name)
        );
        if (!hasStage) return false;
      }
      
      return true;
    });
  }, [campaignData, selectedCampaigns, selectedStages]);
  
  // Generate campaign metrics data
  const campaignMetrics: CampaignMetric[] = getCampaignPerformanceData(filteredCampaigns);
  
  // Chart data for campaign performance comparison
  const performanceComparisonData = campaignMetrics.map(campaign => ({
    name: campaign.name.length > 15 ? `${campaign.name.substring(0, 15)}...` : campaign.name,
    leads: campaign.totalLeads,
    responses: campaign.responses,
    conversions: campaign.conversions,
  }));
  
  // Data for stages distribution across campaigns
  const stageDistributionData = useMemo(() => {
    // If no custom stages available, return default data
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
    
    // Create data based on available stages
    const stagesMap = new Map<string, number>();
    
    // Initialize with all stages
    allStages.forEach(stage => {
      stagesMap.set(stage, 0);
    });
    
    // Count leads in each stage
    filteredCampaigns.forEach(campaign => {
      if (campaign.stages) {
        campaign.stages.forEach(stage => {
          if (stagesMap.has(stage.name)) {
            stagesMap.set(stage.name, (stagesMap.get(stage.name) || 0) + (stage.count || 0));
          }
        });
      }
    });
    
    // Convert to array for the chart
    return Array.from(stagesMap.entries())
      .map(([name, value]) => ({ name, value: value || 5 })) // Minimum value for visualization
      .filter(item => selectedStages.length === 0 || selectedStages.includes(item.name));
  }, [allStages, filteredCampaigns, selectedStages]);
  
  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff8042'];
  
  // Data for engagement by status
  const engagementData = useMemo(() => {
    // If we have custom stages, use them
    if (allStages.length > 0) {
      return allStages
        .filter(stage => selectedStages.length === 0 || selectedStages.includes(stage))
        .map(stage => {
          // Create data row for each stage
          const row: any = { name: stage };
          
          // Initialize values for each campaign
          filteredCampaigns.forEach(campaign => {
            const campaignName = campaign.name.substring(0, 10);
            row[campaignName] = 0;
            
            // Find stage count in this campaign
            if (campaign.stages) {
              const stageInfo = campaign.stages.find(s => s.name === stage);
              if (stageInfo) {
                row[campaignName] = stageInfo.count || 0;
              }
            }
          });
          
          return row;
        });
    }
    
    // Fallback to default data
    return [
      { name: 'New', contacted: 120, interested: 0, meeting: 0, converted: 0 },
      { name: 'Contacted', contacted: 100, interested: 45, meeting: 0, converted: 0 },
      { name: 'Interested', contacted: 0, interested: 45, meeting: 22, converted: 0 },
      { name: 'Meeting', contacted: 0, interested: 0, meeting: 22, converted: 15 },
      { name: 'Converted', contacted: 0, interested: 0, meeting: 0, converted: 15 },
    ];
  }, [allStages, selectedStages, filteredCampaigns]);
  
  return (
    <div className="space-y-6">
      {/* Campaign Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="aspect-square md:aspect-video">
            {performanceComparisonData.length > 0 ? (
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
            ) : (
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">No campaign data matching the current filters</p>
              </div>
            )}
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Stage Distribution Chart */}
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
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Lead Status Flow */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Status Distribution by Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="aspect-square md:aspect-video">
            {engagementData.length > 0 && filteredCampaigns.length > 0 ? (
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
                  {filteredCampaigns.slice(0, 5).map((campaign, index) => {
                    const campaignName = campaign.name.substring(0, 10);
                    return (
                      <Bar 
                        key={campaign.id.toString()} 
                        dataKey={campaignName} 
                        stackId="a" 
                        name={campaignName} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    );
                  })}
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">No data available with current filters</p>
              </div>
            )}
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
