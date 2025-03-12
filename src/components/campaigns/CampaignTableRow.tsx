
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
    navigate(`/campaigns/${campaign.id}`);
  };

  return (
    <tr 
      className="border-b border-border hover:bg-muted/40 cursor-pointer transition-colors"
      onClick={handleRowClick}
    >
      <td className="p-4">
        <span className="font-medium text-primary">{campaign.name}</span>
      </td>
      <td className="p-4">
        <CampaignStatusBadge status={campaign.status} />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-1">
          {campaign.channels?.map((channel: string, index: number) => (
            <ChannelBadge key={`${channel}-${index}`} channel={channel} />
          ))}
        </div>
      </td>
      <td className="p-4">{campaign.leads || 0}</td>
      <td className="p-4">{campaign.responses || 0}</td>
      <td className="p-4">
        <div className="flex items-center gap-1">
          {campaign.teamMembers?.map((member: string, index: number) => (
            <span key={index} className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
              {member.substring(0, 2)}
            </span>
          ))}
        </div>
      </td>
      <td className="p-4">{campaign.createdAt}</td>
      <td className="p-4">
        <CampaignRowActions campaign={campaign} onStatusChange={onStatusChange} />
      </td>
    </tr>
  );
};

export default CampaignTableRow;
