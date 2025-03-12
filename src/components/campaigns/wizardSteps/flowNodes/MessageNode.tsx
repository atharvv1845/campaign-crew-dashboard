
import React from 'react';
import { Mail } from 'lucide-react';
import { Handle, Position } from 'reactflow';

interface MessageNodeProps {
  data: {
    label: string;
    message: string;
    channel?: string;
    subject?: string;
  };
  id: string;
}

function MessageNode({ data, id }: MessageNodeProps) {
  return (
    <div className="p-3 rounded-md border border-border bg-card w-64">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2 text-primary" />
          <span className="font-medium text-sm">{data.label}</span>
        </div>
        {data.channel && (
          <div className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full capitalize">
            {data.channel}
          </div>
        )}
      </div>
      {data.subject && (
        <div className="text-xs font-medium mb-1">
          Subject: {data.subject}
        </div>
      )}
      <div className="text-xs text-muted-foreground border-t border-border pt-2 mt-1">
        {data.message}
      </div>
      
      {/* Input handle - where connections can come in */}
      <Handle
        type="target"
        position={Position.Top}
        id="in"
        className="w-3 h-3 !bg-primary hover:!bg-primary-foreground transition-colors"
      />
      
      {/* Output handle - where connections can go out */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="out"
        className="w-3 h-3 !bg-primary hover:!bg-primary-foreground transition-colors"
      />
    </div>
  );
}

export default MessageNode;
