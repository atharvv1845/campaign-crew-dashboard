
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
  const coreFields = ['name', 'currentStage', 'assignedTo'];
  
  // Add contact date fields if they exist in the data
  const dateFields = ['firstContacted', 'lastContacted', 'followUpDate'].filter(
    field => populatedFields.includes(field)
  );
  
  // Get all fields that should be displayed
  const fieldsToDisplay = [
    ...coreFields,
    ...dateFields,
    ...populatedFields.filter(
      field => !coreFields.includes(field) && !dateFields.includes(field)
    )
  ];

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
      
      {/* Dynamically render header columns based on available fields */}
      {fieldsToDisplay.includes('name') && (
        <th className="py-3 px-6 text-left font-medium">Name</th>
      )}
      
      {populatedFields.includes('socialProfiles') && (
        <th className="py-3 px-6 text-left font-medium">Platforms</th>
      )}
      
      {populatedFields.includes('email') && (
        <th className="py-3 px-6 text-left font-medium">Email</th>
      )}
      
      {populatedFields.includes('company') && (
        <th className="py-3 px-6 text-left font-medium">Company</th>
      )}
      
      {populatedFields.includes('title') && (
        <th className="py-3 px-6 text-left font-medium">Title</th>
      )}
      
      {dateFields.map(field => {
        const labels = {
          firstContacted: 'First Contacted',
          lastContacted: 'Last Contacted',
          followUpDate: 'Next Follow Up'
        };
        
        return (
          <th key={field} className="py-3 px-6 text-left font-medium">
            {labels[field as keyof typeof labels]}
          </th>
        );
      })}
      
      {fieldsToDisplay.includes('currentStage') && (
        <th className="py-3 px-6 text-left font-medium">Stage</th>
      )}
      
      {fieldsToDisplay.includes('assignedTo') && (
        <th className="py-3 px-6 text-left font-medium">Assigned To</th>
      )}
      
      {populatedFields.includes('notes') && (
        <th className="py-3 px-6 text-left font-medium">Notes</th>
      )}
      
      {/* Always show actions */}
      <th className="py-3 px-3 text-left font-medium">Actions</th>
    </tr>
  );
};

export default LeadTableHeader;
