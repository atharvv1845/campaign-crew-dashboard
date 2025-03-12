
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChannelOption {
  value: string;
  label: string;
}

interface ChannelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: ChannelOption[];
}

const ChannelSelector: React.FC<ChannelSelectorProps> = ({
  value,
  onChange,
  options
}) => {
  return (
    <div className="space-y-2">
      <Label>Channel</Label>
      <Select 
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select channel" />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChannelSelector;
