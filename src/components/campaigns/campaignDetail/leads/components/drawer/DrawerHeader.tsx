
import React from 'react';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Lead } from '../../types';

interface DrawerHeaderProps {
  lead: Lead;
  isEditing: boolean;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ lead, isEditing }) => {
  // Handle display when name or email is missing
  const displayName = lead.name || 
                     (lead.firstName && lead.lastName ? `${lead.firstName} ${lead.lastName}` : 
                     lead.firstName || lead.lastName || `Lead ${lead.id}`);
  
  return (
    <SheetHeader className="pb-4">
      <SheetTitle className="text-xl">
        {isEditing ? 'Edit Lead' : displayName}
      </SheetTitle>
      {!isEditing && (
        <div className="text-sm text-muted-foreground">
          {lead.company ? `${lead.company} • ` : ''}{lead.email || 'No email provided'}
        </div>
      )}
    </SheetHeader>
  );
};

export default DrawerHeader;
