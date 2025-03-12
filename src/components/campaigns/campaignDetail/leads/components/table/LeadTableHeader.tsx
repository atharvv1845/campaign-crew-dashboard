
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
  const displayColumn = (fieldName: string): boolean => {
    return populatedFields.includes(fieldName);
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
      
      {/* Always show name */}
      <th className="py-3 px-6 text-left font-medium">Name</th>
      
      {/* Only show columns with data */}
      {displayColumn('socialProfiles') && (
        <th className="py-3 px-6 text-left font-medium">Platforms</th>
      )}
      
      {displayColumn('lastContacted') && (
        <th className="py-3 px-6 text-left font-medium">Last Contacted</th>
      )}
      
      {displayColumn('followUpDate') && (
        <th className="py-3 px-6 text-left font-medium">Follow Up</th>
      )}
      
      {displayColumn('currentStage') && (
        <th className="py-3 px-6 text-left font-medium">Stage</th>
      )}
      
      {displayColumn('assignedTo') && (
        <th className="py-3 px-6 text-left font-medium">Assigned To</th>
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
