
import React from 'react';
import { FileText } from 'lucide-react';

const ActivityFeed: React.FC = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-medium">Recent Activity</h3>
      </div>
      
      <div className="p-12 flex flex-col items-center justify-center text-center">
        <FileText className="h-10 w-10 text-muted-foreground opacity-40" />
        <p className="mt-4 text-sm text-muted-foreground">No recent activity</p>
      </div>
      
      <div className="p-3 border-t border-border bg-muted/10">
        <button className="w-full text-center text-sm text-primary font-medium py-1 hover:bg-primary/5 rounded-md transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
