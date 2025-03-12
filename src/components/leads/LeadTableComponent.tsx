
import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';
import LeadContactMethods from './LeadContactMethods';

export interface Lead {
  id: number | string;
  name: string;
  email?: string;
  company?: string;
  title?: string;
  status: string;
  campaign?: string;
  lastContact?: string;
  contactMethods?: string[];
  // Social profiles
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
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
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact Methods</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Campaign</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => {
              // Determine contact methods from available properties
              const contactMethods: string[] = lead.contactMethods || [];
              if (lead.email && !contactMethods.includes('email')) contactMethods.push('email');
              if (lead.linkedin && !contactMethods.includes('linkedin')) contactMethods.push('linkedin');
              if (lead.twitter && !contactMethods.includes('twitter')) contactMethods.push('twitter');
              if (lead.facebook && !contactMethods.includes('facebook')) contactMethods.push('facebook');
              if (lead.instagram && !contactMethods.includes('instagram')) contactMethods.push('instagram');
              if (lead.whatsapp && !contactMethods.includes('whatsapp')) contactMethods.push('whatsapp');
              
              return (
                <tr key={lead.id} className="hover:bg-muted/10">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">{lead.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <LeadContactMethods 
                      methods={contactMethods.length > 0 ? contactMethods : ['email']} 
                      readOnly={true}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{lead.company || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{lead.campaign || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {lead.lastContact || 'Not contacted yet'}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTableComponent;
