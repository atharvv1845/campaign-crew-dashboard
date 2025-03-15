
import { useState, useEffect } from 'react';
import { SavedFlow } from '@/pages/Messaging';

// Example mock data for saved flows
const mockFlows: SavedFlow[] = [
  {
    id: '1',
    name: 'Tech Startup 3-Step Outreach',
    description: 'Initial contact sequence for technology startups and SaaS companies',
    status: 'active',
    createdAt: '2023-06-15T12:00:00Z',
    updatedAt: '2023-09-22T14:30:00Z',
    flow: {
      nodes: [
        {
          id: '1',
          type: 'messageNode',
          position: { x: 100, y: 100 },
          data: { 
            label: 'Initial Email',
            message: 'Hi {{firstName}}, I noticed your work at {{company}} and wanted to reach out about our solution...',
            channel: 'email'
          }
        },
        {
          id: '2',
          type: 'delayNode',
          position: { x: 100, y: 200 },
          data: { label: 'Wait 3 Days', days: 3 }
        },
        {
          id: '3',
          type: 'messageNode',
          position: { x: 100, y: 300 },
          data: { 
            label: 'Follow-up Email',
            message: 'Hi {{firstName}}, I just wanted to follow up on my previous message...',
            channel: 'email'
          }
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' }
      ]
    }
  },
  {
    id: '2',
    name: 'Enterprise Decision Maker Sequence',
    description: 'Multi-channel approach for enterprise-level decision makers',
    status: 'draft',
    createdAt: '2023-07-10T09:15:00Z',
    updatedAt: '2023-08-05T16:45:00Z',
    flow: {
      nodes: [
        {
          id: '1',
          type: 'messageNode',
          position: { x: 250, y: 100 },
          data: {
            label: 'LinkedIn Connection',
            message: 'Hi {{firstName}}, I came across your profile and would like to connect...',
            channel: 'linkedin'
          }
        },
        {
          id: '2',
          type: 'delayNode',
          position: { x: 250, y: 200 },
          data: { label: 'Wait 2 Days', days: 2 }
        },
        {
          id: '3',
          type: 'messageNode',
          position: { x: 250, y: 300 },
          data: {
            label: 'Email Introduction',
            message: 'Hi {{firstName}}, Thanks for connecting on LinkedIn...',
            channel: 'email'
          }
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' }
      ]
    }
  },
  {
    id: '3',
    name: 'Conference Follow-up Sequence',
    description: 'For leads collected at industry conferences and events',
    status: 'archived',
    createdAt: '2023-03-20T15:30:00Z',
    updatedAt: '2023-04-10T11:20:00Z',
    flow: {
      nodes: [
        {
          id: '1',
          type: 'messageNode',
          position: { x: 300, y: 100 },
          data: {
            label: 'Post-Conference Email',
            message: 'Hi {{firstName}}, It was great meeting you at {{event}}...',
            channel: 'email'
          }
        },
        {
          id: '2',
          type: 'delayNode',
          position: { x: 300, y: 200 },
          data: { label: 'Wait 1 Week', days: 7 }
        },
        {
          id: '3',
          type: 'messageNode',
          position: { x: 300, y: 300 },
          data: {
            label: 'Follow-up Call',
            message: 'Check-in call to discuss our conversation at the conference',
            channel: 'phone'
          }
        }
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' }
      ]
    }
  }
];

// Create the hook for managing saved flows
const useSavedFlows = () => {
  const [savedFlows, setSavedFlows] = useState<SavedFlow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load flows on component mount
  useEffect(() => {
    const loadFlows = async () => {
      try {
        // In a real application, this would fetch from an API
        // Simulating API call with a timeout
        setTimeout(() => {
          setSavedFlows(mockFlows);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error loading saved flows:", error);
        setIsLoading(false);
      }
    };

    loadFlows();
  }, []);

  // Add a new flow
  const addFlow = (flow: SavedFlow) => {
    setSavedFlows(prev => [...prev, flow]);
    return flow;
  };

  // Update an existing flow
  const updateFlow = (updatedFlow: Partial<SavedFlow> & { id: string }) => {
    setSavedFlows(prev => 
      prev.map(flow => 
        flow.id === updatedFlow.id 
          ? { ...flow, ...updatedFlow, updatedAt: new Date().toISOString() } 
          : flow
      )
    );
  };

  // Delete a flow
  const deleteFlow = (flowId: string) => {
    setSavedFlows(prev => prev.filter(flow => flow.id !== flowId));
  };

  // Duplicate a flow
  const duplicateFlow = (flow: SavedFlow) => {
    const newId = Date.now().toString();
    const duplicatedFlow = {
      ...flow,
      id: newId,
      name: `${flow.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft' as const,
      flow: {
        nodes: flow.flow.nodes.map(node => ({...node})),
        edges: flow.flow.edges.map(edge => ({...edge}))
      }
    };
    
    setSavedFlows(prev => [...prev, duplicatedFlow]);
    return duplicatedFlow;
  };

  return {
    savedFlows,
    isLoading,
    addFlow,
    updateFlow,
    deleteFlow,
    duplicateFlow
  };
};

export default useSavedFlows;
