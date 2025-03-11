
import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for recent campaigns
const campaigns = [
  {
    id: 1,
    name: 'Q4 Product Launch',
    status: 'Active',
    progress: 68,
    trend: 'up',
    stats: {
      sent: 1243,
      opened: 876,
      replied: 341
    }
  },
  {
    id: 2,
    name: 'Summer Sale Outreach',
    status: 'Active',
    progress: 92,
    trend: 'up',
    stats: {
      sent: 2540,
      opened: 2183,
      replied: 764
    }
  },
  {
    id: 3,
    name: 'Customer Feedback Survey',
    status: 'Completed',
    progress: 100,
    trend: 'neutral',
    stats: {
      sent: 864,
      opened: 652,
      replied: 342
    }
  }
];

const RecentCampaigns: React.FC = () => {
  return (
    <div className="glass-card rounded-xl">
      <div className="p-6 flex justify-between items-center border-b border-border">
        <h3 className="text-lg font-medium">Recent Campaigns</h3>
        <button className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
          View All <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="divide-y divide-border">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="p-5 hover:bg-muted/20 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium text-base">{campaign.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    campaign.status === 'Active' 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                  )}>
                    {campaign.status}
                  </span>
                  
                  {campaign.trend === 'up' && (
                    <span className="flex items-center text-xs text-green-500">
                      <TrendingUp className="h-3 w-3 mr-1" /> Performing well
                    </span>
                  )}
                  
                  {campaign.trend === 'down' && (
                    <span className="flex items-center text-xs text-red-500">
                      <TrendingDown className="h-3 w-3 mr-1" /> Needs attention
                    </span>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-sm font-medium">{campaign.progress}%</span>
                <div className="mt-1 w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Sent</p>
                <p className="text-sm font-medium">{campaign.stats.sent.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Opened</p>
                <p className="text-sm font-medium">{campaign.stats.opened.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Replied</p>
                <p className="text-sm font-medium">{campaign.stats.replied.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-5 border-t border-border bg-muted/10 flex justify-center">
        <button className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
          Create New Campaign <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default RecentCampaigns;
