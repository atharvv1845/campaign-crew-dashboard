
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
import { LeadMetric } from '@/components/reports/types';
import { getLeadMetricsData } from '@/components/reports/utils';

interface LeadReportsProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  selectedCampaigns: string[];
  selectedTeamMembers: string[];
  selectedPlatforms: string[];
}

const LeadReports: React.FC<LeadReportsProps> = ({
  dateRange,
  selectedCampaigns,
  selectedTeamMembers,
  selectedPlatforms
}) => {
  // Mock lead metrics data
  const leadMetrics: LeadMetric[] = getLeadMetricsData();
  
  // Lead status distribution data
  const statusDistributionData = [
    { name: 'New', value: 35 },
    { name: 'Contacted', value: 25 },
    { name: 'Interested', value: 20 },
    { name: 'Meeting', value: 10 },
    { name: 'Converted', value: 5 },
    { name: 'Lost', value: 5 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#d88884'];
  
  // Lead engagement timeline data
  const timelineData = [
    { name: 'Mon', contacted: 25, responded: 10 },
    { name: 'Tue', contacted: 35, responded: 15 },
    { name: 'Wed', contacted: 45, responded: 20 },
    { name: 'Thu', contacted: 40, responded: 18 },
    { name: 'Fri', contacted: 30, responded: 13 },
    { name: 'Sat', contacted: 15, responded: 7 },
    { name: 'Sun', contacted: 10, responded: 5 },
  ];
  
  // Lead platform distribution data
  const platformData = [
    { name: 'Email', count: 150 },
    { name: 'LinkedIn', count: 90 },
    { name: 'Phone', count: 60 },
    { name: 'Twitter', count: 30 },
    { name: 'WhatsApp', count: 20 },
  ].filter(platform => selectedPlatforms.length === 0 || selectedPlatforms.includes(platform.name));
  
  return (
    <div className="space-y-6">
      {/* Lead Status Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-square">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Lead Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Distribution by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="aspect-square">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={platformData}
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
                  <Bar dataKey="count" name="Number of Leads" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Lead Engagement Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Engagement Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="aspect-square md:aspect-video">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={timelineData}
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
                <Line type="monotone" dataKey="contacted" name="Leads Contacted" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="responded" name="Leads Responded" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Lead Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Metrics by Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={leadMetrics} 
            type="lead"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadReports;
