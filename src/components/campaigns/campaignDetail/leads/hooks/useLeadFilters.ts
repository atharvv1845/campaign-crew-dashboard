
import { useState, useEffect } from 'react';
import { Lead } from '../types';

export function useLeadFilters(leadsData: Lead[]) {
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leadsData);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [teamFilter, setTeamFilter] = useState<string | null>(null);
  const [dateSort, setDateSort] = useState<'lastContacted' | 'followUpDate' | null>(null);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

  // Update filtered leads when data or filters change
  useEffect(() => {
    applyFilters();
  }, [leadsData, statusFilter, teamFilter, dateSort]);

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

  return {
    filteredLeads,
    statusFilter,
    setStatusFilter,
    teamFilter,
    setTeamFilter,
    dateSort,
    setDateSort,
    selectedLeads,
    setSelectedLeads,
    resetFilters,
    handleSelectLead
  };
}
