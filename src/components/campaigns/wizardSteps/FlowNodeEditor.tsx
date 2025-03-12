
import React from 'react';
import { Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageStepData, DelayStepData, ConditionStepData } from '../types/campaignTypes';
import MessageForm from './flowForms/MessageForm';
import DelayForm from './flowForms/DelayForm';
import ConditionForm from './flowForms/ConditionForm';

interface FlowNodeEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodeType: 'message' | 'delay' | 'condition';
  nodeData: MessageStepData | DelayStepData | ConditionStepData;
  setNodeData: React.Dispatch<React.SetStateAction<MessageStepData | DelayStepData | ConditionStepData>>;
  selectedNode: string | null;
  onSave: () => void;
  onDelete: () => void;
}

const FlowNodeEditor: React.FC<FlowNodeEditorProps> = ({
  open,
  onOpenChange,
  nodeType,
  nodeData,
  setNodeData,
  selectedNode,
  onSave,
  onDelete,
}) => {
  const renderForm = () => {
    switch (nodeType) {
      case 'message':
        return (
          <MessageForm 
            data={nodeData as MessageStepData} 
            onChange={(data) => setNodeData(data)} 
          />
        );
      case 'delay':
        return (
          <DelayForm 
            data={nodeData as DelayStepData} 
            onChange={(data) => setNodeData(data)} 
          />
        );
      case 'condition':
        return (
          <ConditionForm 
            data={nodeData as ConditionStepData} 
            onChange={(data) => setNodeData(data)} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {selectedNode ? 'Edit' : 'Add'} {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {renderForm()}
          
          <div className="flex justify-between pt-2">
            {selectedNode && (
              <Button variant="destructive" onClick={onDelete}>
                <Trash className="h-4 w-4 mr-1" /> Delete
              </Button>
            )}
            <div className="ml-auto space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={onSave}>Save</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlowNodeEditor;
