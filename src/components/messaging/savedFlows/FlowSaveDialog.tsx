
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface FlowSaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flowName: string;
  setFlowName: (name: string) => void;
  flowDescription: string;
  setFlowDescription: (description: string) => void;
  isEdit: boolean;
  onSave: () => void;
}

const FlowSaveDialog: React.FC<FlowSaveDialogProps> = ({
  open,
  onOpenChange,
  flowName,
  setFlowName,
  flowDescription,
  setFlowDescription,
  isEdit,
  onSave
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Update Flow' : 'Save Flow'}</DialogTitle>
          <DialogDescription>
            {isEdit 
              ? 'Update your outreach flow details'
              : 'Give your outreach flow a name to save it for future use'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="flow-name">Flow Name</Label>
            <Input
              id="flow-name"
              placeholder="E.g., Tech Startup 3-Step Outreach"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="flow-description">Description (optional)</Label>
            <Textarea
              id="flow-description"
              placeholder="Briefly describe this flow's purpose or target audience"
              value={flowDescription}
              onChange={(e) => setFlowDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="flow-status">Status</Label>
            <Select defaultValue="draft">
              <SelectTrigger id="flow-status">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            {isEdit ? 'Update' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlowSaveDialog;
