
import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface CampaignFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterStatus: string | null;
  setFilterStatus: (value: string | null) => void;
}

const CampaignFilters: React.FC<CampaignFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}) => {
  // Statuses for filter dropdown
  const statuses = ["Active", "Completed", "Draft", "Scheduled"];

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input 
          type="text" 
          placeholder="Search campaigns..." 
          className="glass-input pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 w-full sm:w-[300px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter Status</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="absolute right-0 mt-1 w-48 bg-card shadow-lg rounded-lg border border-border overflow-hidden z-50 hidden group-hover:block">
            <div className="py-1">
              <button 
                onClick={() => setFilterStatus(null)} 
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted/20 ${filterStatus === null ? 'bg-muted/20' : ''}`}
              >
                All Statuses
              </button>
              {statuses.map(status => (
                <button 
                  key={status} 
                  onClick={() => setFilterStatus(status)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted/20 ${filterStatus === status ? 'bg-muted/20' : ''}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignFilters;
