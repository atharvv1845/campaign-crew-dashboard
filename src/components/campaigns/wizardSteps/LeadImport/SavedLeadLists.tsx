
import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { LeadData } from '../../types/campaignTypes';

interface SavedLeadListsProps {
  savedLeadLists: { id: string; name: string; leads: LeadData[] }[];
  loadLeadList: (listId: string) => void;
}

const SavedLeadLists: React.FC<SavedLeadListsProps> = ({ savedLeadLists, loadLeadList }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium">Your Saved Lead Lists</h4>
      </div>
      <div className="border border-border rounded-lg p-2 max-h-[300px] overflow-y-auto">
        <div className="grid grid-cols-1 gap-2">
          {savedLeadLists.map(list => (
            <button
              key={list.id}
              onClick={() => loadLeadList(list.id)}
              className="flex items-center justify-between p-3 border border-border rounded hover:bg-muted/20 text-left w-full"
            >
              <div>
                <p className="font-medium">{list.name}</p>
                <p className="text-xs text-muted-foreground">{list.leads.length} leads</p>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-muted-foreground" />
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedLeadLists;
