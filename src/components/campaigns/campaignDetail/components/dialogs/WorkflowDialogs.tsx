
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MessageStep } from '../../hooks/sequenceTypes';

interface SaveWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflowName: string;
  setWorkflowName: (name: string) => void;
  onSave: () => void;
}

interface LoadWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savedWorkflows: { id: number; name: string; steps: MessageStep[] }[];
  onLoad: (id: number) => void;
}

export const SaveWorkflowDialog: React.FC<SaveWorkflowDialogProps> = ({
  open,
  onOpenChange,
  workflowName,
  setWorkflowName,
  onSave
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Workflow</DialogTitle>
          <DialogDescription>
            Save this message sequence as a template for future campaigns.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Workflow Name</Label>
            <Input
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              placeholder="E.g., Standard Follow-up Sequence"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const LoadWorkflowDialog: React.FC<LoadWorkflowDialogProps> = ({
  open,
  onOpenChange,
  savedWorkflows,
  onLoad
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Load Saved Workflow</DialogTitle>
          <DialogDescription>
            Choose a previously saved workflow template.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {savedWorkflows.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              No saved workflows yet. Create and save a workflow first.
            </div>
          ) : (
            savedWorkflows.map(workflow => (
              <Button
                key={workflow.id}
                variant="outline"
                className="w-full justify-between"
                onClick={() => onLoad(workflow.id)}
              >
                <span>{workflow.name}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ))
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
