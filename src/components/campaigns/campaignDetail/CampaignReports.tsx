
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CampaignReportsProps {
  campaign: any;
}

const CampaignReports: React.FC<CampaignReportsProps> = ({ campaign }) => {
  // Generate colors for stages based on their defined colors
  const STAGE_COLORS = useMemo(() => {
    // First try to use the colors defined in the stages
    if (campaign.stages && campaign.stages.length > 0) {
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
        
      if (stageColors.length > 0) {
        return stageColors;
      }
    }
    
    // Default colors if no stage colors available
    return ['#10b981', '#ef4444', '#94a3b8'];
  }, [campaign.stages]);

  // Sample data for reports
  const responseData = [
    { name: 'Mon', responses: 4 },
    { name: 'Tue', responses: 7 },
    { name: 'Wed', responses: 5 },
    { name: 'Thu', responses: 8 },
    { name: 'Fri', responses: 12 },
    { name: 'Sat', responses: 3 },
    { name: 'Sun', responses: 2 },
  ];

  // Create stage distribution data from campaign stages
  const stageDistributionData = useMemo(() => {
    if (!campaign.stages || campaign.stages.length === 0) {
      return [
        { name: 'Positive', value: campaign.positive },
        { name: 'Negative', value: campaign.negative },
        { name: 'No Response', value: campaign.leads - campaign.responses },
      ];
    }
    
    // If we have stage data with counts, use that
    return campaign.stages.map((stage: any) => ({
      name: stage.name,
      value: stage.count || 0
    })).filter((item: any) => item.value > 0);
  }, [campaign]);

  const channelEffectivenessData = [
    {
      name: 'Email',
      contacted: 120,
      responses: 45,
      conversion: 15,
    },
    {
      name: 'LinkedIn',
      contacted: 80,
      responses: 40,
      conversion: 12,
    },
    {
      name: 'Call',
      contacted: 40,
      responses: 20,
      conversion: 10,
    },
    {
      name: 'WhatsApp',
      contacted: 60,
      responses: 30,
      conversion: 8,
    },
  ];

  const teamPerformanceData = [
    { name: 'John', positive: 8, negative: 2, noResponse: 20 },
    { name: 'Sarah', positive: 12, negative: 3, noResponse: 15 },
    { name: 'Alex', positive: 5, negative: 1, noResponse: 14 },
    { name: 'Mia', positive: 7, negative: 3, noResponse: 10 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Campaign Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Response Trend Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Response Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={responseData}
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
                  <Line type="monotone" dataKey="responses" stroke="#10b981" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stage Distribution Chart - Using custom stages */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Lead Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stageDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {stageDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STAGE_COLORS[index % STAGE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Channel Effectiveness */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Channel Effectiveness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={channelEffectivenessData}
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
                  <Bar dataKey="contacted" fill="#94a3b8" />
                  <Bar dataKey="responses" fill="#10b981" />
                  <Bar dataKey="conversion" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamPerformanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="positive" stackId="a" fill="#10b981" />
                  <Bar dataKey="negative" stackId="a" fill="#ef4444" />
                  <Bar dataKey="noResponse" stackId="a" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Campaign Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Leads</p>
              <p className="text-2xl font-bold">{campaign.leads.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Contacted</p>
              <p className="text-2xl font-bold">{campaign.contacted.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round((campaign.contacted / campaign.leads) * 100)}% of leads
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Responses</p>
              <p className="text-2xl font-bold">{campaign.responses.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round((campaign.responses / campaign.contacted) * 100)}% response rate
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Conversion</p>
              <p className="text-2xl font-bold">{campaign.positive.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round((campaign.positive / campaign.responses) * 100)}% conversion rate
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignReports;
