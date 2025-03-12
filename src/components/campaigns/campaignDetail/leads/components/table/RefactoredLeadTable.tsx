
import React from 'react';
import LeadTableHeader from './LeadTableHeader';
import LeadTableRow from './LeadTableRow';
import { Lead, Campaign } from '../../types';
import { useToastNotifications } from '../../hooks/useToastNotifications';

interface RefactoredLeadTableProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
  onSelectLead?: (leadId: number, selected: boolean) => void;
  selectedLeads?: number[];
  campaign?: Campaign;
  onUpdateLead?: (lead: Lead) => void;
}

const RefactoredLeadTable: React.FC<RefactoredLeadTableProps> = ({ 
  leads, 
  onLeadClick, 
  onSelectLead,
  selectedLeads = [],
  campaign,
  onUpdateLead
}) => {
  const { 
    notifyLeadUpdate, 
    notifyNoteUpdate, 
    notifyStageUpdate,
    notifyAssignmentUpdate,
    notifyFollowUpUpdate,
    notifyContactLogged
  } = useToastNotifications();

  const handleUpdateLead = (updatedLead: Lead) => {
    if (onUpdateLead) {
      onUpdateLead(updatedLead);
      notifyLeadUpdate(updatedLead);
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (onSelectLead) {
      leads.forEach(lead => onSelectLead(lead.id, selected));
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <LeadTableHeader 
              hasSelection={!!onSelectLead}
              onSelectAll={handleSelectAll}
              allSelected={leads.length > 0 && selectedLeads.length === leads.length}
              leads={leads}
              selectedLeads={selectedLeads}
            />
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {leads.map(lead => (
              <LeadTableRow
                key={lead.id}
                lead={lead}
                campaign={campaign}
                onSelectLead={onSelectLead}
                isSelected={selectedLeads.includes(lead.id)}
                onLeadClick={onLeadClick}
                onUpdateLead={handleUpdateLead}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefactoredLeadTable;
