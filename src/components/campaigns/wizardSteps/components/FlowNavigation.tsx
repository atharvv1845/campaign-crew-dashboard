
import React from 'react';
import { Button } from '@/components/ui/button';

interface FlowNavigationProps {
  onNext: () => void;
  onBack: () => void;
}

const FlowNavigation: React.FC<FlowNavigationProps> = ({ onNext, onBack }) => {
  return (
    <div className="flex justify-between mt-6">
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
      <Button onClick={onNext}>
        Next
      </Button>
    </div>
  );
};

export default FlowNavigation;
