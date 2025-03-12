
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail, Phone, MessageSquare } from 'lucide-react';
import StageBadge from '../../../badges/StageBadge';
import { Lead } from '../../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LeadTableRowProps {
  lead: Lead;
  onOpen: (lead: Lead) => void;
}

const LeadTableRow: React.FC<LeadTableRowProps> = ({ lead, onOpen }) => {
  return (
    <tr>
      <td className="py-2 px-4">{lead.name}</td>
      <td className="py-2 px-4">{lead.company}</td>
      <td className="py-2 px-4">{lead.email}</td>
      <td className="py-2 px-4">
        <StageBadge stage={lead.currentStage} />
      </td>
      <td className="py-2 px-4">{lead.lastContacted || 'N/A'}</td>
      <td className="py-2 px-4">{lead.assignedTo || 'N/A'}</td>
      <td className="py-2 px-4">
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="sm" onClick={() => onOpen(lead)}>
            View
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="h-4 w-4 mr-2" />
                Call
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};

export default LeadTableRow;
