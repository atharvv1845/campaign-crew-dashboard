
import React from 'react';
import { Handle, Position } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Clock } from 'lucide-react';

interface DelayNodeProps {
  data: {
    delay: string;
    onEdit: () => void;
    onDelete: () => void;
  };
}

const DelayNode: React.FC<DelayNodeProps> = ({ data }) => {
  return (
    <div className="p-3 border rounded-md bg-amber-50 shadow-sm w-60">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center">
            <Clock className="h-3 w-3 text-amber-600" />
          </div>
          <span className="text-sm font-medium">Delay</span>
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
      
      <p className="text-xs font-medium text-center py-2">
        Wait for {data.delay}
      </p>
      
      {/* Input and output handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-amber-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-amber-500"
      />
    </div>
  );
};

export default DelayNode;
