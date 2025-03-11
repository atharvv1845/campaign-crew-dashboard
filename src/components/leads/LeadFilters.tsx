
import React from 'react';
import { Search, Filter, Download, Mail, UserPlus, ChevronDown } from 'lucide-react';

interface LeadFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const LeadFilters: React.FC<LeadFiltersProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter 
}) => {
  // Status options for the filter
  const statusOptions = [
    "All Statuses",
    "Interested",
    "Contacted",
    "Not Interested",
    "Responded",
    "New"
  ];

  return (
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
        </div>
        
        <div className="relative">
          <select
            className="glass-input pl-4 pr-8 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none w-full sm:w-[200px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        
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
  );
};

export default LeadFilters;
