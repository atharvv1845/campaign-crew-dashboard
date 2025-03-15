
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { DataTable } from '@/components/reports/DataTable';
import { PerformanceMetric } from '@/components/reports/types';
import { getTeamPerformanceData } from '@/components/reports/utils';
import { useTeamStore } from '@/hooks/useTeamStore';
import { UserPlus } from 'lucide-react';

interface TeamReportsProps {
  dateRange: { from: Date | undefined; to: Date | undefined };
  selectedCampaigns: string[];
  selectedTeamMembers: string[];
  selectedPlatforms: string[];
}

const TeamReports: React.FC<TeamReportsProps> = ({
  dateRange,
  selectedCampaigns,
  selectedTeamMembers,
  selectedPlatforms
}) => {
  const { teamMembers } = useTeamStore();
  
  // Filter team members based on selection
  const filteredTeamMembers = teamMembers.filter(member => {
    if (selectedTeamMembers.length > 0 && !selectedTeamMembers.includes(member.id)) {
      return false;
    }
    return true;
  });
  
  // Generate team performance metrics
  const performanceMetrics: PerformanceMetric[] = getTeamPerformanceData(filteredTeamMembers);
  
  // Check if there are team members to display
  if (teamMembers.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="py-12 text-center">
            <UserPlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-2">No Team Members Added Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Add team members to see performance metrics and reports. Team reports will show
              productivity, conversion rates, and other key metrics.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // If filtered team members are empty but there are team members, show a message
  if (filteredTeamMembers.length === 0 && teamMembers.length > 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="py-12 text-center">
            <h3 className="text-xl font-medium mb-2">No Matching Team Members</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              No team members match your current filter selections. Try adjusting your filters to view team performance data.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Team performance comparison data
  const performanceComparisonData = performanceMetrics.map(metric => ({
    name: metric.name,
    leads: metric.leadsAssigned,
    contacted: metric.leadsContacted,
    responses: metric.leadsResponded,
    converted: metric.leadsConverted,
  }));
  
  // Team activity over time
  const activityTimelineData = [
    { name: 'Week 1', leads: 120, responses: 45, conversions: 10 },
    { name: 'Week 2', leads: 150, responses: 60, conversions: 15 },
    { name: 'Week 3', leads: 180, responses: 70, conversions: 22 },
    { name: 'Week 4', leads: 220, responses: 90, conversions: 30 },
  ];
  
  // Team member skill assessment
  const skillsData = filteredTeamMembers.map(member => {
    return {
      name: member.name,
      lead_generation: Math.floor(Math.random() * 100),
      communication: Math.floor(Math.random() * 100),
      follow_up: Math.floor(Math.random() * 100),
      conversion: Math.floor(Math.random() * 100),
      responsiveness: Math.floor(Math.random() * 100),
    };
  });
  
  return (
    <div className="space-y-6">
      {/* Team Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Comparison</CardTitle>
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
                <Bar dataKey="leads" name="Leads Assigned" fill="#8884d8" />
                <Bar dataKey="contacted" name="Leads Contacted" fill="#82ca9d" />
                <Bar dataKey="responses" name="Leads Responded" fill="#ffc658" />
                <Bar dataKey="converted" name="Leads Converted" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Team Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Team Activity Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="aspect-square md:aspect-video">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={activityTimelineData}
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
                <Line type="monotone" dataKey="leads" name="Leads Assigned" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="responses" name="Responses Generated" stroke="#82ca9d" />
                <Line type="monotone" dataKey="conversions" name="Conversions Achieved" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Team Member Skills Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Team Member Skills Assessment</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skillsData.map((memberSkills, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium mb-3 text-center">{memberSkills.name}</h3>
              <ChartContainer config={{}} className="aspect-square">
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="80%" 
                    data={[
                      { subject: 'Lead Generation', A: memberSkills.lead_generation, fullMark: 100 },
                      { subject: 'Communication', A: memberSkills.communication, fullMark: 100 },
                      { subject: 'Follow Up', A: memberSkills.follow_up, fullMark: 100 },
                      { subject: 'Conversion', A: memberSkills.conversion, fullMark: 100 },
                      { subject: 'Responsiveness', A: memberSkills.responsiveness, fullMark: 100 },
                    ]}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Skills" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Team Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Team Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={performanceMetrics} 
            type="performance"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamReports;
