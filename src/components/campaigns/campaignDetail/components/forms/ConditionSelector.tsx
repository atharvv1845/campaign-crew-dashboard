
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConditionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ConditionSelector: React.FC<ConditionSelectorProps> = ({
  value,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label>Condition (Optional)</Label>
      <Select 
        value={value || ''}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Add a condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">No condition</SelectItem>
          <SelectItem value="noreply">If no reply in 3 days</SelectItem>
          <SelectItem value="opened">If email opened</SelectItem>
          <SelectItem value="clicked">If link clicked</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ConditionSelector;
