import React, { useState } from 'react';
import { Mail, Calendar, Edit, Check, X, MoreHorizontal } from 'lucide-react';
import StageBadge from '../badges/StageBadge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  linkedin?: string;
  whatsapp?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  lastContacted: string;
  currentStage: string;
  assignedTo: string;
  followUpDate?: string;
  notes?: string;
}

interface Campaign {
  stages: Array<{
    id: number;
    name: string;
    count: number;
  }>;
  leads: number;
  teamMembers?: string[];
}

interface LeadTableProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
  onSelectLead?: (leadId: number, selected: boolean) => void;
  selectedLeads?: number[];
  campaign?: Campaign;
  onUpdateLead?: (lead: Lead) => void;
}

const LeadTable: React.FC<LeadTableProps> = ({ 
  leads, 
  onLeadClick, 
  onSelectLead,
  selectedLeads = [],
  campaign,
  onUpdateLead
}) => {
  const { toast } = useToast();
  const [editingLead, setEditingLead] = useState<number | null>(null);
  const [editNote, setEditNote] = useState<string>('');
  
  const handleEditNote = (lead: Lead) => {
    setEditingLead(lead.id);
    setEditNote(lead.notes || '');
  };
  
  const saveNote = (leadId: number) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead && onUpdateLead) {
      const updatedLead = { ...lead, notes: editNote };
      onUpdateLead(updatedLead);
    }
    setEditingLead(null);
    toast({
      title: "Note saved",
      description: "The lead note has been updated.",
    });
  };
  
  const updateLeadStage = (leadId: number, stage: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead && onUpdateLead) {
      const updatedLead = { ...lead, currentStage: stage };
      onUpdateLead(updatedLead);
    }
    toast({
      title: "Stage updated",
      description: `Lead stage changed to ${stage}.`,
    });
  };
  
  const updateLeadAssignment = (leadId: number, teamMember: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead && onUpdateLead) {
      const updatedLead = { ...lead, assignedTo: teamMember };
      onUpdateLead(updatedLead);
    }
    toast({
      title: "Assignment changed",
      description: `Lead assigned to ${teamMember}.`,
    });
  };
  
  const updateFollowUpDate = (leadId: number, date: Date) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead && onUpdateLead) {
      const updatedLead = { 
        ...lead, 
        followUpDate: format(date, 'yyyy-MM-dd')
      };
      onUpdateLead(updatedLead);
    }
    toast({
      title: "Follow-up date set",
      description: `Follow-up scheduled for ${format(date, 'MMMM dd, yyyy')}.`,
    });
  };

  const logContact = (leadId: number) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead && onUpdateLead) {
      const updatedLead = { 
        ...lead, 
        lastContacted: format(new Date(), 'yyyy-MM-dd')
      };
      onUpdateLead(updatedLead);
    }
    toast({
      title: "Contact logged",
      description: "Contact with this lead has been recorded.",
    });
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/20 border-b border-border">
              {onSelectLead && (
                <th className="px-3 py-3">
                  <Checkbox 
                    checked={leads.length > 0 && selectedLeads.length === leads.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        leads.forEach(lead => onSelectLead(lead.id, true));
                      } else {
                        leads.forEach(lead => onSelectLead(lead.id, false));
                      }
                    }}
                  />
                </th>
              )}
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Lead</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Contacted</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Follow-up Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Stage</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned To</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</th>
              <th className="text-left px-3 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-muted/10 transition-colors">
                {onSelectLead && (
                  <td className="px-3 py-4">
                    <Checkbox 
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={(checked) => onSelectLead(lead.id, !!checked)}
                    />
                  </td>
                )}
                <td className="px-6 py-4">
                  <div 
                    className="text-sm font-medium cursor-pointer hover:text-primary"
                    onClick={() => onLeadClick && onLeadClick(lead)}
                  >
                    {lead.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">{lead.company}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="text-primary hover:text-primary/80">
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {lead.linkedin && (
                      <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-400">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {lead.whatsapp && (
                      <a href={`https://wa.me/${lead.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </a>
                    )}
                    {lead.twitter && (
                      <a href={`https://twitter.com/${lead.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    {lead.instagram && (
                      <a href={`https://instagram.com/${lead.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
                          <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z"/>
                          <circle cx="18.406" cy="5.594" r="1.44"/>
                        </svg>
                      </a>
                    )}
                    {lead.facebook && (
                      <a href={lead.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{lead.lastContacted}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7">
                        {lead.followUpDate || 'Set date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="p-3">
                        <div className="space-y-2">
                          {['Tomorrow', 'In 3 days', 'Next week'].map((option) => (
                            <Button
                              key={option}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              onClick={() => {
                                const today = new Date();
                                let date = new Date();
                                
                                if (option === 'Tomorrow') {
                                  date.setDate(today.getDate() + 1);
                                } else if (option === 'In 3 days') {
                                  date.setDate(today.getDate() + 3);
                                } else if (option === 'Next week') {
                                  date.setDate(today.getDate() + 7);
                                }
                                
                                updateFollowUpDate(lead.id, date);
                              }}
                            >
                              {option}
                            </Button>
                          ))}
                          {/* In a full implementation, add a date picker here */}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
                <td className="px-6 py-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer">
                        <StageBadge stage={lead.currentStage} />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {campaign?.stages && (
                        <div className="p-2 space-y-1">
                          {campaign.stages.map(stage => (
                            <Button
                              key={stage.id}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              onClick={() => updateLeadStage(lead.id, stage.name)}
                            >
                              {stage.name}
                            </Button>
                          ))}
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                </td>
                <td className="px-6 py-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7">
                        {lead.assignedTo}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {campaign?.teamMembers && (
                        <div className="p-2 space-y-1">
                          {campaign.teamMembers.map(member => (
                            <Button
                              key={member}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              onClick={() => updateLeadAssignment(lead.id, member)}
                            >
                              {member}
                            </Button>
                          ))}
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                </td>
                <td className="px-6 py-4 max-w-[200px]">
                  {editingLead === lead.id ? (
                    <div className="flex items-center space-x-2">
                      <textarea
                        className="w-full text-sm p-2 border rounded-md"
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        rows={2}
                      />
                      <div className="flex flex-col space-y-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => saveNote(lead.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => setEditingLead(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between group">
                      <div className="text-sm truncate max-w-[160px]">
                        {lead.notes || 'No notes'}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 opacity-0 group-hover:opacity-100" 
                        onClick={() => handleEditNote(lead)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </td>
                <td className="px-3 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onLeadClick && onLeadClick(lead)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditNote(lead)}>
                        Edit Notes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => logContact(lead.id)}>
                        Log Contact
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
