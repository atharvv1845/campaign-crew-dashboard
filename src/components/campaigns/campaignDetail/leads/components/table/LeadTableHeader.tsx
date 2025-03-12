import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Lead } from '../../types';

interface LeadTableHeaderProps {
  hasSelection: boolean;
  onSelectAll: (selected: boolean) => void;
  allSelected: boolean;
  leads: Lead[];
  selectedLeads: number[];
  displayFields?: string[];
  populatedFields?: string[];
}

const LeadTableHeader: React.FC<LeadTableHeaderProps> = ({ 
  hasSelection, 
  onSelectAll, 
  allSelected,
  leads,
  selectedLeads,
  displayFields = [],
  populatedFields = []
}) => {
  // Use displayFields if provided, otherwise fall back to populatedFields
  const fields = displayFields.length > 0 ? displayFields : populatedFields;

  // Helper for field display names
  const getFieldDisplayName = (field: string): string => {
    const displayNames: Record<string, string> = {
      name: 'Name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      currentStage: 'Stage',
      assignedTo: 'Assigned To',
      firstContacted: 'First Contacted',
      lastContacted: 'Last Contacted',
      followUpDate: 'Next Follow Up',
      notes: 'Notes',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
      facebook: 'Facebook',
      instagram: 'Instagram',
      whatsapp: 'WhatsApp',
      socialProfiles: 'Platforms',
      title: 'Title',
      status: 'Status'
    };
    
    return displayNames[field] || field.charAt(0).toUpperCase() + field.slice(1);
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
      
      {/* Always show name column first if in fields */}
      {fields.includes('name') && (
        <th className="py-3 px-6 text-left font-medium">Name</th>
      )}
      
      {/* Other fields */}
      {fields.filter(field => field !== 'name').map(field => (
        <th key={field} className="py-3 px-6 text-left font-medium">
          {getFieldDisplayName(field)}
        </th>
      ))}
      
      {/* Always show actions */}
      <th className="py-3 px-3 text-left font-medium">Actions</th>
    </tr>
  );
};

export default LeadTableHeader;
