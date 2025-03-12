
import React from 'react';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Lead } from '../../types';

interface DrawerHeaderProps {
  lead: Lead;
  isEditing: boolean;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ lead, isEditing }) => {
  return (
    <SheetHeader className="pb-4">
      <SheetTitle className="text-xl">
        {isEditing ? 'Edit Lead' : lead.name}
      </SheetTitle>
      {!isEditing && (
        <div className="text-sm text-muted-foreground">
          {lead.company} • {lead.email}
        </div>
      )}
    </SheetHeader>
  );
};

export default DrawerHeader;
