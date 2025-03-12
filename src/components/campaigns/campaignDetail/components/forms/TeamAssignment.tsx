
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamMember {
  value: string;
  label: string;
}

interface TeamAssignmentProps {
  value: string;
  onChange: (value: string) => void;
  options: TeamMember[];
}

const TeamAssignment: React.FC<TeamAssignmentProps> = ({
  value,
  onChange,
  options
}) => {
  return (
    <div className="space-y-2">
      <Label>Assigned To</Label>
      <Select 
        value={value || ''}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select team member" />
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

export default TeamAssignment;
