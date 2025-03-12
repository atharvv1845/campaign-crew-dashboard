
import React from 'react';
import DelayForm from './DelayForm';
import { MessageStep } from '../../hooks/sequenceTypes';
import { toast } from '@/hooks/use-toast';

interface DelayStepFormProps {
  data: MessageStep;
  onChange: (updatedData: MessageStep) => void;
}

const DelayStepForm: React.FC<DelayStepFormProps> = ({
  data,
  onChange
}) => {
  const handleDelayChange = (value: string) => {
    console.log("Updating delay value:", value);
    
    if (!value) {
      toast({
        title: "Warning",
        description: "Delay value is required",
        variant: "destructive"
      });
      return;
    }

    // Create a new object to ensure the change is detected
    const updatedData = {
      ...data,
      delay: value
    };
    
    console.log("Updating delay step with data:", updatedData);
    onChange(updatedData);
  };

  return (
    <DelayForm
      delay={data.delay || '1 day'}
      onDelayChange={handleDelayChange}
    />
  );
};

export default DelayStepForm;
