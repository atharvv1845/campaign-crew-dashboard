
import React from 'react';
import { format } from 'date-fns';
import { Calendar, Mail, Phone, ExternalLink, Edit, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import LeadContactMethods from './LeadContactMethods';

export interface Lead {
  id: string | number;
  name: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  status: string;
  currentStage?: string;
  campaign?: string;
  campaignId?: string | number;
  lastContact?: string;
  firstContactDate?: string;
  nextFollowUpDate?: string;
  assignedTo?: string;
  assignedTeamMember?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  notes?: string;
  socialProfiles?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    [key: string]: string | undefined;
  };
  contactMethods?: string[];
  contacted?: boolean;
  contactPlatforms?: string[];
}

interface LeadTableComponentProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
  statusOptions?: string[];
  teamMembers?: string[];
  onUpdateLead?: (lead: Lead) => void;
}

const LeadTableComponent: React.FC<LeadTableComponentProps> = ({ 
  leads,
  onLeadClick,
  statusOptions = [],
  teamMembers = [],
  onUpdateLead
}) => {
  // Helper function to format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString || 'Invalid date';
    }
  };

  // Handle date change
  const handleDateChange = (lead: Lead, date: Date | undefined, field: 'firstContactDate' | 'lastContact' | 'nextFollowUpDate') => {
    if (onUpdateLead && date) {
      const updatedLead = {
        ...lead,
        [field]: format(date, 'yyyy-MM-dd')
      };
      onUpdateLead(updatedLead);
    }
  };

  // Handle status change
  const handleStatusChange = (lead: Lead, status: string) => {
    if (onUpdateLead) {
      const updatedLead = {
        ...lead,
        status,
        currentStage: status
      };
      onUpdateLead(updatedLead);
    }
  };

  // Handle team member assignment
  const handleTeamAssignment = (lead: Lead, teamMember: string) => {
    if (onUpdateLead) {
      const updatedLead = {
        ...lead,
        assignedTo: teamMember
      };
      onUpdateLead(updatedLead);
    }
  };

  // Determine contact methods for a lead
  const getContactMethods = (lead: Lead) => {
    const methods: string[] = lead.contactMethods || [];
    if (lead.email && !methods.includes('email')) methods.push('email');
    if (lead.phone && !methods.includes('phone')) methods.push('phone');
    
    // Add social profiles as contact methods
    if (lead.socialProfiles) {
      Object.entries(lead.socialProfiles).forEach(([key, value]) => {
        if (value && !methods.includes(key)) methods.push(key);
      });
    }
    
    // Add directly defined social profiles
    if (lead.linkedin && !methods.includes('linkedin')) methods.push('linkedin');
    if (lead.twitter && !methods.includes('twitter')) methods.push('twitter');
    if (lead.facebook && !methods.includes('facebook')) methods.push('facebook');
    if (lead.instagram && !methods.includes('instagram')) methods.push('instagram');
    if (lead.whatsapp && !methods.includes('whatsapp')) methods.push('whatsapp');
    
    return methods;
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20 border-b border-border">
              <TableHead className="font-medium text-xs">Name</TableHead>
              <TableHead className="font-medium text-xs">Contact Info</TableHead>
              <TableHead className="font-medium text-xs">Campaign</TableHead>
              <TableHead className="font-medium text-xs">First Contacted</TableHead>
              <TableHead className="font-medium text-xs">Last Contact</TableHead>
              <TableHead className="font-medium text-xs">Next Follow-up</TableHead>
              <TableHead className="font-medium text-xs">Status</TableHead>
              <TableHead className="font-medium text-xs">Assigned To</TableHead>
              <TableHead className="font-medium text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {leads.map((lead) => (
              <TableRow 
                key={lead.id}
                className="hover:bg-muted/10 cursor-pointer"
                onClick={() => onLeadClick && onLeadClick(lead)}
              >
                <TableCell>
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-muted-foreground">{lead.title || ''}</div>
                    {lead.company && (
                      <div className="text-xs text-muted-foreground mt-1">{lead.company}</div>
                    )}
                  </div>
                </TableCell>
                
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col gap-1">
                    {lead.email && (
                      <div className="flex items-center text-sm">
                        <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <a 
                          href={`mailto:${lead.email}`} 
                          className="hover:text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {lead.email}
                        </a>
                      </div>
                    )}
                    {lead.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <a 
                          href={`tel:${lead.phone}`} 
                          className="hover:text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {lead.phone}
                        </a>
                      </div>
                    )}
                    <LeadContactMethods 
                      methods={getContactMethods(lead)} 
                      readOnly={true}
                    />
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="text-sm">{lead.campaign || '-'}</div>
                </TableCell>
                
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center justify-start p-1 h-auto font-normal w-full"
                      >
                        <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-sm truncate">
                          {formatDate(lead.firstContactDate)}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={lead.firstContactDate ? new Date(lead.firstContactDate) : undefined}
                        onSelect={(date) => handleDateChange(lead, date, 'firstContactDate')}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
                
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center justify-start p-1 h-auto font-normal w-full"
                      >
                        <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-sm truncate">
                          {formatDate(lead.lastContact)}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={lead.lastContact ? new Date(lead.lastContact) : undefined}
                        onSelect={(date) => handleDateChange(lead, date, 'lastContact')}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
                
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center justify-start p-1 h-auto font-normal w-full"
                      >
                        <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-sm truncate">
                          {formatDate(lead.nextFollowUpDate)}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={lead.nextFollowUpDate ? new Date(lead.nextFollowUpDate) : undefined}
                        onSelect={(date) => handleDateChange(lead, date, 'nextFollowUpDate')}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </TableCell>
                
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Select
                    value={(lead.status || lead.currentStage || '').toString()}
                    onValueChange={(value) => handleStatusChange(lead, value)}
                  >
                    <SelectTrigger className="h-8 w-[130px] text-sm border-none bg-muted/10 hover:bg-muted/20 focus:ring-0">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Select
                    value={(lead.assignedTo || lead.assignedTeamMember || '').toString()}
                    onValueChange={(value) => handleTeamAssignment(lead, value)}
                  >
                    <SelectTrigger className="h-8 w-[130px] text-sm border-none bg-muted/10 hover:bg-muted/20 focus:ring-0">
                      <SelectValue placeholder="Assign to" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {teamMembers.filter(member => member !== 'All Team Members').map(member => (
                        <SelectItem key={member} value={member}>
                          {member}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onLeadClick && onLeadClick(lead)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Lead
                      </DropdownMenuItem>
                      {lead.campaign && lead.campaignId && (
                        <DropdownMenuItem asChild>
                          <a href={`/campaigns/${lead.campaignId}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Campaign
                          </a>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeadTableComponent;
