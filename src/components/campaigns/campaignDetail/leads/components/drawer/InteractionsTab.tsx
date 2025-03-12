
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Interaction } from '../../types/interactions';
import { getInteractionIcon } from '../../utils/interactionUtils';

interface InteractionsTabProps {
  interactions: Interaction[];
  onLogInteraction: (type: 'email' | 'call' | 'meeting' | 'message', description: string) => void;
}

const InteractionsTab: React.FC<InteractionsTabProps> = ({ interactions, onLogInteraction }) => {
  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-between">
        <h3 className="text-base font-medium">Interaction History</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            // In a real app, this would open a dialog to log a new interaction
            const type = 'call';
            const description = 'Had a follow-up call about pricing options';
            onLogInteraction(type, description);
          }}
        >
          <Plus className="h-4 w-4 mr-1" />
          Log Interaction
        </Button>
      </div>
      
      <div className="space-y-3">
        {interactions.map(interaction => (
          <div key={interaction.id} className="flex items-start gap-3 p-3 bg-muted/10 rounded-md">
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
        
        {interactions.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No interactions recorded yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionsTab;
