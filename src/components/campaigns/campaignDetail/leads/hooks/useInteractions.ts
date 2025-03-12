
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Interaction } from '../types/interactions';

export const useInteractions = () => {
  const { toast } = useToast();
  
  // Mock interaction history initial state
  const [interactions, setInteractions] = useState<Interaction[]>([
    {
      id: 1,
      type: 'email',
      date: '2023-10-15',
      description: 'Sent initial outreach email',
      user: 'John Smith',
    },
    {
      id: 2,
      type: 'call',
      date: '2023-10-18',
      description: 'Had an introductory call about our product',
      user: 'Sarah Lee',
    },
  ]);
  
  // Function to log a new interaction
  const logInteraction = (type: 'email' | 'call' | 'meeting' | 'message', description: string) => {
    const newInteraction: Interaction = {
      id: interactions.length + 1,
      type,
      date: new Date().toISOString().split('T')[0],
      description,
      user: 'Current User', // In a real app, this would be the current user
    };
    
    setInteractions([...interactions, newInteraction]);
    
    toast({
      title: "Interaction logged",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been recorded.`,
    });
  };

  return {
    interactions,
    logInteraction
  };
};
