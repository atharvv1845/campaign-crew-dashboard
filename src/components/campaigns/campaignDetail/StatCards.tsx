
import React from 'react';
import { Users, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

interface StatCardsProps {
  campaign: {
    leads: number;
    contacted: number;
    responses: number;
    positive: number;
    negative: number;
  };
}

const StatCards: React.FC<StatCardsProps> = ({ campaign }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Leads</p>
            <p className="text-2xl font-bold">{campaign.leads.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary"
              style={{ width: `${(campaign.contacted / campaign.leads) * 100}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {campaign.contacted.toLocaleString()} contacted ({Math.round((campaign.contacted / campaign.leads) * 100)}%)
          </p>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Responses</p>
            <p className="text-2xl font-bold">{campaign.responses.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500"
              style={{ width: `${(campaign.responses / campaign.contacted) * 100}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {Math.round((campaign.responses / campaign.contacted) * 100)}% response rate
          </p>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Positive</p>
            <p className="text-2xl font-bold">{campaign.positive.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500"
              style={{ width: `${(campaign.positive / campaign.responses) * 100}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {Math.round((campaign.positive / campaign.responses) * 100)}% of responses
          </p>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Negative</p>
            <p className="text-2xl font-bold">{campaign.negative.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-500"
              style={{ width: `${(campaign.negative / campaign.responses) * 100}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {Math.round((campaign.negative / campaign.responses) * 100)}% of responses
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
