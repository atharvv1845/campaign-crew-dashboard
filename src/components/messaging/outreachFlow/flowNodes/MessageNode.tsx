
import React from 'react';
import { Handle, Position } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import StepIcon from '../StepIcon';

interface MessageNodeProps {
  data: {
    platform: string;
    subject?: string;
    content?: string;
    onEdit: () => void;
    onDelete: () => void;
  };
}

const MessageNode: React.FC<MessageNodeProps> = ({ data }) => {
  return (
    <div className="p-3 border rounded-md bg-white shadow-sm w-60">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
            <StepIcon type="message" platform={data.platform} />
          </div>
          <span className="text-sm font-medium capitalize">{data.platform} Message</span>
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={data.onEdit}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-destructive"
            onClick={data.onDelete}
          >
            <Trash className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {data.subject && (
        <p className="text-xs font-medium mb-1">Subject: {data.subject}</p>
      )}
      
      <p className="text-xs text-muted-foreground line-clamp-3">
        {data.content}
      </p>
      
      {/* Input and output handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-blue-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-blue-500"
      />
    </div>
  );
};

export default MessageNode;
