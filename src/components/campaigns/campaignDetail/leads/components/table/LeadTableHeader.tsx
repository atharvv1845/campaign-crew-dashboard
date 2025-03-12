
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Lead } from '../../types';

interface LeadTableHeaderProps {
  hasSelection: boolean;
  onSelectAll: (selected: boolean) => void;
  allSelected: boolean;
  leads: Lead[];
  selectedLeads: number[];
  populatedFields?: string[];
}

const LeadTableHeader: React.FC<LeadTableHeaderProps> = ({ 
  hasSelection, 
  onSelectAll, 
  allSelected,
  leads,
  selectedLeads,
  populatedFields = []
}) => {
  // Always display these core fields
  const coreFields = ['currentStage', 'assignedTo', 'firstContacted', 'lastContacted', 'followUpDate'];
  
  const displayColumn = (fieldName: string): boolean => {
    return coreFields.includes(fieldName) || populatedFields.includes(fieldName);
  };

  return (
    <tr className="bg-muted/10 text-sm">
      {hasSelection && (
        <th className="py-3 px-3">
          <Checkbox
            checked={allSelected}
            onCheckedChange={onSelectAll}
          />
        </th>
      )}
      
      {/* Always show name column */}
      <th className="py-3 px-6 text-left font-medium">Name</th>
      
      {/* Show social platforms column */}
      {displayColumn('socialProfiles') && (
        <th className="py-3 px-6 text-left font-medium">Platforms</th>
      )}
      
      {/* Show company column if data exists */}
      {displayColumn('company') && (
        <th className="py-3 px-6 text-left font-medium">Company</th>
      )}
      
      {/* Show title column if data exists */}
      {displayColumn('title') && (
        <th className="py-3 px-6 text-left font-medium">Title</th>
      )}
      
      {/* Always show these core fields */}
      {displayColumn('currentStage') && (
        <th className="py-3 px-6 text-left font-medium">Stage</th>
      )}
      
      {displayColumn('assignedTo') && (
        <th className="py-3 px-6 text-left font-medium">Assigned To</th>
      )}
      
      {/* Always show these core date fields */}
      {displayColumn('firstContacted') && (
        <th className="py-3 px-6 text-left font-medium">First Contacted</th>
      )}
      
      {displayColumn('lastContacted') && (
        <th className="py-3 px-6 text-left font-medium">Last Contacted</th>
      )}
      
      {displayColumn('followUpDate') && (
        <th className="py-3 px-6 text-left font-medium">Next Follow Up</th>
      )}
      
      {displayColumn('notes') && (
        <th className="py-3 px-6 text-left font-medium">Notes</th>
      )}
      
      {/* Always show actions */}
      <th className="py-3 px-3 text-left font-medium">Actions</th>
    </tr>
  );
};

export default LeadTableHeader;
