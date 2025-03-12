
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConditionNodeProps {
  data: {
    label: string;
    condition: string;
  };
  id: string;
}

function ConditionNode({ data, id }: ConditionNodeProps) {
  return (
    <div className="p-3 rounded-md border border-border bg-amber-500/10 w-64">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
          <span className="font-medium text-sm">{data.label}</span>
        </div>
      </div>
      <div className="text-xs text-muted-foreground border-t border-border pt-2 mt-1">
        {data.condition}
      </div>
    </div>
  );
}

export default ConditionNode;
