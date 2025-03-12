
import React from 'react';
import { Mail, Clock, GitBranch, Plus } from 'lucide-react';

interface FlowControlsToolbarProps {
  onAddNode: (type: 'message' | 'delay' | 'condition') => void;
}

const FlowControlsToolbar: React.FC<FlowControlsToolbarProps> = ({ onAddNode }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm font-medium">Add Message Flow Step:</div>
      <div className="flex space-x-2">
        <button
          onClick={() => onAddNode('message')}
          className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
        >
          <Mail className="h-4 w-4 mr-2" />
          <span>Add Message</span>
        </button>
        <button
          onClick={() => onAddNode('delay')}
          className="flex items-center px-3 py-2 bg-yellow-50 text-yellow-600 rounded-md hover:bg-yellow-100 transition-colors"
        >
          <Clock className="h-4 w-4 mr-2" />
          <span>Add Delay</span>
        </button>
        <button
          onClick={() => onAddNode('condition')}
          className="flex items-center px-3 py-2 bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100 transition-colors"
        >
          <GitBranch className="h-4 w-4 mr-2" />
          <span>Add Condition</span>
        </button>
      </div>
    </div>
  );
};

export default FlowControlsToolbar;
