
import React, { useState } from 'react';
import LeadTable from './leads/LeadTable';
import LeadKanban from './leads/LeadKanban';
import LeadDetailDrawer from './leads/LeadDetailDrawer';
import FilterToolbar from './leads/components/FilterToolbar';
import { useLeadFilters } from './leads/hooks/useLeadFilters';
import { Lead, Campaign } from './leads/types';

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
  const {
    filteredLeads,
    statusFilter,
    setStatusFilter,
    teamFilter,
    setTeamFilter,
    dateSort,
    setDateSort,
    selectedLeads,
    handleSelectLead,
    resetFilters
  } = useLeadFilters(leadsData);
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadDetail, setShowLeadDetail] = useState(false);

  // Handle lead click to show details
  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setShowLeadDetail(true);
  };

  // Handle bulk actions for selected leads
  const handleBulkAction = (action: 'status' | 'team' | 'followUp', value: string) => {
    // Implementation would update the leads in a real app
    // Reset selection after action
    handleSelectLeads([]);
  };

  // Set all selected leads at once
  const handleSelectLeads = (leadIds: number[]) => {
    selectedLeads.forEach(id => {
      if (!leadIds.includes(id)) {
        handleSelectLead(id, false);
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Filter Toolbar */}
      <FilterToolbar 
        view={view}
        setView={setView}
        campaign={campaign}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        teamFilter={teamFilter}
        setTeamFilter={setTeamFilter}
        dateSort={dateSort}
        setDateSort={setDateSort}
        resetFilters={resetFilters}
        selectedLeads={selectedLeads}
        handleBulkAction={handleBulkAction}
      />
      
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
