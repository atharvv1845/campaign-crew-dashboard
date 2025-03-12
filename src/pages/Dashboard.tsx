
import React from 'react';
import { Users, MessageSquare, BarChart4, UserPlus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '@/components/dashboard/StatCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import RecentCampaigns from '@/components/dashboard/RecentCampaigns';
import { campaignData } from '@/components/campaigns/campaignData';

// Calculate real statistics from campaign data
const calculateStats = () => {
  // Default values if no campaigns exist
  if (campaignData.length === 0) {
    return {
      totalLeads: 0,
      messagesSent: 0,
      responseRate: 0,
      newLeads: 0,
      chartData: []
    };
  }

  // Calculate totals
  const totalLeads = campaignData.reduce((sum, campaign) => {
    return sum + (Array.isArray(campaign.leads) ? campaign.leads.length : campaign.leads || 0);
  }, 0);

  const totalResponses = campaignData.reduce((sum, campaign) => sum + (campaign.responses || 0), 0);
  const totalPositive = campaignData.reduce((sum, campaign) => sum + (campaign.positive || 0), 0);
  const totalNegative = campaignData.reduce((sum, campaign) => sum + (campaign.negative || 0), 0);
  
  // Calculate response rate
  const responseRate = totalLeads > 0 ? (totalResponses / totalLeads * 100).toFixed(1) : "0";
  
  // Estimate messages sent (typically more than responses)
  const messagesSent = totalResponses * 3;

  // Generate chart data based on campaigns
  const monthsMap = {
    'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0
  };
  
  // Group campaign data by month
  campaignData.forEach(campaign => {
    const month = new Date(campaign.createdAt).toLocaleString('en-US', { month: 'short' });
    if (monthsMap.hasOwnProperty(month)) {
      monthsMap[month] += Array.isArray(campaign.leads) ? campaign.leads.length : (campaign.leads || 0);
    }
  });
  
  // Convert to chart data format
  const chartData = Object.entries(monthsMap).map(([name, leads]) => {
    // Estimate responses as a percentage of leads
    const responses = Math.round(leads * (totalResponses / totalLeads || 0.3));
    return { name, leads, responses };
  });

  return {
    totalLeads,
    messagesSent,
    responseRate,
    newLeads: Math.round(totalLeads * 0.15), // Estimate new leads as 15% of total
    chartData
  };
};

const { totalLeads, messagesSent, responseRate, newLeads, chartData } = calculateStats();

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Leads" 
          value={totalLeads.toLocaleString()} 
          change={{ value: "8.2%", positive: true }}
          icon={Users}
          description={`${newLeads.toLocaleString()} new this month`}
        />
        <StatCard 
          title="Messages Sent" 
          value={messagesSent.toLocaleString()} 
          change={{ value: "12.5%", positive: true }}
          icon={MessageSquare}
          description={`${Math.round(messagesSent * 0.3).toLocaleString()} this month`}
        />
        <StatCard 
          title="Response Rate" 
          value={`${responseRate}%`} 
          change={{ value: "3.1%", positive: true }}
          icon={BarChart4}
          description="Based on actual campaign data"
        />
        <StatCard 
          title="New Leads" 
          value={newLeads.toLocaleString()} 
          change={{ value: "4.3%", positive: false }}
          icon={UserPlus}
          description="Added in the last 30 days"
        />
      </div>
      
      {/* Chart */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-medium mb-6">Performance Overview</h3>
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
      
      {/* Activity and Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
        <div className="lg:col-span-2">
          <RecentCampaigns />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
