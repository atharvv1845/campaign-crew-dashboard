
import React from 'react';
import { LeadData } from '../../../types/campaignTypes';

interface ImportedLeadsTableProps {
  leads: LeadData[];
}

const ImportedLeadsTable: React.FC<ImportedLeadsTableProps> = ({ leads }) => {
  if (leads.length === 0) return null;
  
  return (
    <div className="mt-6 border border-border rounded-lg">
      <div className="bg-muted/20 px-4 py-3 border-b border-border">
        <h4 className="font-medium">Imported Leads ({leads.length})</h4>
      </div>
      <div className="p-4 max-h-[300px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/10">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-4 py-2">{`${lead.firstName} ${lead.lastName}`}</td>
                <td className="px-4 py-2">{lead.email}</td>
                <td className="px-4 py-2">{lead.company || '-'}</td>
                <td className="px-4 py-2">{lead.statusName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImportedLeadsTable;
