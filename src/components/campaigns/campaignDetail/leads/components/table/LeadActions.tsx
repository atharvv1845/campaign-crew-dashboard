
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail, Phone, MessageSquare, Edit2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Lead } from '../../types';

interface LeadActionsProps {
  lead: Lead;
  onOpen: (lead: Lead) => void;
}

const LeadActions: React.FC<LeadActionsProps> = ({ lead, onOpen }) => {
  return (
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
          <DropdownMenuItem>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Notes
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LeadActions;
