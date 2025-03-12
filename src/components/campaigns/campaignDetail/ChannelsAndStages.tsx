
import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import ChannelBadge from '../ChannelBadge';
import StageBadge from './badges/StageBadge';

interface ChannelsAndStagesProps {
  campaign: {
    channels: string[];
    leads: number;
    stages: Array<{
      id: number | string;
      name: string;
      count?: number;
    }>;
  };
}

const ChannelsAndStages: React.FC<ChannelsAndStagesProps> = ({ campaign }) => {
  // Ensure leads is a number to prevent NaN when calculating percentages
  const totalLeads = typeof campaign.leads === 'number' ? campaign.leads : 0;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Channels */}
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-sm font-medium mb-3">Outreach Channels</h3>
        <div className="flex flex-wrap gap-2">
          {campaign.channels.map((channel, index) => (
            <ChannelBadge key={index} channel={channel} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-muted/10 rounded-lg">
            <div className="flex items-center justify-center h-8 w-8 mx-auto rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-2">
              <Mail className="h-4 w-4" />
            </div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium">872 sent</p>
          </div>
          <div className="text-center p-3 bg-muted/10 rounded-lg">
            <div className="flex items-center justify-center h-8 w-8 mx-auto rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 mb-2">
              <MessageSquare className="h-4 w-4" />
            </div>
            <p className="text-xs text-muted-foreground">LinkedIn</p>
            <p className="text-sm font-medium">543 sent</p>
          </div>
          <div className="text-center p-3 bg-muted/10 rounded-lg">
            <div className="flex items-center justify-center h-8 w-8 mx-auto rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mb-2">
              <MessageSquare className="h-4 w-4" />
            </div>
            <p className="text-xs text-muted-foreground">WhatsApp</p>
            <p className="text-sm font-medium">321 sent</p>
          </div>
        </div>
      </div>
      
      {/* Stages */}
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-sm font-medium mb-3">Lead Stages</h3>
        <div className="space-y-3">
          {campaign.stages && campaign.stages.map(stage => {
            // Ensure count is a number and has a default value of 0
            const count = typeof stage.count === 'number' ? stage.count : 0;
            // Calculate percentage safely
            const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
            
            return (
              <div key={stage.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StageBadge stage={stage.name} />
                  <span className="text-sm">{stage.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{count.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">
                    ({percentage}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChannelsAndStages;
