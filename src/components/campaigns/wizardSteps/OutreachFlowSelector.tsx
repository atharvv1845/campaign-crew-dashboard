
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, ArrowRight, MessageSquare, Clock, ArrowRightFromLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import StepIcon from '@/components/messaging/outreachFlow/StepIcon';

// Sample outreach flow data (in a real app, this would come from an API)
const mockOutreachFlows = [
  {
    id: 1,
    name: "LinkedIn + Email Follow-up",
    steps: [
      { id: 1, type: "message", platform: "linkedin", content: "Hi {firstName}, I noticed your work at {company}..." },
      { id: 2, type: "delay", delay: "3 days" },
      { id: 3, type: "message", platform: "email", subject: "Following up on LinkedIn", content: "Hello {firstName}, I recently reached out on LinkedIn..." }
    ]
  },
  {
    id: 2,
    name: "Multi-channel Outreach",
    steps: [
      { id: 1, type: "message", platform: "email", subject: "Introduction", content: "Hi {firstName}, I wanted to introduce myself..." },
      { id: 2, type: "delay", delay: "2 days" },
      { id: 3, type: "message", platform: "linkedin", content: "Hi {firstName}, I sent you an email recently..." },
      { id: 4, type: "delay", delay: "3 days" },
      { id: 5, type: "message", platform: "whatsapp", content: "Hello {firstName}, following up on my previous messages..." }
    ]
  }
];

interface OutreachFlowSelectorProps {
  selectedFlowId: number | null;
  onSelectFlow: (flowId: number | null) => void;
  onEditFlow: (flowId: number) => void;
}

const OutreachFlowSelector: React.FC<OutreachFlowSelectorProps> = ({
  selectedFlowId,
  onSelectFlow,
  onEditFlow
}) => {
  const [flows, setFlows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // In a real app, fetch flows from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFlows(mockOutreachFlows);
      setLoading(false);
    }, 500);
  }, []);

  const selectedFlow = flows.find(flow => flow.id === selectedFlowId);

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
            {flows.map(flow => (
              <SelectItem key={flow.id} value={flow.id.toString()}>
                {flow.name} ({flow.steps.length} steps)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {loading && <p className="text-xs text-muted-foreground">Loading outreach flows...</p>}
      </div>

      {selectedFlow && (
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
            {selectedFlow.steps.map((step: any, index: number) => (
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
            ))}
          </div>
        </Card>
      )}

      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // In a real app, navigate to messaging section
            toast({
              title: "Create New Flow",
              description: "Redirecting to the outreach flow builder...",
            });
            window.location.href = '/messaging?tab=flow';
          }}
        >
          Create New Flow
        </Button>
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
