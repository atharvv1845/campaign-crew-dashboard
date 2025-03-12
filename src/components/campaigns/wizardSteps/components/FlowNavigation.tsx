
import React from 'react';
import { Button } from '@/components/ui/button';

interface FlowNavigationProps {
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;  // Added nextLabel as an optional prop
}

const FlowNavigation: React.FC<FlowNavigationProps> = ({ 
  onNext, 
  onBack, 
  nextLabel = "Next"  // Providing a default value
}) => {
  return (
    <div className="flex justify-between mt-6">
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
      <Button onClick={onNext}>
        {nextLabel}
      </Button>
    </div>
  );
};

export default FlowNavigation;
