
import React, { useState } from 'react';
import { Filter, ChevronDown, SlidersHorizontal, Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import LeadTable from './leads/LeadTable';
import LeadKanban from './leads/LeadKanban';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import LeadDetailDrawer from './leads/LeadDetailDrawer';

export interface Lead {
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
  title?: string;
  status?: string;
  lastContact?: string;
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

interface LeadTrackingProps {
  campaign: Campaign;
  leadsData: Lead[];
  view: 'table' | 'kanban';
  setView: (view: 'table' | 'kanban') => void;
}

const LeadTracking: React.FC<LeadTrackingProps> = ({ 
  campaign, 
  leadsData, 
  view, 
  setView 
}) => {
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leadsData);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [teamFilter, setTeamFilter] = useState<string | null>(null);
  const [dateSort, setDateSort] = useState<'lastContacted' | 'followUpDate' | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

  // Filter leads based on selected filters
  const applyFilters = () => {
    let filtered = [...leadsData];
    
    if (statusFilter) {
      filtered = filtered.filter(lead => lead.currentStage === statusFilter);
    }
    
    if (teamFilter) {
      filtered = filtered.filter(lead => lead.assignedTo === teamFilter);
    }
    
    if (dateSort) {
      filtered.sort((a, b) => {
        const dateA = new Date(dateSort === 'lastContacted' ? a.lastContacted : (a.followUpDate || ''));
        const dateB = new Date(dateSort === 'lastContacted' ? b.lastContacted : (b.followUpDate || ''));
        return dateB.getTime() - dateA.getTime(); // Sort descending (newest first)
      });
    }
    
    setFilteredLeads(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setStatusFilter(null);
    setTeamFilter(null);
    setDateSort(null);
    setFilteredLeads(leadsData);
  };

  // Handle lead selection for bulk actions
  const handleSelectLead = (leadId: number, selected: boolean) => {
    if (selected) {
      setSelectedLeads(prev => [...prev, leadId]);
    } else {
      setSelectedLeads(prev => prev.filter(id => id !== leadId));
    }
  };

  // Handle bulk actions for selected leads
  const handleBulkAction = (action: 'status' | 'team' | 'followUp', value: string) => {
    // Implementation would update the leads in a real app
    setSelectedLeads([]);
  };

  // Handle lead click to show details
  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setShowLeadDetail(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Lead Tracking</h2>
        
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center bg-muted/10 rounded-lg p-1">
            <button
              onClick={() => setView('table')}
              className={cn(
                "px-3 py-1 rounded-md text-sm transition-colors",
                view === 'table' 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted/20"
              )}
            >
              Table
            </button>
            <button
              onClick={() => setView('kanban')}
              className={cn(
                "px-3 py-1 rounded-md text-sm transition-colors",
                view === 'kanban' 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted/20"
              )}
            >
              Kanban
            </button>
          </div>
          
          {/* Status Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Status</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="end">
              <div className="space-y-1">
                {campaign.stages.map(stage => (
                  <Button
                    key={stage.id}
                    variant={statusFilter === stage.name ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setStatusFilter(statusFilter === stage.name ? null : stage.name);
                      applyFilters();
                    }}
                  >
                    {stage.name} ({stage.count})
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start mt-2"
                  onClick={resetFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Team Filter */}
          {campaign.teamMembers && campaign.teamMembers.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>Team</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2" align="end">
                <div className="space-y-1">
                  {campaign.teamMembers.map(member => (
                    <Button
                      key={member}
                      variant={teamFilter === member ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        setTeamFilter(teamFilter === member ? null : member);
                        applyFilters();
                      }}
                    >
                      {member}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
          
          {/* Date Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Date</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by Date</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={dateSort === 'lastContacted'}
                onCheckedChange={() => {
                  setDateSort(dateSort === 'lastContacted' ? null : 'lastContacted');
                  applyFilters();
                }}
              >
                Last Contacted
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={dateSort === 'followUpDate'}
                onCheckedChange={() => {
                  setDateSort(dateSort === 'followUpDate' ? null : 'followUpDate');
                  applyFilters();
                }}
              >
                Follow-up Date
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* More actions button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <SlidersHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                disabled={selectedLeads.length === 0}
                onClick={() => handleBulkAction('status', 'update')}
              >
                Bulk Update Status
              </DropdownMenuItem>
              <DropdownMenuItem 
                disabled={selectedLeads.length === 0}
                onClick={() => handleBulkAction('team', 'assign')}
              >
                Bulk Assign Team
              </DropdownMenuItem>
              <DropdownMenuItem 
                disabled={selectedLeads.length === 0}
                onClick={() => handleBulkAction('followUp', 'update')}
              >
                Bulk Update Follow-up
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.print()}>
                Export Leads
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Table view */}
      {view === 'table' && (
        <LeadTable 
          leads={filteredLeads} 
          onLeadClick={handleLeadClick}
          onSelectLead={handleSelectLead}
          selectedLeads={selectedLeads}
          campaign={campaign}
        />
      )}
      
      {/* Kanban view */}
      {view === 'kanban' && (
        <LeadKanban 
          stages={campaign.stages} 
          leads={filteredLeads} 
          campaignLeads={campaign.leads}
          onLeadClick={handleLeadClick} 
        />
      )}
      
      {/* Lead Detail Drawer */}
      {selectedLead && (
        <LeadDetailDrawer
          lead={selectedLead}
          open={showLeadDetail}
          onClose={() => setShowLeadDetail(false)}
          campaign={campaign}
        />
      )}
    </div>
  );
};

export default LeadTracking;
