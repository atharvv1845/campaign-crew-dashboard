
import React, { useState } from 'react';
import LeadFilters from './LeadFilters';
import LeadTableComponent, { Lead } from './LeadTableComponent';

// Mock lead data
const leadData: Lead[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    company: 'Acme Inc.',
    title: 'Marketing Director',
    status: 'Interested',
    campaign: 'Q4 Product Launch',
    lastContact: '2023-10-14',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    company: 'Tech Solutions Ltd.',
    title: 'CTO',
    status: 'Contacted',
    campaign: 'Summer Sale Outreach',
    lastContact: '2023-10-12',
  },
  {
    id: 3,
    name: 'Jessica Williams',
    email: 'jessica.williams@example.com',
    company: 'Global Enterprises',
    title: 'CEO',
    status: 'Not Interested',
    campaign: 'Q4 Product Launch',
    lastContact: '2023-10-10',
  },
  {
    id: 4,
    name: 'David Miller',
    email: 'david.miller@example.com',
    company: 'Miller Consulting',
    title: 'Principal Consultant',
    status: 'Responded',
    campaign: 'Customer Feedback Survey',
    lastContact: '2023-10-09',
  },
  {
    id: 5,
    name: 'Amanda Rodriguez',
    email: 'amanda.r@example.com',
    company: 'InnoTech',
    title: 'Product Manager',
    status: 'New',
    campaign: 'Summer Sale Outreach',
    lastContact: '2023-10-15',
  },
  {
    id: 6,
    name: 'Robert Kim',
    email: 'robert.kim@example.com',
    company: 'Kim Associates',
    title: 'Senior Developer',
    status: 'Interested',
    campaign: 'Q4 Product Launch',
    lastContact: '2023-10-11',
  },
];

const LeadTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  
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
      
      {/* Leads table */}
      <LeadTableComponent leads={filteredLeads} />
    </div>
  );
};

export default LeadTable;
