
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

  // Determine which fields are populated
  const getPopulatedFields = () => {
    const fields = new Set<string>();
    
    leads.forEach(lead => {
      // Check each property of the lead
      Object.entries(lead).forEach(([key, value]) => {
        if (
          // Only add fields that have a value and aren't internal fields
          value && 
          value !== '' && 
          key !== 'id' && 
          key !== 'campaignId'
        ) {
          fields.add(key);
        }
      });
      
      // Special handling for social profiles
      if (lead.linkedin || lead.twitter || lead.facebook || 
          lead.instagram || lead.whatsapp || lead.email) {
        fields.add('socialProfiles');
      }
    });
    
    return Array.from(fields);
  };

  const populatedFields = getPopulatedFields();

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
              populatedFields={populatedFields}
            />
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {leads.length > 0 ? (
              leads.map(lead => (
                <LeadTableRow
                  key={lead.id}
                  lead={lead}
                  campaign={campaign}
                  onSelectLead={onSelectLead}
                  isSelected={selectedLeads.includes(lead.id)}
                  onLeadClick={onLeadClick}
                  onUpdateLead={handleUpdateLead}
                  onOpen={onLeadClick || (() => {})}
                  populatedFields={populatedFields}
                />
              ))
            ) : (
              <tr>
                <td colSpan={populatedFields.length + 2} className="py-6 text-center text-muted-foreground">
                  No leads found for this campaign
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefactoredLeadTable;
