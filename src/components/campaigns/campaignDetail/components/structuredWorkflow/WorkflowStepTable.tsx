
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import StepIcon from './StepIcon';
import { MessageStep } from '../../hooks/useMessageSequence';

interface WorkflowStepTableProps {
  steps: MessageStep[];
  onEditStep: (step: MessageStep) => void;
  onDeleteStep: (id: number) => void;
  onMoveStep: (id: number, direction: 'up' | 'down') => void;
}

const WorkflowStepTable: React.FC<WorkflowStepTableProps> = ({
  steps,
  onEditStep,
  onDeleteStep,
  onMoveStep
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        {/* Table header */}
        <div className="grid grid-cols-6 gap-4 p-4 border-b text-sm font-medium text-muted-foreground">
          <div>Step</div>
          <div>Channel</div>
          <div className="col-span-2">Message / Delay</div>
          <div>Assigned To</div>
          <div>Actions</div>
        </div>
        
        {/* Table content */}
        <div className="divide-y">
          {steps.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No message steps added yet. Click "Add Step" to start building your workflow.
            </div>
          ) : (
            steps.map((step, index) => (
              <div key={step.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full border">
                    {step.type === 'delay' ? (
                      <Clock className="h-5 w-5 text-gray-500" />
                    ) : (
                      <StepIcon type={step.type} />
                    )}
                  </div>
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                
                <div className="capitalize">
                  {step.type === 'delay' ? 'Wait' : step.type}
                </div>
                
                <div className="col-span-2 truncate">
                  {step.type === 'delay' ? (
                    <span className="text-sm">{step.delay}</span>
                  ) : (
                    <span className="text-sm">{step.content}</span>
                  )}
                </div>
                
                <div>
                  {step.assignedTo ? (
                    <span className="text-sm">{step.assignedTo}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Not assigned</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onMoveStep(step.id, 'up')}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onMoveStep(step.id, 'down')}
                    disabled={index === steps.length - 1}
                  >
                    ↓
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEditStep(step)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDeleteStep(step.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowStepTable;
