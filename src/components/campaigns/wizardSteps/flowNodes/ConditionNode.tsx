
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Handle, Position } from 'reactflow';

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
      
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        style={{ background: '#3b82f6' }}
      />
      
      {/* Output handles for Yes/No branches */}
      <div className="flex justify-between mt-4 text-xs text-muted-foreground">
        <div className="flex flex-col items-center">
          <span>Yes</span>
          <Handle
            type="source"
            position={Position.Bottom}
            id="yes"
            style={{ background: '#10b981', left: '30%' }}
          />
        </div>
        <div className="flex flex-col items-center">
          <span>No</span>
          <Handle
            type="source"
            position={Position.Bottom}
            id="no"
            style={{ background: '#ef4444', left: '70%' }}
          />
        </div>
      </div>
    </div>
  );
}

export default ConditionNode;
