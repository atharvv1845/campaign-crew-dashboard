
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageStep } from '../hooks/sequenceTypes';
import MessageStepForm from './forms/MessageStepForm';
import DelayStepForm from './forms/DelayStepForm';

interface EditStepDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingStepData: MessageStep | null;
  setEditingStepData: React.Dispatch<React.SetStateAction<MessageStep | null>>;
  onSave: () => void;
}

const EditStepDialog: React.FC<EditStepDialogProps> = ({
  open,
  onOpenChange,
  editingStepData,
  setEditingStepData,
  onSave,
}) => {
  if (!editingStepData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingStepData?.id ? 'Edit' : 'Add'} Message Step
          </DialogTitle>
          <DialogDescription>
            Configure the details for this message step.
          </DialogDescription>
        </DialogHeader>
        
        {editingStepData.type !== 'delay' ? (
          <MessageStepForm
            data={editingStepData}
            onChange={setEditingStepData}
          />
        ) : (
          <DelayStepForm
            data={editingStepData}
            onChange={setEditingStepData}
          />
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStepDialog;
