
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { Lead, Campaign } from './types';
import DetailsTab from './components/drawer/DetailsTab';
import InteractionsTab from './components/drawer/InteractionsTab';
import { useInteractions } from './hooks/useInteractions';
import { useToastNotifications } from './hooks/useToastNotifications';
import { InteractionType } from './types/interactions';
import DrawerHeader from './components/drawer/DrawerHeader';
import EditLeadForm from './components/drawer/EditLeadForm';

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
  // Fix the interactions hook to accept both string and number for ID
  const { interactions, logInteraction } = useInteractions(lead.id);
  const { notifyContactLogged } = useToastNotifications();

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

  const handleLogInteraction = (type: 'email' | 'call' | 'meeting' | 'message', description: string) => {
    logInteraction(type as InteractionType, description);
    notifyContactLogged();
    
    if (onUpdateLead) {
      const today = new Date().toISOString().split('T')[0];
      // Use both properties for maximum compatibility
      onUpdateLead({
        ...lead,
        lastContact: today,
        lastContacted: today
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <DrawerHeader lead={lead} isEditing={isEditing} />

        {isEditing ? (
          <EditLeadForm
            editedLead={editedLead}
            campaign={campaign}
            onCancel={handleCancel}
            onSave={handleSave}
            onInputChange={handleInputChange}
          />
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
              <InteractionsTab 
                lead={lead}
                interactions={interactions}
                onLogInteraction={handleLogInteraction}
              />
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
