
import React from 'react';
import { 
  MessageSquare, 
  UserRound, 
  FileSpreadsheet, 
  ThumbsUp, 
  Bell, 
  BarChart 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for the activity feed
const activities = [
  {
    id: 1,
    type: 'message',
    content: 'Sarah replied to Q4 Product Launch email',
    time: '2 minutes ago',
    icon: MessageSquare,
  },
  {
    id: 2,
    type: 'lead',
    content: 'New lead assigned to your team',
    time: '15 minutes ago',
    icon: UserRound,
  },
  {
    id: 3,
    type: 'campaign',
    content: 'Q4 Product Launch campaign started',
    time: '1 hour ago',
    icon: FileSpreadsheet,
  },
  {
    id: 4,
    type: 'response',
    content: 'John expressed interest in the demo',
    time: '3 hours ago',
    icon: ThumbsUp,
  },
  {
    id: 5,
    type: 'reminder',
    content: 'Follow-up reminder for Alpha Corp',
    time: '5 hours ago',
    icon: Bell,
  },
  {
    id: 6,
    type: 'report',
    content: 'Weekly performance report ready',
    time: '1 day ago',
    icon: BarChart,
  },
];

// Get the appropriate colors for each activity type
const getActivityStyles = (type: string) => {
  switch (type) {
    case 'message':
      return { bgColor: 'bg-blue-50 dark:bg-blue-950/30', textColor: 'text-blue-500', iconColor: 'text-blue-500' };
    case 'lead':
      return { bgColor: 'bg-purple-50 dark:bg-purple-950/30', textColor: 'text-purple-500', iconColor: 'text-purple-500' };
    case 'campaign':
      return { bgColor: 'bg-green-50 dark:bg-green-950/30', textColor: 'text-green-500', iconColor: 'text-green-500' };
    case 'response':
      return { bgColor: 'bg-amber-50 dark:bg-amber-950/30', textColor: 'text-amber-500', iconColor: 'text-amber-500' };
    case 'reminder':
      return { bgColor: 'bg-red-50 dark:bg-red-950/30', textColor: 'text-red-500', iconColor: 'text-red-500' };
    case 'report':
      return { bgColor: 'bg-teal-50 dark:bg-teal-950/30', textColor: 'text-teal-500', iconColor: 'text-teal-500' };
    default:
      return { bgColor: 'bg-gray-50 dark:bg-gray-800', textColor: 'text-gray-500', iconColor: 'text-gray-500' };
  }
};

const ActivityFeed: React.FC = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-medium">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-border">
        {activities.map((activity) => {
          const styles = getActivityStyles(activity.type);
          
          return (
            <div key={activity.id} className="p-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-start gap-4">
                <div className={cn("p-2 rounded-lg mt-1", styles.bgColor)}>
                  <activity.icon className={cn("h-4 w-4", styles.iconColor)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium mb-1">{activity.content}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            </div>
          );
        })}
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
