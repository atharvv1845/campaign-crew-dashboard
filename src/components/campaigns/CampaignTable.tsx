
import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import CampaignTableRow from './CampaignTableRow';
import { CampaignData } from './campaignData';

interface CampaignTableProps {
  campaigns: CampaignData[];
  refreshList?: () => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, refreshList }) => {
  const [, setRefreshTable] = useState(0); // Used to force re-render when status changes

  const handleStatusChange = () => {
    setRefreshTable(prev => prev + 1); // Force re-render
    if (refreshList) refreshList();
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/20 border-b border-border">
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  Campaign Name
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Channels</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Leads</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Responses</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Team</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-muted-foreground">
                  No campaigns found
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <CampaignTableRow 
                  key={campaign.id}
                  campaign={campaign} 
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignTable;
