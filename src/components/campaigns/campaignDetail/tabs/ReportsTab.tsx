
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead } from '../leads/types';
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

interface ReportsTabProps {
  campaign: any;
  leadsData: Lead[];
}

const ReportsTab: React.FC<ReportsTabProps> = ({ campaign, leadsData }) => {
  // Process lead data for stage distribution chart
  const stageData = useMemo(() => {
    return campaign.stages.map((stage: any) => {
      const count = leadsData.filter(lead => 
        lead.currentStage === stage.name || 
        lead.status === stage.name
      ).length;
      return {
        name: stage.name,
        value: count
      };
    }).filter(item => item.value > 0);
  }, [campaign.stages, leadsData]);

  // Generate colors for pie chart segments based on stage colors if available
  const COLORS = useMemo(() => {
    // First try to use the colors defined in the stages
    const stageColors = campaign.stages
      .filter((stage: any) => stage.color)
      .map((stage: any) => {
        if (stage.color.startsWith('bg-')) {
          // Extract color from Tailwind class
          const colorName = stage.color.replace('bg-', '');
          // Map to hex values (simplified)
          const colorMap: Record<string, string> = {
            'blue-500': '#3b82f6',
            'purple-500': '#8b5cf6',
            'green-500': '#10b981',
            'yellow-500': '#f59e0b',
            'orange-500': '#f97316',
            'green-700': '#047857',
            'red-500': '#ef4444',
            'indigo-500': '#6366f1',
            'pink-500': '#ec4899',
            'gray-500': '#6b7280',
          };
          return colorMap[colorName] || '#6b7280'; // Default to gray
        }
        return stage.color;
      });
      
    // If we have stage colors, use them; otherwise use default colors
    return stageColors.length > 0 
      ? stageColors 
      : ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  }, [campaign.stages]);

  // Process data for response timeline by week
  const responseTimelineData = useMemo(() => {
    // Group leads by the week they were added/contacted
    const leadsByWeek = leadsData.reduce((acc: Record<string, any>, lead) => {
      const contactDate = lead.firstContactDate || lead.lastContact || lead.createdAt;
      if (!contactDate) return acc;
      
      const date = new Date(contactDate);
      const weekNum = Math.floor((date.getTime() - new Date().getTime()) / (7 * 24 * 60 * 60 * 1000));
      const weekLabel = weekNum === 0 ? 'This Week' : 
                        weekNum === -1 ? 'Last Week' : 
                        weekNum === -2 ? '2 Weeks Ago' : 
                        weekNum === -3 ? '3 Weeks Ago' : 
                        '4+ Weeks Ago';
      
      if (!acc[weekLabel]) {
        acc[weekLabel] = { 
          name: weekLabel, 
          responses: 0, 
          positives: 0,
          total: 0 
        };
      }
      
      acc[weekLabel].total += 1;
      
      // Count as response if not in initial stages
      if (lead.currentStage !== 'New Lead' && 
          lead.currentStage !== 'Contacted' && 
          lead.currentStage !== 'Not Contacted') {
        acc[weekLabel].responses += 1;
        
        // Count as positive based on stages that indicate interest
        if (lead.currentStage === 'Interested' || 
            lead.currentStage === 'Meeting' || 
            lead.currentStage === 'Qualified' || 
            lead.currentStage === 'Positive' ||
            lead.currentStage === 'Closed') {
          acc[weekLabel].positives += 1;
        }
      }
      
      return acc;
    }, {});
    
    // Convert to array and sort by week
    const weekOrder = ['4+ Weeks Ago', '3 Weeks Ago', '2 Weeks Ago', 'Last Week', 'This Week'];
    return Object.values(leadsByWeek)
      .sort((a: any, b: any) => weekOrder.indexOf(a.name) - weekOrder.indexOf(b.name));
  }, [leadsData]);

  // Team performance data based on actual lead assignments
  const teamData = useMemo(() => {
    if (!campaign.teamMembers || campaign.teamMembers.length === 0) {
      return [];
    }
    
    return campaign.teamMembers.map((member: string) => {
      const memberLeads = leadsData.filter(lead => 
        lead.assignedTo === member || lead.assignedTeamMember === member
      );
      
      const responses = memberLeads.filter(lead => 
        lead.currentStage !== 'New Lead' && 
        lead.currentStage !== 'Contacted' && 
        lead.currentStage !== 'Not Contacted'
      ).length;
      
      return {
        name: member,
        leads: memberLeads.length,
        responses: responses
      };
    }).filter(item => item.leads > 0);
  }, [campaign.teamMembers, leadsData]);

  // Stage progression analysis
  const stageProgressionData = useMemo(() => {
    if (!campaign.stages || campaign.stages.length === 0) {
      return [];
    }
    
    const stageOrder = campaign.stages.map((s: any) => s.name);
    const stageProgressionMap = new Map<string, number>();
    
    // Count leads in each stage
    campaign.stages.forEach((stage: any, index: number) => {
      const nextStage = index < campaign.stages.length - 1 ? campaign.stages[index + 1].name : null;
      if (!nextStage) return;
      
      const key = `${stage.name} → ${nextStage}`;
      stageProgressionMap.set(key, 0);
    });
    
    // For a real app, we would use historical data to track progression
    // For this demo, we'll simulate with the current distribution
    campaign.stages.forEach((stage: any, index: number) => {
      if (index >= campaign.stages.length - 1) return;
      const nextStage = campaign.stages[index + 1].name;
      
      const currentStageLeads = leadsData.filter(lead => 
        lead.currentStage === stage.name || lead.status === stage.name
      ).length;
      
      const nextStageLeads = leadsData.filter(lead => 
        lead.currentStage === nextStage || lead.status === nextStage
      ).length;
      
      const progressionRate = currentStageLeads > 0 
        ? Math.round((nextStageLeads / currentStageLeads) * 100) 
        : 0;
      
      const key = `${stage.name} → ${nextStage}`;
      stageProgressionMap.set(key, progressionRate);
    });
    
    return Array.from(stageProgressionMap.entries()).map(([name, value]) => ({
      name,
      value
    }));
  }, [campaign.stages, leadsData]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-muted-foreground text-sm">Total Leads</p>
                <p className="text-3xl font-bold">{leadsData.length}</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-muted-foreground text-sm">Response Rate</p>
                <p className="text-3xl font-bold">
                  {leadsData.length > 0 
                    ? Math.round((leadsData.filter(l => l.currentStage !== 'New Lead' && l.currentStage !== 'Contacted').length / leadsData.length) * 100) 
                    : 0}%
                </p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-muted-foreground text-sm">Positive Responses</p>
                <p className="text-3xl font-bold">{leadsData.filter(l => 
                  l.currentStage === 'Interested' || 
                  l.currentStage === 'Meeting' || 
                  l.currentStage === 'Qualified' ||
                  l.currentStage === 'Closed' ||
                  l.currentStage === 'Positive').length}</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-muted-foreground text-sm">Conversion Rate</p>
                <p className="text-3xl font-bold">{campaign.conversion || '0%'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Lead Stage Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stageData.length > 0 ? stageData : [{ name: 'No Data', value: 1 }]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stageData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Response Timeline</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={responseTimelineData}
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
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="responses" fill="#8884d8" name="Total Responses" />
                    <Bar dataKey="positives" fill="#82ca9d" name="Positive Responses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Stage Progression Analysis */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Stage Progression Analysis</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stageProgressionData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 100,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} label={{ value: 'Progression Rate (%)', position: 'insideBottom', offset: -5 }} />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(value) => [`${value}%`, 'Progression Rate']} />
                  <Bar dataKey="value" fill="#8884d8" name="Progression Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {teamData.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Team Performance</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={teamData}
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
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads" fill="#8884d8" name="Leads Assigned" />
                    <Bar dataKey="responses" fill="#82ca9d" name="Responses Generated" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;
