
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DelayFormProps {
  delay: string;
  onDelayChange: (value: string) => void;
}

const DelayForm: React.FC<DelayFormProps> = ({
  delay,
  onDelayChange
}) => {
  const days = delay?.split(' ')[0] || '1';
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Days</Label>
        <Select 
          value={days}
          onValueChange={(value) => onDelayChange(
            `${value} ${value === '1' ? 'day' : 'days'}`
          )}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 7, 10, 14].map(d => (
              <SelectItem key={d} value={String(d)}>
                {d} {d === 1 ? 'day' : 'days'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DelayForm;
