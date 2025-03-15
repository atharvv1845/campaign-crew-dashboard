
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { DataTable } from '@/components/reports/DataTable';
import { MessageMetric } from '@/components/reports/types';
import { getMessageMetricsData } from '@/components/reports/utils';

interface MessagingReportsProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  selectedCampaigns: string[];
  selectedTeamMembers: string[];
  selectedPlatforms: string[];
}

const MessagingReports: React.FC<MessagingReportsProps> = ({
  dateRange,
  selectedCampaigns,
  selectedTeamMembers,
  selectedPlatforms
}) => {
  // Mock message metrics data
  const messageMetrics: MessageMetric[] = getMessageMetricsData();
  
  // Filter message metrics based on selected campaigns and platforms
  const filteredMessageMetrics = messageMetrics.filter(metric => {
    if (selectedCampaigns.length > 0 && !selectedCampaigns.includes(metric.campaignId.toString())) {
      return false;
    }
    if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(metric.platform)) {
      return false;
    }
    return true;
  });
  
  // Message platform distribution data
  const platformDistributionData = [
    { name: 'Email', value: 45 },
    { name: 'LinkedIn', value: 30 },
    { name: 'Twitter', value: 10 },
    { name: 'Phone', value: 10 },
    { name: 'WhatsApp', value: 5 },
  ].filter(platform => selectedPlatforms.length === 0 || selectedPlatforms.includes(platform.name));
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Response rate by time of day
  const timeOfDayData = [
    { time: '6-8 AM', rate: 15 },
    { time: '8-10 AM', rate: 35 },
    { time: '10-12 PM', rate: 40 },
    { time: '12-2 PM', rate: 25 },
    { time: '2-4 PM', rate: 30 },
    { time: '4-6 PM', rate: 45 },
    { time: '6-8 PM', rate: 20 },
    { time: 'After 8 PM', rate: 10 },
  ];
  
  // Message template effectiveness data
  const templateData = [
    { name: 'Template 1', sent: 100, opened: 75, responded: 30 },
    { name: 'Template 2', sent: 120, opened: 80, responded: 45 },
    { name: 'Template 3', sent: 80, opened: 50, responded: 25 },
    { name: 'Template 4', sent: 150, opened: 100, responded: 60 },
    { name: 'Template 5', sent: 90, opened: 65, responded: 35 },
  ];
  
  return (
    <div className="space-y-6">
      {/* Message Platform Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Message Distribution by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-square">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {platformDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Response Rate by Time of Day */}
        <Card>
          <CardHeader>
            <CardTitle>Response Rate by Time of Day</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-square">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={timeOfDayData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis label={{ value: 'Response Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" name="Response Rate %" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Message Template Effectiveness */}
      <Card>
        <CardHeader>
          <CardTitle>Message Template Effectiveness</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="aspect-square md:aspect-video">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={templateData}
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
                <Bar dataKey="sent" name="Messages Sent" fill="#8884d8" />
                <Bar dataKey="opened" name="Messages Opened" fill="#82ca9d" />
                <Bar dataKey="responded" name="Messages Responded" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Messaging Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Messaging Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={filteredMessageMetrics} 
            type="message"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingReports;
