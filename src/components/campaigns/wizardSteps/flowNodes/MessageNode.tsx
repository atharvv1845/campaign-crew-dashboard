
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface MessageNodeProps {
  data: {
    label: string;
    channel: string;
    message: string;
  };
  id: string;
}

function MessageNode({ data, id }: MessageNodeProps) {
  return (
    <div className="p-3 rounded-md border border-border bg-card w-64">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <MessageSquare className="w-4 h-4 mr-2 text-primary" />
          <span className="font-medium text-sm">{data.label}</span>
        </div>
        <div className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full capitalize">
          {data.channel}
        </div>
      </div>
      <div className="text-xs text-muted-foreground border-t border-border pt-2 mt-1">
        {data.message.length > 100 ? `${data.message.substring(0, 100)}...` : data.message}
      </div>
    </div>
  );
}

export default MessageNode;
