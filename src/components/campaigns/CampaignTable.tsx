
import React from 'react';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CampaignStatusBadge from './CampaignStatusBadge';
import ChannelBadge from './ChannelBadge';
import { CampaignData } from './campaignData';

interface CampaignTableProps {
  campaigns: CampaignData[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const navigate = useNavigate();
  
  const handleCampaignClick = (campaignId: number) => {
    navigate(`/campaigns/${campaignId}`);
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
            {campaigns.map((campaign) => (
              <tr 
                key={campaign.id}
                className="hover:bg-muted/20 transition-colors cursor-pointer"
                onClick={() => handleCampaignClick(campaign.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{campaign.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CampaignStatusBadge status={campaign.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {campaign.channels.map((channel, idx) => (
                      <ChannelBadge key={idx} channel={channel} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{campaign.leads.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{campaign.responses.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  {campaign.teamMembers.length > 0 
                    ? campaign.teamMembers.length > 1 
                      ? `${campaign.teamMembers[0]} +${campaign.teamMembers.length - 1}`
                      : campaign.teamMembers[0]
                    : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{campaign.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button 
                    className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/20 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Open options menu
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignTable;
