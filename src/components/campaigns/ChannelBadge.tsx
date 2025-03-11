
import React from 'react';
import { cn } from '@/lib/utils';

interface ChannelBadgeProps {
  channel: string;
}

const ChannelBadge: React.FC<ChannelBadgeProps> = ({ channel }) => {
  const getChannelStyles = (channel: string) => {
    switch (channel) {
      case 'Email':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'LinkedIn':
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
      case 'WhatsApp':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'SMS':
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case 'Twitter':
        return "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400";
      case 'Instagram':
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-1",
      getChannelStyles(channel)
    )}>
      {channel}
    </span>
  );
};

export default ChannelBadge;
