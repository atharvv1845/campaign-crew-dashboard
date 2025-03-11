
import React from 'react';
import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

const WizardProgress: React.FC<WizardProgressProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    'Campaign Setup',
    'Lead Stages',
    'Team Assignment',
    'Message Sequence',
    'Review & Launch'
  ];

  return (
    <div className="px-6 pt-4">
      {/* Progress bar */}
      <div className="relative h-1 w-full bg-muted rounded-full overflow-hidden mb-4">
        <div 
          className="absolute h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center"
            style={{ width: `${100 / totalSteps}%` }}
          >
            <div 
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium mb-1 transition-colors",
                index + 1 < currentStep ? "bg-primary text-primary-foreground" : 
                index + 1 === currentStep ? "bg-primary/80 text-primary-foreground ring-2 ring-primary ring-offset-2" : 
                "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <span 
              className={cn(
                "text-xs text-center",
                index + 1 === currentStep ? "font-medium" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WizardProgress;
