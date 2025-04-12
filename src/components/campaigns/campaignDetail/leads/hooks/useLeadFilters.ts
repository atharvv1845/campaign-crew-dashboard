
import { useState, useMemo, useCallback } from 'react';
import { Lead } from '../types';

export const useLeadFilters = (leads: Lead[]) => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [teamFilter, setTeamFilter] = useState<string | null>(null);
  const [dateSort, setDateSort] = useState<"lastContact" | "nextFollowUpDate">("lastContact");
  const [selectedLeads, setSelectedLeads] = useState<(string | number)[]>([]);
  
  // Filter and sort the leads
  const filteredLeads = useMemo(() => {
    let filtered = [...leads];
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(lead => lead.currentStage === statusFilter || lead.status === statusFilter);
    }
    
    // Apply team filter
    if (teamFilter) {
      filtered = filtered.filter(lead => lead.assignedTo === teamFilter);
    }
    
    // Sort by date
    return filtered.sort((a, b) => {
      const dateA = dateSort === "lastContact" 
        ? new Date(a.lastContact || a.lastContacted || 0) 
        : new Date(a.nextFollowUpDate || a.followUpDate || 0);
      
      const dateB = dateSort === "lastContact" 
        ? new Date(b.lastContact || b.lastContacted || 0) 
        : new Date(b.nextFollowUpDate || b.followUpDate || 0);
      
      return dateB.getTime() - dateA.getTime(); // newest first
    });
  }, [leads, statusFilter, teamFilter, dateSort]);
  
  // Reset all filters
  const resetFilters = useCallback(() => {
    setStatusFilter(null);
    setTeamFilter(null);
    setDateSort("lastContact");
    setSelectedLeads([]);
  }, []);
  
  // Handle lead selection
  const handleSelectLead = useCallback((leadId: string | number, selected: boolean) => {
    setSelectedLeads(prev => {
      if (selected) {
        return [...prev, leadId];
      } else {
        return prev.filter(id => id !== leadId);
      }
    });
  }, []);
  
  // Handle select all
  const handleSelectAll = useCallback((selected: boolean) => {
    if (selected) {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  }, [filteredLeads]);
  
  return {
    filteredLeads,
    statusFilter,
    setStatusFilter,
    teamFilter,
    setTeamFilter,
    dateSort,
    setDateSort,
    selectedLeads,
    handleSelectLead,
    handleSelectAll,
    resetFilters
  };
};
