
import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, ChevronDown, ArrowUpDown, UserPlus, Download, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock lead data
const leadData = [
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

// Lead status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Interested':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'Contacted':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case 'Not Interested':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case 'Responded':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'New':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      getStatusStyles(status)
    )}>
      {status}
    </span>
  );
};

const LeadTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter leads based on search term
  const filteredLeads = leadData.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      {/* Header and actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
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
      
      {/* Leads table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/20 border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Name
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Campaign</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Contact</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {filteredLeads.map((lead) => (
                <tr 
                  key={lead.id}
                  className="hover:bg-muted/20 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{lead.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{lead.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{lead.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{lead.campaign}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{lead.lastContact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/20 transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;
