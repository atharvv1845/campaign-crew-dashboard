
import React from 'react';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import StatusBadge from './StatusBadge';

export interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  title: string;
  status: string;
  campaign: string;
  lastContact: string;
}

interface LeadTableComponentProps {
  leads: Lead[];
}

const LeadTableComponent: React.FC<LeadTableComponentProps> = ({ leads }) => {
  return (
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
            {leads.map((lead) => (
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
  );
};

export default LeadTableComponent;
