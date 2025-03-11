
import React from 'react';
import { Trash2, Save, X } from 'lucide-react';
import { LeadData } from '../../types/campaignTypes';

interface LeadListProps {
  leads: LeadData[];
  removeLead: (id: string) => void;
  saveListMode: boolean;
  setSaveListMode: (mode: boolean) => void;
  listName: string;
  setListName: (name: string) => void;
  onSaveList: () => void;
}

const LeadList: React.FC<LeadListProps> = ({ 
  leads, 
  removeLead, 
  saveListMode, 
  setSaveListMode,
  listName,
  setListName,
  onSaveList
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium">Added Leads ({leads.length})</h4>
        {!saveListMode ? (
          <button
            onClick={() => setSaveListMode(true)}
            className="flex items-center gap-1 text-xs font-medium text-primary"
          >
            <Save className="h-3.5 w-3.5" />
            Save as Lead List
          </button>
        ) : (
          <button
            onClick={() => setSaveListMode(false)}
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Cancel
          </button>
        )}
      </div>
      
      {saveListMode && (
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter lead list name"
            className="flex-1 px-3 py-1.5 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={onSaveList}
            disabled={!listName}
            className="px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-md disabled:opacity-50"
          >
            Save List
          </button>
        </div>
      )}
      
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="max-h-[200px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/20">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Company</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-muted/10">
                  <td className="px-4 py-2">
                    {lead.firstName} {lead.lastName}
                  </td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.company || '-'}</td>
                  <td className="px-4 py-2 text-right">
                    <button 
                      onClick={() => removeLead(lead.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
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

export default LeadList;
