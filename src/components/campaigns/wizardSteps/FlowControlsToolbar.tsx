
import React from 'react';
import { MessageSquare, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FlowControlsToolbarProps {
  onAddNode: (type: 'message' | 'delay' | 'condition') => void;
}

const FlowControlsToolbar: React.FC<FlowControlsToolbarProps> = ({ onAddNode }) => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <h3 className="text-lg font-semibold">Message Sequence Flow</h3>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onAddNode('message')}>
          <MessageSquare className="h-4 w-4 mr-1" /> Add Message
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAddNode('delay')}>
          <Clock className="h-4 w-4 mr-1" /> Add Delay
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAddNode('condition')}>
          <AlertTriangle className="h-4 w-4 mr-1" /> Add Condition
        </Button>
      </div>
    </div>
  );
};

export default FlowControlsToolbar;
