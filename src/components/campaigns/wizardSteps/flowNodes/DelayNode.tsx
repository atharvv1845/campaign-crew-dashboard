
import React from 'react';
import { Clock } from 'lucide-react';

interface DelayNodeProps {
  data: {
    label: string;
    days: number;
  };
  id: string;
}

function DelayNode({ data, id }: DelayNodeProps) {
  return (
    <div className="p-3 rounded-md border border-border bg-muted/10 w-64">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="font-medium text-sm">{data.label}</span>
        </div>
      </div>
      <div className="text-xs text-muted-foreground border-t border-border pt-2 mt-1">
        Wait for {data.days} {data.days === 1 ? 'day' : 'days'}
      </div>
    </div>
  );
}

export default DelayNode;
