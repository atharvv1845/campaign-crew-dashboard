
import React from 'react';
import { Plus } from 'lucide-react';
import { LeadData } from '../../types/campaignTypes';

interface SavedLeadListsProps {
  savedLeadLists: { id: string; name: string; leads: LeadData[] }[];
  loadLeadList: (listId: string) => void;
}

const SavedLeadLists: React.FC<SavedLeadListsProps> = ({ savedLeadLists, loadLeadList }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium">Saved Lead Lists</h4>
      </div>
      <div className="border border-border rounded-lg p-2 max-h-[150px] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {savedLeadLists.map(list => (
            <button
              key={list.id}
              onClick={() => loadLeadList(list.id)}
              className="flex items-center justify-between p-2 border border-border rounded hover:bg-muted/20 text-left"
            >
              <div>
                <p className="font-medium text-sm">{list.name}</p>
                <p className="text-xs text-muted-foreground">{list.leads.length} leads</p>
              </div>
              <Plus className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedLeadLists;
