
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTeamStore } from '@/hooks/useTeamStore';

interface TeamMember {
  value: string;
  label: string;
}

interface TeamAssignmentProps {
  value: string;
  onChange: (value: string) => void;
  options?: TeamMember[];
}

const TeamAssignment: React.FC<TeamAssignmentProps> = ({
  value,
  onChange,
  options: providedOptions
}) => {
  // Get team members from store if options aren't provided
  const storeTeamMembers = useTeamStore(state => state.teamMembers);
  
  // If options are explicitly provided, use those; otherwise, use team members from store
  const options = providedOptions || storeTeamMembers
    .filter(member => member.status === 'Active') // Only show active members
    .map(member => ({
      value: member.id,
      label: member.name
    }));

  return (
    <div className="space-y-2">
      <Label>Assigned To (Optional)</Label>
      <Select 
        value={value || ''}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select team member (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Unassigned</SelectItem>
          {options.length > 0 ? (
            options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="py-2 px-2 text-sm text-muted-foreground">
              No team members available
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TeamAssignment;
