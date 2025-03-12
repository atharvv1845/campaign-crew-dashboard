
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Interaction, InteractionType } from '../types/interactions';

export const useInteractions = (leadId: number) => {
  const { toast } = useToast();
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  const addEmailInteraction = (content: string) => {
    const newInteraction: Interaction = {
      id: Date.now(), // Generate a unique ID
      type: InteractionType.Email,
      content,
      timestamp: new Date().toISOString(),
      leadId: leadId
    };
    setInteractions(prev => [newInteraction, ...prev]);
    return newInteraction;
  };

  const addCallInteraction = (content: string) => {
    const newInteraction: Interaction = {
      id: Date.now(),
      type: InteractionType.Call,
      content,
      timestamp: new Date().toISOString(),
      leadId: leadId
    };
    setInteractions(prev => [newInteraction, ...prev]);
    return newInteraction;
  };

  const addMessageInteraction = (content: string) => {
    const newInteraction: Interaction = {
      id: Date.now(),
      type: InteractionType.Message,
      content,
      timestamp: new Date().toISOString(),
      leadId: leadId
    };
    setInteractions(prev => [newInteraction, ...prev]);
    return newInteraction;
  };

  const logInteraction = (type: InteractionType, content: string) => {
    let interaction;
    switch (type) {
      case InteractionType.Email:
        interaction = addEmailInteraction(content);
        break;
      case InteractionType.Call:
        interaction = addCallInteraction(content);
        break;
      case InteractionType.Message:
        interaction = addMessageInteraction(content);
        break;
    }

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
