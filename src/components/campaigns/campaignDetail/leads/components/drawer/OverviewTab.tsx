
import React from 'react';
import { User, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone } from 'lucide-react';
import StageBadge from '../../../badges/StageBadge';
import { Lead } from '../../types';
import { Interaction } from '../../types/interactions';
import { getInteractionIcon } from '../../utils/interactionUtils';

interface OverviewTabProps {
  lead: Lead;
  interactions: Interaction[];
  onViewAllInteractions: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  lead, 
  interactions,
  onViewAllInteractions 
}) => {
  const { toast } = useToast();

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{lead.assignedTo}</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Last Contacted</h3>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{lead.lastContact || lead.lastContacted || 'Not contacted'}</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Follow-up Date</h3>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{lead.nextFollowUpDate || lead.followUpDate || 'Not set'}</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Current Stage</h3>
          <StageBadge stage={lead.currentStage} />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
        <div className="p-3 bg-muted/20 rounded-md text-sm">
          {lead.notes || 'No notes available.'}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Recent Interactions</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary"
            onClick={onViewAllInteractions}
          >
            View All
          </Button>
        </div>
        <div className="space-y-2">
          {interactions.slice(-2).map(interaction => (
            <div key={interaction.id} className="flex items-start gap-3 p-2 bg-muted/10 rounded-md">
              <div className="mt-0.5">
                {getInteractionIcon(interaction.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">{interaction.date}</span>
                </div>
                <p className="text-sm">{interaction.description}</p>
                <div className="text-xs text-muted-foreground mt-1">by {interaction.user}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="default" 
          className="flex-1"
          onClick={() => {
            toast({
              title: "Email drafted",
              description: "Redirecting to email composer.",
            });
          }}
        >
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => {
            toast({
              title: "Call initiated",
              description: "Opening call dialog.",
            });
          }}
        >
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
      </div>
    </div>
  );
};

export default OverviewTab;
