
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DelayStepData } from '../../types/campaignTypes';

interface DelayFormProps {
  data: DelayStepData;
  onChange: (data: DelayStepData) => void;
}

const DelayForm: React.FC<DelayFormProps> = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Days</Label>
        <Input
          type="number"
          min="0"
          value={data.days}
          onChange={(e) => onChange({ ...data, days: parseInt(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label>Hours</Label>
        <Input
          type="number"
          min="0"
          max="23"
          value={data.hours || 0}
          onChange={(e) => onChange({ ...data, hours: parseInt(e.target.value) })}
        />
      </div>
    </div>
  );
};

export default DelayForm;
