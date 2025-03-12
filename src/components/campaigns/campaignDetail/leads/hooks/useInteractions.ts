
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Interaction } from '../types/interactions';

export const useInteractions = (leadId: number) => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  // In a real app, this would fetch interactions from an API
  useEffect(() => {
    // This is just mock data - in a real app, we'd fetch from an API
    const mockInteractions: Interaction[] = [
      {
        id: '1',
        type: 'email',
        date: '2023-10-05',
        description: 'Sent initial outreach email about our new product.',
        user: 'Sarah Lee',
        leadId: 1
      },
      {
        id: '2',
        type: 'call',
        date: '2023-10-07',
        description: 'Follow-up call discussing pricing options.',
        user: 'John Smith',
        leadId: 1
      },
      {
        id: '3',
        type: 'meeting',
        date: '2023-10-12',
        description: 'Demo meeting with team members.',
        user: 'Sarah Lee',
        leadId: 2
      }
    ];

    // Filter interactions for this specific lead
    const leadInteractions = mockInteractions.filter(interaction => interaction.leadId === leadId);
    setInteractions(leadInteractions);
  }, [leadId]);

  const logInteraction = (type: 'email' | 'call' | 'meeting' | 'message', description: string) => {
    const newInteraction: Interaction = {
      id: uuidv4(),
      type,
      date: new Date().toISOString().split('T')[0],
      description,
      user: 'Current User', // In a real app, this would be the current user
      leadId
    };

    setInteractions(prev => [newInteraction, ...prev]);

    // In a real app, this would make an API call to save the interaction
    console.log('Logged new interaction:', newInteraction);
    
    return newInteraction;
  };

  return { interactions, logInteraction };
};
