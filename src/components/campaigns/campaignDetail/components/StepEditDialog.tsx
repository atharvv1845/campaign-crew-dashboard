
import React from 'react';
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StepEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingStepData: any;
  setEditingStepData: React.Dispatch<React.SetStateAction<any>>;
  onSave: () => void;
}

const StepEditDialog: React.FC<StepEditDialogProps> = ({
  open,
  onOpenChange,
  editingStepData,
  setEditingStepData,
  onSave,
}) => {
  if (!editingStepData) return null;

  const channelOptions = [
    { value: 'email', label: 'Email' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'call', label: 'Call' },
    { value: 'sms', label: 'SMS' },
    { value: 'whatsapp', label: 'WhatsApp' },
  ];
  
  const teamOptions = [
    { value: 'john', label: 'John Smith' },
    { value: 'sarah', label: 'Sarah Lee' },
    { value: 'alex', label: 'Alex Chen' },
    { value: 'mia', label: 'Mia Johnson' },
  ];

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
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Channel</Label>
                <Select 
                  value={editingStepData.type}
                  onValueChange={(value) => setEditingStepData({...editingStepData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {channelOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Assigned To</Label>
                <Select 
                  value={editingStepData.assignedTo || ''}
                  onValueChange={(value) => setEditingStepData({...editingStepData, assignedTo: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {editingStepData.type === 'email' && (
              <div className="space-y-2">
                <Label>Subject Line</Label>
                <Input 
                  value={editingStepData.subject || ''}
                  onChange={(e) => setEditingStepData({...editingStepData, subject: e.target.value})}
                  placeholder="Enter subject line"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label>Message Content</Label>
              <Textarea 
                value={editingStepData.content || ''}
                onChange={(e) => setEditingStepData({...editingStepData, content: e.target.value})}
                placeholder="Enter your message..."
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Use [name], [company], etc. for personalization.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Condition (Optional)</Label>
              <Select 
                value={editingStepData.condition || ''}
                onValueChange={(value) => setEditingStepData({...editingStepData, condition: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add a condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No condition</SelectItem>
                  <SelectItem value="noreply">If no reply in 3 days</SelectItem>
                  <SelectItem value="opened">If email opened</SelectItem>
                  <SelectItem value="clicked">If link clicked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Days</Label>
                <Select 
                  value={editingStepData.delay?.split(' ')[0] || '1'}
                  onValueChange={(value) => setEditingStepData({
                    ...editingStepData, 
                    delay: `${value} ${value === '1' ? 'day' : 'days'}`
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 7, 10, 14].map(d => (
                      <SelectItem key={d} value={String(d)}>
                        {d} {d === 1 ? 'day' : 'days'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
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

export default StepEditDialog;
