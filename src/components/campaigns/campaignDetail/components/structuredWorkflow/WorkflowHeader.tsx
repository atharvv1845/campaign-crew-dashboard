
import React from 'react';
import { Save, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkflowHeaderProps {
  onSaveClick: () => void;
  onLoadClick: () => void;
}

const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({ onSaveClick, onLoadClick }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Message Workflow</h2>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onLoadClick}>
          <Folder className="h-4 w-4 mr-2" />
          Load Workflow
        </Button>
        <Button onClick={onSaveClick}>
          <Save className="h-4 w-4 mr-2" />
          Save Workflow
        </Button>
      </div>
    </div>
  );
};

export default WorkflowHeader;
