
import React, { useState } from 'react';
import { LeadData } from '../../../types/campaignTypes';
import { useToast } from '@/hooks/use-toast';
import StatusBadge from '@/components/leads/StatusBadge';
import { Pencil, Check, X, UserCheck } from 'lucide-react';

interface LeadManagementProps {
  leads: LeadData[];
  onLeadUpdate: (id: string, updates: Partial<LeadData>) => void;
  stages: { id: string; name: string }[];
  teamMembers: string[];
}

const LeadManagement: React.FC<LeadManagementProps> = ({ 
  leads, 
  onLeadUpdate, 
  stages,
  teamMembers
}) => {
  const { toast } = useToast();
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    status?: string;
    assignedTo?: string;
  }>({});

  // Start editing a lead
  const startEdit = (lead: LeadData) => {
    setEditingLeadId(lead.id);
    setEditValues({
      status: lead.status,
      assignedTo: lead.assignedTo || ''
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingLeadId(null);
    setEditValues({});
  };

  // Save changes to a lead
  const saveChanges = (leadId: string) => {
    onLeadUpdate(leadId, editValues);
    setEditingLeadId(null);
    setEditValues({});
    
    toast({
      title: "Lead Updated",
      description: "Lead information has been successfully updated.",
    });
  };

  if (leads.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No leads found.</div>;
  }

  return (
    <div className="mt-6 border border-border rounded-lg">
      <div className="bg-muted/20 px-4 py-3 border-b border-border">
        <h4 className="font-medium">Campaign Leads ({leads.length})</h4>
        <p className="text-xs text-muted-foreground mt-1">
          You can update lead status and assignments below
        </p>
      </div>
      <div className="p-0 max-h-[350px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/10 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">Company</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
              <th className="px-4 py-2 text-left font-medium">Assigned To (Optional)</th>
              <th className="px-4 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-muted/5">
                <td className="px-4 py-2">
                  {lead.firstName} {lead.lastName}
                </td>
                <td className="px-4 py-2">{lead.email}</td>
                <td className="px-4 py-2">{lead.company || '-'}</td>
                <td className="px-4 py-2">
                  {editingLeadId === lead.id ? (
                    <select
                      value={editValues.status}
                      onChange={(e) => setEditValues(prev => ({...prev, status: e.target.value}))}
                      className="w-full px-2 py-1 text-xs rounded border border-border"
                    >
                      {stages.map(stage => (
                        <option key={stage.id} value={stage.id}>{stage.name}</option>
                      ))}
                    </select>
                  ) : (
                    <StatusBadge 
                      status={stages.find(s => s.id === lead.status)?.name || 'New'} 
                    />
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingLeadId === lead.id ? (
                    <select
                      value={editValues.assignedTo}
                      onChange={(e) => setEditValues(prev => ({...prev, assignedTo: e.target.value}))}
                      className="w-full px-2 py-1 text-xs rounded border border-border"
                    >
                      <option value="">Unassigned</option>
                      {teamMembers.length > 0 ? (
                        teamMembers.map(member => (
                          <option key={member} value={member}>{member}</option>
                        ))
                      ) : (
                        <option disabled>No team members available</option>
                      )}
                    </select>
                  ) : (
                    <span>{lead.assignedTo || '-'}</span>
                  )}
                </td>
                <td className="px-4 py-2 text-right">
                  {editingLeadId === lead.id ? (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => saveChanges(lead.id)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-md"
                        title="Save changes"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                        title="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(lead)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                      title="Edit lead"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadManagement;
