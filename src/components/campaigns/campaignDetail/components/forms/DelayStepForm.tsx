
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

    // Update the data with new delay value
    onChange({...data, delay: value});
  };

  return (
    <DelayForm
      delay={data.delay || '1 day'}
      onDelayChange={handleDelayChange}
    />
  );
};

export default DelayStepForm;
