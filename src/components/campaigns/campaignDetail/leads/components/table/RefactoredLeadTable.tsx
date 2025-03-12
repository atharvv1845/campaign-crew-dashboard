
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

  // Get all possible fields to display
  const allPossibleFields = [
    'socialProfiles', 'notes', 'email', 'linkedin', 'twitter',
    'facebook', 'instagram', 'whatsapp', 'company', 'title'
  ];
  
  // Core fields that should always be displayed
  const coreFields = ['currentStage', 'assignedTo', 'firstContacted', 'lastContacted', 'followUpDate'];
  
  // Determine which fields are populated
  const getPopulatedFields = () => {
    const fieldCounts: Record<string, number> = {};
    
    // Initialize counts for all fields we want to show
    allPossibleFields.forEach(field => {
      fieldCounts[field] = 0;
    });
    
    // Count how many leads have each field populated
    leads.forEach(lead => {
      // Check standard fields
      Object.entries(lead).forEach(([key, value]) => {
        if (value && value !== '' && value !== 'N/A' && fieldCounts[key] !== undefined) {
          fieldCounts[key] = (fieldCounts[key] || 0) + 1;
        }
      });
      
      // Special handling for socialProfiles
      const hasSocialProfiles = lead.linkedin || lead.twitter || lead.facebook || 
                               lead.instagram || lead.whatsapp || lead.email;
      
      if (hasSocialProfiles) {
        fieldCounts['socialProfiles'] = (fieldCounts['socialProfiles'] || 0) + 1;
      }
    });
    
    // Return fields that have data in at least one lead (excluding core fields which are handled separately)
    return [
      'socialProfiles',  // Always include socialProfiles
      ...Object.entries(fieldCounts)
        .filter(([key, count]) => count > 0 && key !== 'socialProfiles')
        .map(([key]) => key)
    ];
  };

  const populatedFields = getPopulatedFields();

  // Add console log to debug the leads data
  console.log('Displaying leads in table:', leads);

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
                <td colSpan={9} className="py-6 text-center text-muted-foreground">
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
