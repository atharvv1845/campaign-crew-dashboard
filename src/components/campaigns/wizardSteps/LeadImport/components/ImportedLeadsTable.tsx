
import React from 'react';
import { LeadData } from '../../../types/campaignTypes';

interface ImportedLeadsTableProps {
  leads: LeadData[];
}

const ImportedLeadsTable: React.FC<ImportedLeadsTableProps> = ({ leads }) => {
  if (leads.length === 0) return null;
  
  // Dynamically determine which fields to display
  const determineFields = () => {
    // Default fields to show
    const fields = ['firstName', 'lastName', 'email', 'company'];
    
    // Check if we have status/stage information
    const hasStatus = leads.some(lead => lead.status || lead.statusName);
    if (hasStatus) fields.push('status');
    
    // Check if we have assignments
    const hasAssignments = leads.some(lead => lead.assignedTo);
    if (hasAssignments) fields.push('assignedTo');
    
    return fields;
  };
  
  const fieldsToDisplay = determineFields();
  
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
              {fieldsToDisplay.includes('email') && (
                <th className="px-4 py-2 text-left">Email</th>
              )}
              {fieldsToDisplay.includes('company') && (
                <th className="px-4 py-2 text-left">Company</th>
              )}
              {fieldsToDisplay.includes('status') && (
                <th className="px-4 py-2 text-left">Status</th>
              )}
              {fieldsToDisplay.includes('assignedTo') && (
                <th className="px-4 py-2 text-left">Assigned To</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-4 py-2">
                  {lead.firstName && lead.lastName ? 
                    `${lead.firstName} ${lead.lastName}` : 
                    lead.firstName || lead.lastName || `Lead #${lead.id}`}
                </td>
                {fieldsToDisplay.includes('email') && (
                  <td className="px-4 py-2">{lead.email || '-'}</td>
                )}
                {fieldsToDisplay.includes('company') && (
                  <td className="px-4 py-2">{lead.company || '-'}</td>
                )}
                {fieldsToDisplay.includes('status') && (
                  <td className="px-4 py-2">{lead.statusName || lead.status || '-'}</td>
                )}
                {fieldsToDisplay.includes('assignedTo') && (
                  <td className="px-4 py-2">{lead.assignedTo || '-'}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImportedLeadsTable;
