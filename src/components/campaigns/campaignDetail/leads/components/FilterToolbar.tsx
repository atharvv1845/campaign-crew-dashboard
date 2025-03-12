
import React from 'react';
import { Filter, ChevronDown, SlidersHorizontal, Users, Calendar } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { Campaign } from '../types';

interface FilterToolbarProps {
  view: 'table' | 'kanban';
  setView: (view: 'table' | 'kanban') => void;
  campaign: Campaign;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  teamFilter: string | null;
  setTeamFilter: (team: string | null) => void;
  dateSort: 'lastContacted' | 'followUpDate' | null;
  setDateSort: (sort: 'lastContacted' | 'followUpDate' | null) => void;
  resetFilters: () => void;
  selectedLeads: number[];
  handleBulkAction: (action: 'status' | 'team' | 'followUp', value: string) => void;
}

const FilterToolbar: React.FC<FilterToolbarProps> = ({
  view,
  setView,
  campaign,
  statusFilter,
  setStatusFilter,
  teamFilter,
  setTeamFilter,
  dateSort,
  setDateSort,
  resetFilters,
  selectedLeads,
  handleBulkAction
}) => {
  return (
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
              }}
            >
              Last Contacted
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={dateSort === 'followUpDate'}
              onCheckedChange={() => {
                setDateSort(dateSort === 'followUpDate' ? null : 'followUpDate');
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
  );
};

export default FilterToolbar;
