
import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import LeadTable from './leads/LeadTable';
import LeadKanban from './leads/LeadKanban';

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
}

interface Campaign {
  stages: Array<{
    id: number;
    name: string;
    count: number;
  }>;
  leads: number;
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
          
          {/* Filters */}
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {/* Filter dropdown would go here */}
          </div>
        </div>
      </div>
      
      {/* Table view */}
      {view === 'table' && <LeadTable leads={leadsData} />}
      
      {/* Kanban view */}
      {view === 'kanban' && (
        <LeadKanban 
          stages={campaign.stages} 
          leads={leadsData} 
          campaignLeads={campaign.leads} 
        />
      )}
    </div>
  );
};

export default LeadTracking;
