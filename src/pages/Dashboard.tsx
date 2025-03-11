
import React from 'react';
import { Users, MessageSquare, BarChart4, UserPlus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '@/components/dashboard/StatCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import RecentCampaigns from '@/components/dashboard/RecentCampaigns';

// Mock data for chart
const chartData = [
  { name: 'Jan', leads: 400, responses: 240 },
  { name: 'Feb', leads: 300, responses: 180 },
  { name: 'Mar', leads: 510, responses: 250 },
  { name: 'Apr', leads: 390, responses: 190 },
  { name: 'May', leads: 600, responses: 270 },
  { name: 'Jun', leads: 700, responses: 350 },
  { name: 'Jul', leads: 890, responses: 480 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Leads" 
          value="12,431" 
          change={{ value: "8.2%", positive: true }}
          icon={Users}
          description="1,453 new this month"
        />
        <StatCard 
          title="Messages Sent" 
          value="8,720" 
          change={{ value: "12.5%", positive: true }}
          icon={MessageSquare}
          description="2,340 this month"
        />
        <StatCard 
          title="Response Rate" 
          value="32.8%" 
          change={{ value: "3.1%", positive: true }}
          icon={BarChart4}
          description="Up from 29.7% last month"
        />
        <StatCard 
          title="New Leads" 
          value="1,453" 
          change={{ value: "4.3%", positive: false }}
          icon={UserPlus}
          description="Down from last month"
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
