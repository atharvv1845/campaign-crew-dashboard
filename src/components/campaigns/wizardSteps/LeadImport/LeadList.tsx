
import React from 'react';
import { Trash2, Save, X, Bookmark } from 'lucide-react';
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
            <Bookmark className="h-3.5 w-3.5" />
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
        <div className="flex items-center gap-2 mb-4 p-3 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex-1">
            <label className="block text-xs font-medium mb-1 text-primary">Lead List Name</label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Enter a name for this lead list"
              className="w-full px-3 py-1.5 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              autoFocus
            />
          </div>
          <button
            onClick={onSaveList}
            disabled={!listName}
            className="px-3 py-1.5 h-[34px] mt-5 bg-primary text-primary-foreground text-sm rounded-md disabled:opacity-50 flex items-center gap-1"
          >
            <Save className="h-3.5 w-3.5" />
            Save
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
                <th className="px-4 py-2 text-left">Phone</th>
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
                  <td className="px-4 py-2">{lead.phone || '-'}</td>
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
