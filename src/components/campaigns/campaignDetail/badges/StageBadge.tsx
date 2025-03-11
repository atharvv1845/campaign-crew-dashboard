
import React from 'react';
import { cn } from '@/lib/utils';

interface StageBadgeProps {
  stage: string;
}

const StageBadge: React.FC<StageBadgeProps> = ({ stage }) => {
  const getStageStyles = (stage: string) => {
    switch (stage) {
      case 'Not Contacted':
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case 'Contacted':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'Replied':
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
      case 'Follow-Up Needed':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case 'Positive':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'Negative':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      getStageStyles(stage)
    )}>
      {stage}
    </span>
  );
};

export default StageBadge;
