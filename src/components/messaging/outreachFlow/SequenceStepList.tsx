
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FlowStep } from '../OutreachFlow';
import StepIcon from './StepIcon';

interface SequenceStepListProps {
  steps: FlowStep[];
  onEditStep: (step: FlowStep) => void;
  onDeleteStep: (id: number) => void;
  onReorderStep: (id: number, direction: 'up' | 'down') => void;
}

const SequenceStepList: React.FC<SequenceStepListProps> = ({
  steps,
  onEditStep,
  onDeleteStep,
  onReorderStep
}) => {
  const getStepContent = (step: FlowStep) => {
    if (step.type === 'message') {
      return (
        <div>
          {step.platform === 'email' && step.subject && (
            <p className="text-sm font-medium mb-1">Subject: {step.subject}</p>
          )}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {step.content}
          </p>
        </div>
      );
    } else if (step.type === 'delay') {
      return (
        <p className="text-sm font-medium">Wait for {step.delay}</p>
      );
    } else if (step.type === 'condition') {
      let conditionText = '';
      switch(step.condition) {
        case 'noreply':
          conditionText = 'If no reply is received';
          break;
        case 'opened':
          conditionText = 'If message is opened';
          break;
        case 'clicked':
          conditionText = 'If link is clicked';
          break;
        case 'replied':
          conditionText = 'If recipient replied';
          break;
        default:
          conditionText = 'Custom condition';
      }
      return (
        <p className="text-sm font-medium">{conditionText}</p>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3 mt-4">
      {steps.map((step, index) => (
        <Card key={step.id} className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary opacity-20"></div>
          <CardContent className="p-4">
            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-1 flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                <StepIcon type={step.type} platform={step.platform} />
              </div>

              <div className="col-span-8">
                <div className="mb-1 flex items-center">
                  <span className="text-sm font-medium mr-2">
                    Step {index + 1}:
                  </span>
                  <span className="text-sm capitalize">
                    {step.type === 'message' 
                      ? `${step.platform} message` 
                      : step.type}
                  </span>
                </div>
                {getStepContent(step)}
              </div>

              <div className="col-span-3 flex items-start justify-end space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onReorderStep(step.id, 'up')}
                  disabled={index === 0}
                  className="h-8 w-8 p-0"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onReorderStep(step.id, 'down')}
                  disabled={index === steps.length - 1}
                  className="h-8 w-8 p-0"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEditStep(step)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDeleteStep(step.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SequenceStepList;
