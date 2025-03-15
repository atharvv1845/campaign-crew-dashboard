
import React from 'react';
import { format } from 'date-fns';
import { Lead } from '../../types';
import LeadStageSelector from './LeadStageSelector';
import LeadActions from './LeadActions';
import LeadDatePicker from './LeadDatePicker';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTeamStore } from '@/hooks/useTeamStore';

interface LeadTableRowProps {
  lead: Lead;
  campaign: any;
  onLeadClick: (lead: Lead) => void;
  onStatusChange: (leadId: string | number, status: string) => void;
  onUpdateLead: (lead: Lead) => void;
  onSelectLead?: (id: string | number, selected: boolean) => void;
  isSelected?: boolean;
}

const LeadTableRow: React.FC<LeadTableRowProps> = ({ 
  lead, 
  campaign,
  onLeadClick, 
  onStatusChange,
  onUpdateLead,
  onSelectLead,
  isSelected = false
}) => {
  const { teamMembers } = useTeamStore();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  // Handle first contact date change
  const handleFirstContactChange = (date?: Date) => {
    onUpdateLead({
      ...lead,
      firstContactDate: date ? date.toISOString() : null
    });
  };
  
  // Handle last contact date change
  const handleLastContactChange = (date?: Date) => {
    onUpdateLead({
      ...lead,
      lastContact: date ? date.toISOString() : null
    });
  };
  
  // Handle follow-up date change
  const handleFollowUpChange = (date?: Date) => {
    onUpdateLead({
      ...lead,
      nextFollowUpDate: date ? date.toISOString() : null
    });
  };
  
  // Handle assigned team member change
  const handleAssignedToChange = (memberId: string) => {
    onUpdateLead({
      ...lead,
      assignedTo: memberId
    });
  };
  
  // Parse dates from ISO strings to Date objects if they exist
  const firstContactDate = lead.firstContactDate ? new Date(lead.firstContactDate) : undefined;
  const lastContactDate = lead.lastContact ? new Date(lead.lastContact) : undefined;
  const followUpDate = lead.nextFollowUpDate ? new Date(lead.nextFollowUpDate) : undefined;

  return (
    <tr className="hover:bg-muted/10">
      {onSelectLead && (
        <td className="py-3 px-2 text-center">
          <Checkbox 
            checked={isSelected}
            onCheckedChange={(checked) => onSelectLead(lead.id, !!checked)}
          />
        </td>
      )}
      <td className="py-3 px-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onLeadClick(lead)}>
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(lead.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{lead.name}</div>
            <div className="text-xs text-muted-foreground">{lead.email}</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="font-medium">{lead.company}</div>
        <div className="text-xs text-muted-foreground">{lead.title}</div>
      </td>
      <td className="py-3 px-4">
        <LeadStageSelector 
          currentStage={lead.currentStage} 
          onStageChange={(stage) => onStatusChange(lead.id, stage)} 
          campaign={campaign}
        />
      </td>
      <td className="py-3 px-4">
        <Select 
          value={lead.assignedTo || ''}
          onValueChange={handleAssignedToChange}
        >
          <SelectTrigger className="w-[160px] h-8 border-none bg-transparent p-0">
            <SelectValue placeholder="Assign team member">
              {lead.assignedTo ? (
                <div className="flex items-center gap-2">
                  {teamMembers.find(m => m.id === lead.assignedTo) ? (
                    <>
                      <Avatar className="h-6 w-6">
                        <AvatarImage 
                          src={teamMembers.find(m => m.id === lead.assignedTo)?.avatar} 
                        />
                        <AvatarFallback>
                          {getInitials(teamMembers.find(m => m.id === lead.assignedTo)?.name || '')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{teamMembers.find(m => m.id === lead.assignedTo)?.name}</span>
                    </>
                  ) : (
                    <span>Unassigned</span>
                  )}
                </div>
              ) : (
                <div className="text-muted-foreground">Unassigned</div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">
              <span className="text-muted-foreground">Unassigned</span>
            </SelectItem>
            {teamMembers.length > 0 ? (
              teamMembers.filter(m => m.status === 'Active').map(member => (
                <SelectItem key={member.id} value={member.id}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                  </div>
                </SelectItem>
              ))
            ) : (
              <div className="py-2 px-2 text-sm text-muted-foreground">
                No team members available
              </div>
            )}
          </SelectContent>
        </Select>
      </td>
      <td className="py-3 px-4">
        <LeadDatePicker 
          date={firstContactDate} 
          onDateSelect={handleFirstContactChange}
          label="Set date"
        />
      </td>
      <td className="py-3 px-4">
        <LeadDatePicker 
          date={lastContactDate} 
          onDateSelect={handleLastContactChange}
          label="Set date"
        />
      </td>
      <td className="py-3 px-4">
        <LeadDatePicker 
          date={followUpDate} 
          onDateSelect={handleFollowUpChange}
          label="Schedule"
        />
      </td>
      <td className="py-3 px-4 text-right">
        <LeadActions lead={lead} onOpen={onLeadClick} />
      </td>
    </tr>
  );
};

export default LeadTableRow;
