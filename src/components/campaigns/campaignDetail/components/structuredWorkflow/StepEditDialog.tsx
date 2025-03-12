
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { availableChannels } from '../../../constants/channels';
import { MessageStep } from '../../hooks/sequenceTypes';

interface StepEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingStep: MessageStep | null;
  onEditingStepChange: (step: MessageStep | null) => void;
  onSave: () => void;
}

const StepEditDialog: React.FC<StepEditDialogProps> = ({
  open,
  onOpenChange,
  editingStep,
  onEditingStepChange,
  onSave
}) => {
  if (!editingStep) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editingStep && editingStep.id ? 'Edit Message Step' : 'Add Message Step'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {editingStep.type !== 'delay' ? (
            // Message form
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Channel</Label>
                  <Select
                    value={editingStep.type}
                    onValueChange={(value) => onEditingStepChange({...editingStep, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableChannels.map(channel => (
                        <SelectItem key={channel.id} value={channel.id}>
                          {channel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assigned To</Label>
                  <Select
                    value={editingStep.assignedTo || ''}
                    onValueChange={(value) => onEditingStepChange({...editingStep, assignedTo: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Smith">John Smith</SelectItem>
                      <SelectItem value="Sarah Lee">Sarah Lee</SelectItem>
                      <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {editingStep.type === 'email' && (
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input
                    value={editingStep.subject || ''}
                    onChange={(e) => onEditingStepChange({...editingStep, subject: e.target.value})}
                    placeholder="Email subject line"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Message <span className="text-red-500">*</span></Label>
                <Textarea
                  value={editingStep.content || ''}
                  onChange={(e) => onEditingStepChange({...editingStep, content: e.target.value})}
                  placeholder="Enter your message..."
                  rows={5}
                  required
                />
                <div className="text-xs text-muted-foreground">
                  Use {"{{firstName}}"}, {"{{company}}"}, etc. for personalization.
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Condition (Optional)</Label>
                <Select
                  value={editingStep.condition || ''}
                  onValueChange={(value) => onEditingStepChange({...editingStep, condition: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No condition</SelectItem>
                    <SelectItem value="if-no-reply">If no reply in 3 days</SelectItem>
                    <SelectItem value="if-opened">If opened but no reply</SelectItem>
                    <SelectItem value="if-clicked">If link was clicked</SelectItem>
                    <SelectItem value="if-responded">If responded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            // Delay form
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Delay Duration</Label>
                <Select
                  value={editingStep.delay || '1 day'}
                  onValueChange={(value) => onEditingStepChange({...editingStep, delay: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 day">1 Day</SelectItem>
                    <SelectItem value="2 days">2 Days</SelectItem>
                    <SelectItem value="3 days">3 Days</SelectItem>
                    <SelectItem value="5 days">5 Days</SelectItem>
                    <SelectItem value="1 week">1 Week</SelectItem>
                    <SelectItem value="2 weeks">2 Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onSave}>
              Save
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StepEditDialog;
