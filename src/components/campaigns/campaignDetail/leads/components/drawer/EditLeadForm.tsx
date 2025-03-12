
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, X } from 'lucide-react';
import { Lead, Campaign } from '../../types';

interface EditLeadFormProps {
  editedLead: Lead;
  campaign: Campaign;
  onCancel: () => void;
  onSave: () => void;
  onInputChange: (field: keyof Lead, value: string) => void;
}

const EditLeadForm: React.FC<EditLeadFormProps> = ({
  editedLead,
  campaign,
  onCancel,
  onSave,
  onInputChange,
}) => {
  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            value={editedLead.name || ''} 
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="Lead name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input 
            id="company" 
            value={editedLead.company || ''} 
            onChange={(e) => onInputChange('company', e.target.value)}
            placeholder="Company name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            value={editedLead.email || ''} 
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="Email address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input 
            id="linkedin" 
            value={editedLead.linkedin || ''} 
            onChange={(e) => onInputChange('linkedin', e.target.value)}
            placeholder="LinkedIn profile"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentStage">Current Stage</Label>
          <Select 
            value={editedLead.currentStage || ''} 
            onValueChange={(value) => onInputChange('currentStage', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {campaign.stages?.map(stage => (
                <SelectItem key={stage.id} value={stage.name}>
                  {stage.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Select 
            value={editedLead.assignedTo || ''} 
            onValueChange={(value) => onInputChange('assignedTo', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select team member" />
            </SelectTrigger>
            <SelectContent>
              {campaign.teamMembers?.map(member => (
                <SelectItem key={member} value={member}>
                  {member}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes" 
            rows={4} 
            value={editedLead.notes || ''} 
            onChange={(e) => onInputChange('notes', e.target.value)}
            placeholder="Add notes about this lead"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex items-center"
        >
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <Button 
          onClick={onSave}
          className="flex items-center"
        >
          <Check className="h-4 w-4 mr-1" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditLeadForm;
