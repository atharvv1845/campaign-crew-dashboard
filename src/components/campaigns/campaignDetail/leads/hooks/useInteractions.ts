
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Interaction, InteractionType } from '../types/interactions';

export const useInteractions = (leadId: number) => {
  const { toast } = useToast();
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  const addInteraction = (type: InteractionType, content: string) => {
    const newInteraction: Interaction = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date().toISOString(),
      leadId
    };
    setInteractions(prev => [newInteraction, ...prev]);
    return newInteraction;
  };

  const logInteraction = (type: InteractionType, content: string) => {
    const interaction = addInteraction(type, content);

    if (interaction) {
      toast({
        title: "Interaction Logged",
        description: `${type} interaction has been recorded.`
      });
    }

    return interaction;
  };

  return {
    interactions,
    logInteraction
  };
};

export default useInteractions;
