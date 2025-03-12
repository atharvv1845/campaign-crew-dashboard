
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignStatusBadge from './CampaignStatusBadge';
import CampaignRowActions from './CampaignRowActions';
import ChannelBadge from './ChannelBadge';

interface CampaignTableRowProps {
  campaign: any;
  onStatusChange: () => void;
  onRowClick?: () => void;
}

const CampaignTableRow: React.FC<CampaignTableRowProps> = ({ campaign, onStatusChange, onRowClick }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    if (onRowClick) {
      onRowClick();
    } else if (campaign?.id) {
      console.log("Navigating to campaign details:", campaign.id, "with data:", campaign);
      navigate(`/campaigns/${campaign.id}`);
    }
  };

  // Make sure all campaign data has default values to prevent errors
  const safeCampaign = {
    ...campaign,
    name: campaign?.name || 'Untitled Campaign',
    channels: campaign?.channels || [],
    teamMembers: campaign?.teamMembers || [],
    createdAt: campaign?.createdAt || new Date().toISOString().slice(0, 10),
    leads: campaign?.leads || 0,
    responses: campaign?.responses || 0,
    positive: campaign?.positive || 0,
    negative: campaign?.negative || 0,
    conversion: campaign?.conversion || '0%',
    stages: campaign?.stages || []
  };

  return (
    <tr 
      className="border-b border-border hover:bg-muted/40 cursor-pointer transition-colors"
      onClick={handleRowClick}
    >
      <td className="p-4">
        <span className="font-medium text-primary">{safeCampaign.name}</span>
      </td>
      <td className="p-4">
        <CampaignStatusBadge status={safeCampaign.status} />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-1">
          {safeCampaign.channels.map((channel: string, index: number) => (
            <ChannelBadge key={`${channel}-${index}`} channel={channel} />
          ))}
        </div>
      </td>
      <td className="p-4">{safeCampaign.leads || 0}</td>
      <td className="p-4">{safeCampaign.responses || 0}</td>
      <td className="p-4">
        <div className="flex items-center gap-1">
          {safeCampaign.teamMembers.map((member: string, index: number) => (
            <span key={index} className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
              {member.substring(0, 2)}
            </span>
          ))}
        </div>
      </td>
      <td className="p-4">{safeCampaign.createdAt}</td>
      <td className="p-4">
        <CampaignRowActions campaign={safeCampaign} onStatusChange={onStatusChange} />
      </td>
    </tr>
  );
};

export default CampaignTableRow;
