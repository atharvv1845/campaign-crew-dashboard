
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Interaction, InteractionType } from '../../types/interactions';
import { getInteractionIcon } from '../../utils/interactionUtils';
import { Lead } from '../../types';
import { useInteractions } from '../../hooks/useInteractions';

interface InteractionsTabProps {
  lead: Lead;
  interactions?: Interaction[];
  onLogInteraction?: (type: InteractionType, description: string) => void;
}

const InteractionsTab: React.FC<InteractionsTabProps> = ({ 
  lead, 
  interactions: propInteractions, 
  onLogInteraction: propLogInteraction 
}) => {
  // Use the hook to get interactions data and functions if not provided as props
  const { interactions: hookInteractions, logInteraction: hookLogInteraction } = useInteractions(lead.id);
  
  const interactions = propInteractions || hookInteractions;
  const onLogInteraction = propLogInteraction || hookLogInteraction;
  
  const [showLogForm, setShowLogForm] = useState(false);
  const [interactionType, setInteractionType] = useState<InteractionType>(InteractionType.Call);
  const [description, setDescription] = useState('');

  const handleSubmitInteraction = () => {
    if (description.trim() && onLogInteraction) {
      onLogInteraction(interactionType, description);
      setDescription('');
      setShowLogForm(false);
    }
  };

  // Transform interaction data for display
  const transformedInteractions = interactions?.map(interaction => ({
    ...interaction,
    date: new Date(interaction.timestamp).toLocaleString(),
    description: interaction.content,
    user: interaction.user || 'You'
  }));

  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-between">
        <h3 className="text-base font-medium">Interaction History</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowLogForm(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Log Interaction
        </Button>
      </div>
      
      {showLogForm && (
        <div className="bg-muted/20 p-3 rounded-md space-y-3">
          <div className="flex gap-2">
            <select 
              className="text-sm p-2 bg-background border rounded-md flex-1"
              value={interactionType}
              onChange={(e) => setInteractionType(e.target.value as InteractionType)}
            >
              <option value={InteractionType.Call}>Call</option>
              <option value={InteractionType.Email}>Email</option>
              <option value={InteractionType.Meeting}>Meeting</option>
              <option value={InteractionType.Message}>Message</option>
            </select>
          </div>
          <textarea 
            className="w-full text-sm p-2 bg-background border rounded-md"
            placeholder="Describe the interaction..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowLogForm(false)}
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleSubmitInteraction}
            >
              Save
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {transformedInteractions && transformedInteractions.length > 0 ? (
          transformedInteractions.map(interaction => (
            <div key={interaction.id} className="flex items-start gap-3 p-3 bg-muted/10 rounded-md">
              <div className="mt-0.5">
                {getInteractionIcon(interaction.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    {String(interaction.type).charAt(0).toUpperCase() + String(interaction.type).slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">{interaction.date}</span>
                </div>
                <p className="text-sm">{interaction.description}</p>
                <div className="text-xs text-muted-foreground mt-1">by {interaction.user}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No interactions recorded yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionsTab;
