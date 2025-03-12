
import React from 'react';
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
  const stageData = campaign.stages.map((stage: any) => {
    const count = leadsData.filter(lead => lead.currentStage === stage.name).length;
    return {
      name: stage.name,
      value: count
    };
  }).filter(item => item.value > 0);

  // Generate random colors for pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Process data for response timeline
  const responseData = [
    { name: 'Week 1', responses: Math.floor(Math.random() * 10), positives: Math.floor(Math.random() * 5) },
    { name: 'Week 2', responses: Math.floor(Math.random() * 15), positives: Math.floor(Math.random() * 8) },
    { name: 'Week 3', responses: Math.floor(Math.random() * 20), positives: Math.floor(Math.random() * 12) },
    { name: 'Week 4', responses: Math.floor(Math.random() * 25), positives: Math.floor(Math.random() * 15) },
  ];

  // Team performance data
  const teamData = (campaign.teamMembers || []).map((member: string, index: number) => ({
    name: member,
    leads: Math.floor(Math.random() * 25),
    responses: Math.floor(Math.random() * 15)
  }));

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
                  l.currentStage === 'Qualified').length}</p>
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
                    <Bar dataKey="responses" fill="#8884d8" name="Total Responses" />
                    <Bar dataKey="positives" fill="#82ca9d" name="Positive Responses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

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
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;
