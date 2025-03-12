
import React from 'react';
import DelayForm from './DelayForm';
import { MessageStep } from '../../hooks/useMessageSequence';

interface DelayStepFormProps {
  data: MessageStep;
  onChange: (updatedData: MessageStep) => void;
}

const DelayStepForm: React.FC<DelayStepFormProps> = ({
  data,
  onChange
}) => {
  return (
    <DelayForm
      delay={data.delay || '1 day'}
      onDelayChange={(value) => onChange({...data, delay: value})}
    />
  );
};

export default DelayStepForm;
