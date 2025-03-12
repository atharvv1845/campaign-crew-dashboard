
import React, { useState } from 'react';
import LeadFilters from './LeadFilters';
import LeadTableComponent, { Lead } from './LeadTableComponent';

const LeadTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  
  // Empty leads data array instead of mock data
  const leadData: Lead[] = [];
  
  // Filter leads based on search term and status
  const filteredLeads = leadData.filter(lead => {
    // Apply search filter
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter if not "All Statuses"
    const matchesStatus = statusFilter === 'All Statuses' || lead.status === statusFilter;
    
    // Return true if both conditions are met
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      {/* Header and actions */}
      <LeadFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      {filteredLeads.length === 0 ? (
        <div className="glass-card rounded-xl p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No Leads Available</h3>
          <p className="text-muted-foreground">Add leads from campaign creation or import leads to get started.</p>
        </div>
      ) : (
        <LeadTableComponent leads={filteredLeads} />
      )}
    </div>
  );
};

export default LeadTable;
