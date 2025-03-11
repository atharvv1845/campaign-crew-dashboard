
import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
}

const CampaignStatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'Completed':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'Draft':
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case 'Scheduled':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      getStatusStyles(status)
    )}>
      {status}
    </span>
  );
};

export default CampaignStatusBadge;
