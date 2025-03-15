
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Edit, Trash2, Calendar as CalendarIcon, User } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { Lead, Campaign } from './types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import LeadPlatformContact from './components/LeadPlatformContact';
import { useToast } from '@/hooks/use-toast';

interface LeadTableProps {
  leads: Lead[];
  campaign?: Campaign; // Optional campaign object for stages/team members
  onStatusChange: (leadId: number | string, status: string) => void;
}

const LeadTable: React.FC<LeadTableProps> = ({ leads, campaign, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const { toast } = useToast();
  const leadsPerPage = 10;
  
  // Apply filters (search and platform filters)
  const filteredLeads = leads.filter(lead => {
    // Apply search filter
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Apply platform filter
    let matchesPlatform = true;
    if (platformFilter !== 'all') {
      switch (platformFilter) {
        case 'email':
          matchesPlatform = Boolean(lead.email);
          break;
        case 'phone':
          matchesPlatform = Boolean(lead.phone);
          break;
        case 'linkedin':
          matchesPlatform = Boolean(lead.linkedin);
          break;
        case 'twitter':
          matchesPlatform = Boolean(lead.twitter);
          break;
        case 'facebook':
          matchesPlatform = Boolean(lead.facebook);
          break;
        case 'instagram':
          matchesPlatform = Boolean(lead.instagram);
          break;
        case 'whatsapp':
          matchesPlatform = Boolean(lead.whatsapp);
          break;
        case 'social':
          matchesPlatform = Boolean(
            lead.linkedin || lead.twitter || lead.facebook || 
            lead.instagram || lead.whatsapp
          );
          break;
        default:
          matchesPlatform = true;
      }
    }
    
    return matchesSearch && matchesPlatform;
  });
  
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  
  const handleStatusChange = (leadId: number | string, status: string) => {
    onStatusChange(leadId, status);
  };

  const handleDateChange = (leadId: number | string, field: 'firstContactDate' | 'lastContact' | 'nextFollowUpDate', date: Date) => {
    // Format date to ISO string and slice to get YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    // Call onStatusChange to maintain consistency in API (we're extending its functionality)
    // In a real app, you would create a separate function for this or modify onStatusChange
    onStatusChange(leadId, field + ':::' + formattedDate);
  };

  const handleTeamMemberChange = (leadId: number | string, teamMember: string) => {
    // Similar to handleDateChange, using the same handler for consistency
    onStatusChange(leadId, 'assignedTeamMember:::' + teamMember);
  };

  const handleContactUpdate = (leadId: number | string, field: string, value: string) => {
    // Update lead contact information
    onStatusChange(leadId, field + ':::' + value);
    
    // Show toast notification
    toast({
      title: "Contact details updated",
      description: `Lead ${field} has been updated`,
    });
  };
  
  const DatePickerPopover = ({ 
    value, 
    onChange, 
    label 
  }: { 
    value?: string, 
    onChange: (date: Date) => void, 
    label: string 
  }) => {
    const date = value ? new Date(value) : undefined;
    
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "w-full justify-start text-left text-xs font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-3 w-3" />
            {date ? format(date, 'PPP') : label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && onChange(date)}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Platform Filter */}
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="email">Email Only</SelectItem>
            <SelectItem value="phone">Phone Only</SelectItem>
            <SelectItem value="social">Any Social Media</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
          </SelectContent>
        </Select>
        
        <Button>Export</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead Name</TableHead>
              <TableHead>Contact Platforms</TableHead>
              <TableHead>Email/Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>First Contact</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Next Follow-Up</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLeads.length > 0 ? (
              currentLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  
                  {/* Platform Contact Cell */}
                  <TableCell>
                    <LeadPlatformContact 
                      lead={lead} 
                      editable={true}
                      onUpdate={handleContactUpdate}
                    />
                  </TableCell>
                  
                  <TableCell>{lead.email || lead.phone || '-'}</TableCell>
                  <TableCell>{lead.company || '-'}</TableCell>
                  
                  {/* First Contact Date */}
                  <TableCell>
                    <DatePickerPopover
                      value={lead.firstContactDate}
                      onChange={(date) => handleDateChange(lead.id, 'firstContactDate', date)}
                      label="Set date"
                    />
                  </TableCell>
                  
                  {/* Last Contact Date */}
                  <TableCell>
                    <DatePickerPopover
                      value={lead.lastContact}
                      onChange={(date) => handleDateChange(lead.id, 'lastContact', date)}
                      label="Set date"
                    />
                  </TableCell>
                  
                  {/* Next Follow-Up Date */}
                  <TableCell>
                    <DatePickerPopover
                      value={lead.nextFollowUpDate}
                      onChange={(date) => handleDateChange(lead.id, 'nextFollowUpDate', date)}
                      label="Schedule"
                    />
                  </TableCell>
                  
                  {/* Status Dropdown */}
                  <TableCell>
                    <Select 
                      defaultValue={lead.status} 
                      onValueChange={(value) => handleStatusChange(lead.id, value)}
                    >
                      <SelectTrigger className="w-[140px] h-8 text-xs">
                        <SelectValue>
                          <StatusBadge status={lead.status} />
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {campaign?.stages ? (
                          campaign.stages.map((stage) => (
                            <SelectItem key={stage.id} value={stage.name}>
                              <StatusBadge status={stage.name} />
                            </SelectItem>
                          ))
                        ) : (
                          <>
                            <SelectItem value="Pending">
                              <StatusBadge status="Pending" />
                            </SelectItem>
                            <SelectItem value="Contacted">
                              <StatusBadge status="Contacted" />
                            </SelectItem>
                            <SelectItem value="Interested">
                              <StatusBadge status="Interested" />
                            </SelectItem>
                            <SelectItem value="Not Interested">
                              <StatusBadge status="Not Interested" />
                            </SelectItem>
                            <SelectItem value="Converted">
                              <StatusBadge status="Converted" />
                            </SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  
                  {/* Team Member Assignment */}
                  <TableCell>
                    <Select 
                      defaultValue={lead.assignedTeamMember} 
                      onValueChange={(value) => handleTeamMemberChange(lead.id, value)}
                    >
                      <SelectTrigger className="w-[120px] h-8 text-xs">
                        <SelectValue placeholder="Assign">
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3" />
                            {lead.assignedTeamMember || "Assign"}
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {campaign?.teamMembers ? (
                          campaign.teamMembers.map((member, index) => (
                            <SelectItem key={index} value={member}>
                              <div className="flex items-center gap-2">
                                <User className="h-3 w-3" />
                                {member}
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <>
                            <SelectItem value="John Doe">
                              <div className="flex items-center gap-2">
                                <User className="h-3 w-3" />
                                John Doe
                              </div>
                            </SelectItem>
                            <SelectItem value="Jane Smith">
                              <div className="flex items-center gap-2">
                                <User className="h-3 w-3" />
                                Jane Smith
                              </div>
                            </SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  
                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit Lead
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center h-24">
                  No leads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstLead + 1}-{Math.min(indexOfLastLead, filteredLeads.length)} of {filteredLeads.length} leads
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadTable;
