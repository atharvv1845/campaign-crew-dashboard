
import React, { useState } from 'react';
import { ArrowUpDown, FileText } from 'lucide-react';
import CampaignTableRow from './CampaignTableRow';
import { CampaignData } from './campaignData';

interface CampaignTableProps {
  campaigns: CampaignData[];
  refreshList?: () => void;
  onCampaignClick?: (campaignId: string | number) => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, refreshList, onCampaignClick }) => {
  const [, setRefreshTable] = useState(0); // Used to force re-render when status changes

  const handleStatusChange = () => {
    setRefreshTable(prev => prev + 1); // Force re-render
    if (refreshList) refreshList();
  };

  const handleRowClick = (campaignId: string | number) => {
    if (onCampaignClick) {
      onCampaignClick(campaignId);
    }
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
                <td colSpan={8} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 text-muted-foreground">
                    <FileText className="h-10 w-10 opacity-40" />
                    <div className="text-sm">No campaigns found</div>
                    <div className="text-xs max-w-xs text-center">
                      Create your first campaign by clicking the "Create Campaign" button above.
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <CampaignTableRow 
                  key={campaign.id}
                  campaign={campaign} 
                  onStatusChange={handleStatusChange}
                  onRowClick={() => handleRowClick(campaign.id)}
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
