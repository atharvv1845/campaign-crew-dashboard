
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Lead, Campaign } from './types';
import DetailsTab from './components/drawer/DetailsTab';
import InteractionsTab from './components/drawer/InteractionsTab';
import { Check, X } from 'lucide-react';

interface LeadDetailDrawerProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  campaign: Campaign;
  onUpdateLead?: (lead: Lead) => void;
}

const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  open,
  onClose,
  campaign,
  onUpdateLead
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState<Lead>(lead);

  const handleEdit = () => {
    setEditedLead(lead);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    if (onUpdateLead) {
      onUpdateLead(editedLead);
      toast({
        title: "Lead Updated",
        description: "Lead information has been updated successfully."
      });
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Lead, value: string) => {
    setEditedLead(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl">
            {isEditing ? 'Edit Lead' : lead.name}
          </SheetTitle>
          {!isEditing && (
            <div className="text-sm text-muted-foreground">
              {lead.company} • {lead.email}
            </div>
          )}
        </SheetHeader>

        {isEditing ? (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={editedLead.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  value={editedLead.company} 
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  value={editedLead.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input 
                  id="linkedin" 
                  value={editedLead.linkedin || ''} 
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentStage">Current Stage</Label>
                <Select 
                  value={editedLead.currentStage} 
                  onValueChange={(value) => handleInputChange('currentStage', value)}
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
                  value={editedLead.assignedTo} 
                  onValueChange={(value) => handleInputChange('assignedTo', value)}
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
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="flex items-center"
              >
                <Check className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="details" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <DetailsTab lead={lead} campaign={campaign} onEdit={handleEdit} />
            </TabsContent>
            
            <TabsContent value="interactions">
              <InteractionsTab lead={lead} />
            </TabsContent>
            
            <TabsContent value="history">
              <div className="text-center py-8 text-muted-foreground">
                Lead history details will be displayed here.
              </div>
            </TabsContent>
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default LeadDetailDrawer;
