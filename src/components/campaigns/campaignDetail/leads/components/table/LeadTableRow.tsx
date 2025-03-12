
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { Lead, Campaign } from '../../types';
import LeadDatePicker from './LeadDatePicker';
import LeadPlatformIcons from './LeadPlatformIcons';
import LeadStageSelector from './LeadStageSelector';
import LeadActions from './LeadActions';

interface LeadTableRowProps {
  lead: Lead;
  campaign?: Campaign;
  onSelectLead?: (leadId: number, selected: boolean) => void;
  isSelected?: boolean;
  onLeadClick?: (lead: Lead) => void;
  onUpdateLead?: (lead: Lead) => void;
  onOpen: (lead: Lead) => void;
  populatedFields?: string[];
}

const LeadTableRow: React.FC<LeadTableRowProps> = ({ 
  lead, 
  campaign,
  onSelectLead,
  isSelected,
  onLeadClick,
  onUpdateLead,
  onOpen,
  populatedFields = []
}) => {
  const [firstContacted, setFirstContacted] = useState<Date | undefined>(
    lead.firstContacted ? new Date(lead.firstContacted) : undefined
  );
  const [lastContacted, setLastContacted] = useState<Date | undefined>(
    lead.lastContacted ? new Date(lead.lastContacted) : undefined
  );
  const [followUpDate, setFollowUpDate] = useState<Date | undefined>(
    lead.followUpDate ? new Date(lead.followUpDate) : undefined
  );

  const handleFirstContactSelect = (newDate: Date | undefined) => {
    setFirstContacted(newDate);
    if (onUpdateLead && newDate) {
      onUpdateLead({
        ...lead,
        firstContacted: format(newDate, 'yyyy-MM-dd')
      });
    }
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    setLastContacted(newDate);
    if (onUpdateLead && newDate) {
      onUpdateLead({
        ...lead,
        lastContacted: format(newDate, 'yyyy-MM-dd')
      });
    }
  };

  const handleFollowUpSelect = (newDate: Date | undefined) => {
    setFollowUpDate(newDate);
    if (onUpdateLead && newDate) {
      onUpdateLead({
        ...lead,
        followUpDate: format(newDate, 'yyyy-MM-dd')
      });
    }
  };

  const handleStageChange = (stage: string) => {
    if (onUpdateLead) {
      onUpdateLead({
        ...lead,
        currentStage: stage
      });
    }
  };

  // Always display these core fields
  const coreFields = ['currentStage', 'assignedTo', 'firstContacted', 'lastContacted', 'followUpDate'];
  
  const displayColumn = (fieldName: string): boolean => {
    return coreFields.includes(fieldName) || populatedFields.includes(fieldName);
  };

  // Get the lead's display name based on available information
  const getLeadName = () => {
    if (lead.name) return lead.name;
    
    if (lead.firstName && lead.lastName) {
      return `${lead.firstName} ${lead.lastName}`;
    } else if (lead.firstName) {
      return lead.firstName;
    } else if (lead.lastName) {
      return lead.lastName;
    } else if (lead.fullName) {
      return lead.fullName;
    } else if (lead.email) {
      return lead.email;
    } else {
      return `Lead #${lead.id}`;
    }
  };

  return (
    <tr className="hover:bg-muted/10">
      {onSelectLead && (
        <td className="py-3 px-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => {
              if (onSelectLead) {
                onSelectLead(lead.id, !!checked);
              }
            }}
          />
        </td>
      )}
      <td className="py-3 px-6">{getLeadName()}</td>
      
      {displayColumn('socialProfiles') && (
        <td className="py-3 px-6">
          <LeadPlatformIcons lead={lead} />
        </td>
      )}
      
      {displayColumn('company') && (
        <td className="py-3 px-6">{lead.company || 'N/A'}</td>
      )}
      
      {displayColumn('title') && (
        <td className="py-3 px-6">{lead.title || 'N/A'}</td>
      )}
      
      {displayColumn('firstContacted') && (
        <td className="py-3 px-6">
          <LeadDatePicker
            date={firstContacted}
            onDateSelect={handleFirstContactSelect}
            label="Set first contact"
          />
        </td>
      )}
      
      {displayColumn('lastContacted') && (
        <td className="py-3 px-6">
          <LeadDatePicker
            date={lastContacted}
            onDateSelect={handleDateSelect}
            label="Set date"
          />
        </td>
      )}
      
      {displayColumn('followUpDate') && (
        <td className="py-3 px-6">
          <LeadDatePicker
            date={followUpDate}
            onDateSelect={handleFollowUpSelect}
            label="Set follow-up"
          />
        </td>
      )}
      
      {displayColumn('currentStage') && (
        <td className="py-3 px-6">
          <LeadStageSelector
            currentStage={lead.currentStage}
            onStageChange={handleStageChange}
            campaign={campaign}
          />
        </td>
      )}
      
      {displayColumn('assignedTo') && (
        <td className="py-3 px-6">{lead.assignedTo || 'N/A'}</td>
      )}
      
      {displayColumn('notes') && (
        <td className="py-3 px-6">
          <span className="line-clamp-1 max-w-[150px]">{lead.notes || 'No notes'}</span>
        </td>
      )}
      
      <td className="py-3 px-3">
        <LeadActions lead={lead} onOpen={onOpen} />
      </td>
    </tr>
  );
};

export default LeadTableRow;
