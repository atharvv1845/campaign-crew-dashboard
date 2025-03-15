
import React from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  UserPlus, 
  ChevronDown, 
  X,
  SortAsc,
  SortDesc,
  CalendarClock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LeadFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  campaignFilter: string;
  setCampaignFilter: (campaign: string) => void;
  teamFilter: string;
  setTeamFilter: (team: string) => void;
  dateSort: string;
  setDateSort: (sort: string) => void;
  statusOptions: string[];
  campaignOptions: Array<{id: string | number, name: string}>;
  teamMembers: string[];
  resetFilters: () => void;
}

const LeadFilters: React.FC<LeadFiltersProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  campaignFilter,
  setCampaignFilter,
  teamFilter,
  setTeamFilter,
  dateSort,
  setDateSort,
  statusOptions,
  campaignOptions,
  teamMembers,
  resetFilters
}) => {
  // Helper to check if filters are applied
  const hasFilters = searchTerm || 
    statusFilter !== 'All Statuses' || 
    campaignFilter !== 'All Campaigns' || 
    teamFilter !== 'All Team Members' ||
    dateSort !== 'none';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="glass-input pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Campaign Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
                <Filter className="h-4 w-4" />
                <span>{campaignFilter === 'All Campaigns' ? 'Campaign' : campaignFilter}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px] max-h-[300px] overflow-y-auto">
                <DropdownMenuLabel>Filter by Campaign</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {campaignOptions.map(campaign => (
                  <DropdownMenuItem 
                    key={campaign.id}
                    onClick={() => setCampaignFilter(campaign.name)}
                    className={campaignFilter === campaign.name ? "bg-muted" : ""}
                  >
                    {campaign.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Status Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
                <Filter className="h-4 w-4" />
                <span>{statusFilter === 'All Statuses' ? 'Status' : statusFilter}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px] max-h-[300px] overflow-y-auto">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {statusOptions.map(status => (
                  <DropdownMenuItem 
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={statusFilter === status ? "bg-muted" : ""}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Team Member Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
                <Filter className="h-4 w-4" />
                <span>{teamFilter === 'All Team Members' ? 'Team' : teamFilter}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px] max-h-[300px] overflow-y-auto">
                <DropdownMenuLabel>Filter by Team Member</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {teamMembers.map(member => (
                  <DropdownMenuItem 
                    key={member}
                    onClick={() => setTeamFilter(member)}
                    className={teamFilter === member ? "bg-muted" : ""}
                  >
                    {member}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Date Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
                <CalendarClock className="h-4 w-4" />
                <span>Sort Dates</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Sort by Date</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setDateSort('next-follow-up-asc')}
                  className={dateSort === 'next-follow-up-asc' ? "bg-muted" : ""}
                >
                  <SortAsc className="h-4 w-4 mr-2" />
                  Next Follow-Up (Earliest First)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDateSort('next-follow-up-desc')}
                  className={dateSort === 'next-follow-up-desc' ? "bg-muted" : ""}
                >
                  <SortDesc className="h-4 w-4 mr-2" />
                  Next Follow-Up (Latest First)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDateSort('last-contact-asc')}
                  className={dateSort === 'last-contact-asc' ? "bg-muted" : ""}
                >
                  <SortAsc className="h-4 w-4 mr-2" />
                  Last Contact (Oldest First)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDateSort('last-contact-desc')}
                  className={dateSort === 'last-contact-desc' ? "bg-muted" : ""}
                >
                  <SortDesc className="h-4 w-4 mr-2" />
                  Last Contact (Newest First)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setDateSort('none')}>
                  Clear Sort
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Reset Filters Button (only shown when filters are applied) */}
            {hasFilters && (
              <button 
                onClick={resetFilters}
                className="flex items-center gap-2 px-3 py-2 bg-muted/20 hover:bg-muted/30 rounded-lg text-sm transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
            <Mail className="h-4 w-4" />
            <span>Message</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm shadow-sm hover:bg-primary/90 transition-colors">
            <UserPlus className="h-4 w-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadFilters;
