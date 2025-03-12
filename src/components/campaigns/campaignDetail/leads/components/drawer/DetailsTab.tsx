
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SheetClose } from "@/components/ui/sheet";
import { useToast } from '@/hooks/use-toast';
import { Lead, Campaign } from '../../types';

interface DetailsTabProps {
  lead: Lead;
  campaign: Campaign;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ lead, campaign }) => {
  const { toast } = useToast();

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-muted-foreground">Name</h3>
          <div className="text-sm">{lead.name}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-muted-foreground">Company</h3>
          <div className="text-sm">{lead.company}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-muted-foreground">Email</h3>
          <div className="text-sm">{lead.email}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-muted-foreground">LinkedIn</h3>
          <div className="text-sm">{lead.linkedin || 'Not available'}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-muted-foreground">WhatsApp</h3>
          <div className="text-sm">{lead.whatsapp || 'Not available'}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-muted-foreground">Twitter</h3>
          <div className="text-sm">{lead.twitter || 'Not available'}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-muted-foreground">Instagram</h3>
          <div className="text-sm">{lead.instagram || 'Not available'}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-medium text-muted-foreground">Facebook</h3>
          <div className="text-sm">{lead.facebook || 'Not available'}</div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Campaign Information</h3>
        <div className="bg-muted/10 p-3 rounded-md">
          <p className="text-sm mb-1">
            <span className="font-medium">Current Stage:</span> {lead.currentStage}
          </p>
          <p className="text-sm mb-1">
            <span className="font-medium">Assigned To:</span> {lead.assignedTo}
          </p>
          <p className="text-sm">
            <span className="font-medium">Last Contacted:</span> {lead.lastContacted}
          </p>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button 
          variant="outline" 
          onClick={() => {
            toast({
              title: "Lead updated",
              description: "Lead information has been updated.",
            });
          }}
        >
          Update Details
        </Button>
        <SheetClose asChild>
          <Button variant="ghost">Close</Button>
        </SheetClose>
      </div>
    </div>
  );
};

export default DetailsTab;
