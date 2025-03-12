
import React, { useState, useEffect } from 'react';
import { campaignData } from '@/components/campaigns/campaignData';
import StatCard from '@/components/dashboard/StatCard';
import { 
  Users, 
  MessageSquare, 
  BarChart4, 
  UserPlus, 
  Mail, 
  Calendar,
  CheckCircle2,
  XCircle
} from 'lucide-react';
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
  Cell,
  AreaChart, 
  Area
} from 'recharts';

const Reports: React.FC = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    messagesSent: 0,
    responseRate: 0,
    newLeads: 0,
    positiveResponses: 0,
    negativeResponses: 0
  });
  
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    // Calculate actual stats from campaignData
    const calculateStats = () => {
      let totalLeads = 0;
      let messagesSent = 0;
      let responses = 0;
      let positiveResponses = 0;
      let negativeResponses = 0;
      
      campaignData.forEach(campaign => {
        // Count leads
        totalLeads += typeof campaign.leads === 'number' 
          ? campaign.leads 
          : Array.isArray(campaign.leads) ? campaign.leads.length : 0;
        
        // Count messages, responses, etc.
        messagesSent += campaign.contacted || 0;
        responses += campaign.responses || 0;
        positiveResponses += campaign.positive || 0;
        negativeResponses += campaign.negative || 0;
      });
      
      // Calculate derived metrics
      const responseRate = messagesSent > 0 
        ? Math.round((responses / messagesSent) * 100) 
        : 0;
      
      setStats({
        totalLeads,
        messagesSent,
        responseRate,
        newLeads: Math.round(totalLeads * 0.3), // Assumption for demo
        positiveResponses,
        negativeResponses
      });
    };
    
    calculateStats();
  }, [campaignData]);

  // Generate chart data from real campaign data
  const generateChartData = () => {
    if (campaignData.length === 0) {
      return [
        { name: 'No Data', leads: 0, responses: 0 }
      ];
    }
    
    // For demo purposes, create a timeline from campaign creation dates
    return campaignData.map(campaign => {
      const date = new Date(campaign.createdAt);
      const month = date.toLocaleString('default', { month: 'short' });
      
      return {
        name: month,
        leads: typeof campaign.leads === 'number' 
          ? campaign.leads 
          : Array.isArray(campaign.leads) ? campaign.leads.length : 0,
        responses: campaign.responses || 0,
        positive: campaign.positive || 0,
        negative: campaign.negative || 0
      };
    });
  };

  // Generate response distribution data for pie chart
  const generateResponseData = () => {
    const positive = stats.positiveResponses;
    const negative = stats.negativeResponses;
    const noResponse = stats.messagesSent - positive - negative;
    
    return [
      { name: 'Positive', value: positive > 0 ? positive : 1 },
      { name: 'Negative', value: negative > 0 ? negative : 1 },
      { name: 'No Response', value: noResponse > 0 ? noResponse : 1 }
    ];
  };

  // Team performance data based on actual campaigns
  const generateTeamData = () => {
    // Create a map to track team member performance
    const teamMap = new Map();
    
    campaignData.forEach(campaign => {
      (campaign.teamMembers || []).forEach(member => {
        if (!teamMap.has(member)) {
          teamMap.set(member, { 
            name: member, 
            leads: 0, 
            responses: 0 
          });
        }
        
        // For demo purposes, distribute leads and responses among team members
        const memberData = teamMap.get(member);
        const teamSize = campaign.teamMembers?.length || 1;
        const leadsCount = typeof campaign.leads === 'number' 
          ? campaign.leads 
          : Array.isArray(campaign.leads) ? campaign.leads.length : 0;
        
        memberData.leads += Math.round(leadsCount / teamSize);
        memberData.responses += Math.round((campaign.responses || 0) / teamSize);
      });
    });
    
    return Array.from(teamMap.values());
  };

  const chartData = generateChartData();
  const responseData = generateResponseData();
  const teamData = generateTeamData();
  
  // Colors for the pie chart
  const COLORS = ['#22c55e', '#ef4444', '#94a3b8'];

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Leads" 
          value={stats.totalLeads.toString()} 
          change={{ 
            value: campaignData.length > 0 ? "Active" : "No campaigns", 
            positive: campaignData.length > 0
          }}
          icon={Users}
          description={`From ${campaignData.length} campaigns`}
        />
        <StatCard 
          title="Messages Sent" 
          value={stats.messagesSent.toString()} 
          change={{ 
            value: stats.messagesSent > 0 ? "Active" : "No messages", 
            positive: stats.messagesSent > 0
          }}
          icon={MessageSquare}
          description="Across all campaigns"
        />
        <StatCard 
          title="Response Rate" 
          value={`${stats.responseRate}%`} 
          change={{ 
            value: stats.responseRate > 20 ? "Good" : "Needs improvement", 
            positive: stats.responseRate > 20
          }}
          icon={BarChart4}
          description="Based on sent messages"
        />
        <StatCard 
          title="Positive Responses" 
          value={stats.positiveResponses.toString()} 
          change={{ 
            value: `${stats.messagesSent > 0 ? Math.round((stats.positiveResponses / stats.messagesSent) * 100) : 0}%`, 
            positive: true
          }}
          icon={CheckCircle2}
          description="Leads showing interest"
        />
      </div>
      
      {/* Performance Overview Chart */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-medium mb-6">Campaign Performance</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="name" stroke="rgba(0,0,0,0.35)" />
              <YAxis stroke="rgba(0,0,0,0.35)" />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '0.5rem', 
                  border: 'none', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="leads" 
                stackId="1" 
                stroke="rgba(59, 130, 246, 0.9)" 
                fill="rgba(59, 130, 246, 0.1)" 
                name="Leads" 
              />
              <Area 
                type="monotone" 
                dataKey="responses" 
                stackId="2" 
                stroke="rgba(16, 185, 129, 0.9)" 
                fill="rgba(16, 185, 129, 0.1)" 
                name="Responses" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Detailed Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-medium mb-6">Response Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={responseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {responseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-medium mb-6">Team Performance</h3>
          <div className="h-[300px]">
            {teamData.length > 0 ? (
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
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No team performance data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Specific Stats */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-medium mb-6">Campaign Performance Comparison</h3>
        <div className="h-[400px]">
          {campaignData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={campaignData.map(c => ({
                  name: c.name.length > 15 ? c.name.substring(0, 15) + '...' : c.name,
                  leads: typeof c.leads === 'number' ? c.leads : Array.isArray(c.leads) ? c.leads.length : 0,
                  responses: c.responses || 0,
                  positive: c.positive || 0,
                  negative: c.negative || 0
                }))}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" fill="#8884d8" name="Total Leads" />
                <Bar dataKey="responses" fill="#82ca9d" name="Responses" />
                <Bar dataKey="positive" stackId="responses" fill="#22c55e" name="Positive" />
                <Bar dataKey="negative" stackId="responses" fill="#ef4444" name="Negative" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No campaigns available for comparison
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
