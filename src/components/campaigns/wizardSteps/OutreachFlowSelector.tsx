
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, ArrowRight, MessageSquare, Clock, ArrowRightFromLine, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import StepIcon from '@/components/messaging/outreachFlow/StepIcon';
import { Input } from '@/components/ui/input';

interface OutreachFlow {
  id: number;
  name: string;
  steps: any[];
}

interface OutreachFlowSelectorProps {
  selectedFlowId: number | null;
  onSelectFlow: (flowId: number | null) => void;
  onEditFlow: (flowId: number) => void;
}

const OUTREACH_FLOWS_STORAGE_KEY = 'outreachFlows';

const OutreachFlowSelector: React.FC<OutreachFlowSelectorProps> = ({
  selectedFlowId,
  onSelectFlow,
  onEditFlow
}) => {
  const [flows, setFlows] = useState<OutreachFlow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewFlowInput, setShowNewFlowInput] = useState(false);
  const [newFlowName, setNewFlowName] = useState('');
  const { toast } = useToast();

  // Load flows from localStorage
  useEffect(() => {
    const loadFlows = () => {
      setLoading(true);
      try {
        const savedFlows = localStorage.getItem(OUTREACH_FLOWS_STORAGE_KEY);
        const parsedFlows = savedFlows ? JSON.parse(savedFlows) : [];
        setFlows(parsedFlows);
      } catch (error) {
        console.error("Error loading outreach flows:", error);
        toast({
          title: "Error loading flows",
          description: "Could not load outreach flows. Please try refreshing.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadFlows();
  }, [toast]);

  const selectedFlow = flows.find(flow => flow.id === selectedFlowId);

  const handleCreateFlow = () => {
    if (!newFlowName.trim()) {
      toast({
        title: "Flow name required",
        description: "Please enter a name for the new flow",
        variant: "destructive"
      });
      return;
    }

    // Create a new flow
    const newFlow = {
      id: Date.now(),
      name: newFlowName,
      steps: []
    };

    // Add to local storage
    const updatedFlows = [...flows, newFlow];
    localStorage.setItem(OUTREACH_FLOWS_STORAGE_KEY, JSON.stringify(updatedFlows));
    
    // Update state
    setFlows(updatedFlows);
    onSelectFlow(newFlow.id);
    
    // Reset input
    setNewFlowName('');
    setShowNewFlowInput(false);
    
    toast({
      title: "Flow created",
      description: `"${newFlowName}" has been created successfully.`
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select Outreach Flow</Label>
        <Select 
          value={selectedFlowId?.toString() || ''} 
          onValueChange={(value) => onSelectFlow(value ? Number(value) : null)}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose an outreach flow" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No outreach flow</SelectItem>
            {flows.length === 0 ? (
              <SelectItem value="" disabled>
                No flows available. Create one in Messaging section
              </SelectItem>
            ) : (
              flows.map(flow => (
                <SelectItem key={flow.id} value={flow.id.toString()}>
                  {flow.name} ({flow.steps.length} steps)
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        {loading && <p className="text-xs text-muted-foreground">Loading outreach flows...</p>}
      </div>

      {selectedFlow ? (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">{selectedFlow.name}</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEditFlow(selectedFlow.id)}
            >
              <Edit className="h-3.5 w-3.5 mr-1" />
              Edit Flow
            </Button>
          </div>
          
          <div className="space-y-3">
            {selectedFlow.steps.length === 0 ? (
              <p className="text-sm text-muted-foreground">This flow doesn't have any steps yet.</p>
            ) : (
              selectedFlow.steps.map((step, index) => (
                <div key={step.id} className="flex items-start">
                  <div className="flex items-center mr-3">
                    {index > 0 && (
                      <div className="h-full w-px bg-border mx-auto absolute -mt-4 ml-3 h-4"></div>
                    )}
                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center z-10">
                      {step.type === "message" ? (
                        <StepIcon type="message" platform={step.platform} />
                      ) : step.type === "delay" ? (
                        <Clock className="h-3.5 w-3.5 text-amber-600" />
                      ) : (
                        <ArrowRightFromLine className="h-3.5 w-3.5 text-slate-600" />
                      )}
                    </div>
                    {index < selectedFlow.steps.length - 1 && (
                      <div className="h-full w-px bg-border mx-auto absolute mt-6 ml-3 h-10"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 border rounded-md p-2 ml-2">
                    <div className="flex items-center text-sm font-medium mb-1">
                      {step.type === "message" ? (
                        <>
                          <span className="capitalize">{step.platform}</span>
                          <span> Message</span>
                        </>
                      ) : step.type === "delay" ? (
                        <>Wait {step.delay}</>
                      ) : (
                        <>Condition: {step.condition}</>
                      )}
                    </div>
                    
                    {step.type === "message" && (
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {step.subject && <span className="font-medium">Subject: </span>}
                        {step.subject || step.content}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      ) : (
        <div className="text-center py-6 border border-dashed rounded-md">
          <p className="text-muted-foreground text-sm">
            No outreach flow selected. Select an existing flow or create a new one.
          </p>
        </div>
      )}

      <div className="mt-4 flex justify-end gap-2">
        {showNewFlowInput ? (
          <div className="flex-1 flex gap-2">
            <Input
              value={newFlowName}
              onChange={(e) => setNewFlowName(e.target.value)}
              placeholder="Enter flow name"
              className="flex-1"
              autoFocus
            />
            <Button
              onClick={handleCreateFlow}
              disabled={!newFlowName.trim()}
            >
              Create
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowNewFlowInput(false);
                setNewFlowName('');
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.open('/messaging?tab=flow', '_blank');
              }}
            >
              Open Flows Page
            </Button>
            <Button
              size="sm"
              onClick={() => setShowNewFlowInput(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              New Flow
            </Button>
          </>
        )}
        {selectedFlow && (
          <Button
            size="sm"
            onClick={() => onEditFlow(selectedFlow.id)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit Selected Flow
          </Button>
        )}
      </div>
    </div>
  );
};

export default OutreachFlowSelector;
