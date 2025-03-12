
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Lead } from '../../types';

interface LeadTableHeaderProps {
  onSelectAll?: (selected: boolean) => void;
  allSelected?: boolean;
  hasSelection?: boolean;
  leads: Lead[];
  selectedLeads: number[];
}

const LeadTableHeader: React.FC<LeadTableHeaderProps> = ({ 
  onSelectAll, 
  allSelected, 
  hasSelection = false,
  leads,
  selectedLeads
}) => {
  return (
    <tr className="bg-muted/20 border-b border-border">
      {hasSelection && (
        <th className="px-3 py-3">
          <Checkbox 
            checked={leads.length > 0 && selectedLeads.length === leads.length}
            onCheckedChange={(checked) => {
              if (onSelectAll) {
                onSelectAll(!!checked);
              }
            }}
          />
        </th>
      )}
      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Lead</th>
      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Platforms</th>
      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Contacted</th>
      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Follow-up Date</th>
      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Stage</th>
      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned To</th>
      <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</th>
      <th className="text-left px-3 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
    </tr>
  );
};

export default LeadTableHeader;
