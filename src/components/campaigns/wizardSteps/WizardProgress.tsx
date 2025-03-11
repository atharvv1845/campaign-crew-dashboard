
import React from 'react';
import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

const WizardProgress: React.FC<WizardProgressProps> = ({ currentStep, totalSteps }) => {
  // Create a steps array for rendering
  const steps = Array.from({ length: totalSteps }, (_, i) => ({
    number: i + 1,
    active: i + 1 <= currentStep
  }));

  // Get step name based on step number
  const getStepName = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return 'Campaign Setup';
      case 2: return 'Import Leads';
      case 3: return 'Message Flow';
      case 4: return 'Lead Stages';
      case 5: return 'Team Assignment';
      case 6: return 'Review & Launch';
      default: return `Step ${stepNumber}`;
    }
  };

  return (
    <div className="border-b border-border">
      <div className="px-6 py-3 overflow-x-auto">
        <div className="flex items-center min-w-max">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              {/* Step circle */}
              <div
                className={cn(
                  "flex flex-col items-center justify-center",
                  index > 0 ? "ml-2" : ""
                )}
              >
                <div 
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step.active ? "bg-primary text-primary-foreground" : "bg-muted/40 text-muted-foreground"
                  )}
                >
                  {step.number}
                </div>
                <span className="text-xs mt-1 text-muted-foreground whitespace-nowrap">
                  {getStepName(step.number)}
                </span>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "h-[2px] transition-colors flex-grow mx-1 mt-[-14px]",
                    steps[index + 1].active ? "bg-primary" : "bg-muted/40"
                  )}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WizardProgress;
