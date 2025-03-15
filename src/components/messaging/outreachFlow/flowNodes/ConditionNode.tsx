
import React from 'react';
import { Handle, Position } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Edit, Trash, AlertCircle } from 'lucide-react';

interface ConditionNodeProps {
  data: {
    condition: string;
    onEdit: () => void;
    onDelete: () => void;
  };
}

const ConditionNode: React.FC<ConditionNodeProps> = ({ data }) => {
  let conditionText = '';
  switch(data.condition) {
    case 'noreply':
      conditionText = 'If no reply received';
      break;
    case 'opened':
      conditionText = 'If message opened';
      break;
    case 'clicked':
      conditionText = 'If link clicked';
      break;
    case 'replied':
      conditionText = 'If replied';
      break;
    default:
      conditionText = 'Custom condition';
  }

  return (
    <div className="p-3 border rounded-md bg-red-50 shadow-sm w-60">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="h-3 w-3 text-red-600" />
          </div>
          <span className="text-sm font-medium">Condition</span>
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
        {conditionText}
      </p>
      
      {/* Input and output handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-red-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-red-500"
      />
    </div>
  );
};

export default ConditionNode;
