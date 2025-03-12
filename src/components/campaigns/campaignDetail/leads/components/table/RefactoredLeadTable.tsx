
import React, { useEffect } from 'react';
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

  useEffect(() => {
    console.log('Rendering lead table with leads:', leads);
  }, [leads]);

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

  // Dynamically determine which fields to display based on lead data
  const determineDisplayFields = () => {
    if (!leads || leads.length === 0) return ['name', 'email', 'company', 'currentStage'];

    // Count how many leads have each field populated
    const fieldCounts: Record<string, number> = {};
    const allFields = new Set<string>();
    
    // Essential fields that should always be considered if present
    const essentialFields = [
      'name', 'email', 'company', 'currentStage', 'assignedTo', 
      'lastContacted', 'followUpDate', 'linkedin', 'phone'
    ];
    
    // Go through all leads and count populated fields
    leads.forEach(lead => {
      Object.entries(lead).forEach(([key, value]) => {
        // Skip internal fields like id
        if (key === 'id') return;
        
        // Add to all possible fields
        allFields.add(key);
        
        // Count if the field has a value
        if (value && value !== '' && value !== 'N/A') {
          fieldCounts[key] = (fieldCounts[key] || 0) + 1;
        }
      });
    });
    
    // Prioritize essential fields, then fields that have data for at least half the leads
    const halfLeadCount = Math.max(1, Math.floor(leads.length / 2));
    
    // Start with essential fields that have data
    const displayFields = essentialFields
      .filter(field => allFields.has(field) && (fieldCounts[field] || 0) > 0);
    
    // Add other common fields
    Array.from(allFields)
      .filter(field => !essentialFields.includes(field) && (fieldCounts[field] || 0) >= halfLeadCount)
      .forEach(field => displayFields.push(field));
    
    // Ensure we have a reasonable number of fields (between 4 and 8)
    return displayFields.slice(0, Math.max(4, Math.min(8, displayFields.length)));
  };

  const displayFields = determineDisplayFields();
  
  // For debugging
  console.log('Display fields for lead table:', displayFields);

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
              displayFields={displayFields}
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
                  displayFields={displayFields}
                />
              ))
            ) : (
              <tr>
                <td colSpan={displayFields.length + (onSelectLead ? 2 : 1)} className="py-6 text-center text-muted-foreground">
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
