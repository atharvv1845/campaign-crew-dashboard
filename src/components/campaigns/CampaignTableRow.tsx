
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignStatusBadge from './CampaignStatusBadge';
import CampaignRowActions from './CampaignRowActions';
import ChannelBadge from './ChannelBadge';

interface CampaignTableRowProps {
  campaign: any;
  onStatusChange: () => void;
}

const CampaignTableRow: React.FC<CampaignTableRowProps> = ({ campaign, onStatusChange }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    // Navigate to campaign detail page with the specific campaign ID
    if (campaign && campaign.id) {
      navigate(`/campaigns/${campaign.id}`);
    }
  };

  const handleNameClick = (e: React.MouseEvent) => {
    // Prevent the row click event from firing
    e.stopPropagation();
    // Navigate to campaign detail page
    if (campaign && campaign.id) {
      navigate(`/campaigns/${campaign.id}`);
    }
  };

  // Make sure all campaign data has default values to prevent errors
  const safeCampaign = {
    ...campaign,
    channels: campaign.channels || [],
    teamMembers: campaign.teamMembers || [],
    createdAt: campaign.createdAt || ''
  };

  return (
    <tr 
      className="border-b border-border hover:bg-muted/40 cursor-pointer transition-colors"
      onClick={handleRowClick}
    >
      <td className="p-4">
        <button 
          onClick={handleNameClick}
          className="font-medium text-primary hover:underline text-left"
        >
          {safeCampaign.name}
        </button>
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
      <td className="p-4">{safeCampaign.leads}</td>
      <td className="p-4">{safeCampaign.responses}</td>
      <td className="p-4">
        <div className="flex items-center gap-1">
          {safeCampaign.teamMembers && safeCampaign.teamMembers.map((member: string, index: number) => (
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
