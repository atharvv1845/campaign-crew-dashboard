
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    positive: boolean;
  };
  icon: LucideIcon;
  description?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  description,
  className 
}) => {
  return (
    <div className={cn(
      "glass-card p-6 rounded-xl hover-effect",
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-semibold mb-1">{value}</h3>
          
          {change && (
            <div className="flex items-center">
              <span className={cn(
                "text-xs font-medium",
                change.positive ? "text-green-500" : "text-red-500"
              )}>
                {change.positive ? '+' : ''}{change.value}
              </span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
