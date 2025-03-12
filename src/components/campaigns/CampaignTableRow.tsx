
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignStatusBadge from './CampaignStatusBadge';
import ChannelBadge from './ChannelBadge';
import CampaignRowActions from './CampaignRowActions';
import { CampaignData } from './campaignData';

interface CampaignTableRowProps {
  campaign: CampaignData;
  onStatusChange: () => void;
}

const CampaignTableRow: React.FC<CampaignTableRowProps> = ({ campaign, onStatusChange }) => {
  const navigate = useNavigate();
  
  const handleCampaignClick = () => {
    navigate(`/campaigns/${campaign.id}`);
  };

  const handleRowClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking on action buttons
    if ((e.target as HTMLElement).closest('.campaign-action')) {
      return;
    }
    handleCampaignClick();
  };

  return (
    <tr 
      key={campaign.id}
      className="hover:bg-muted/20 transition-colors cursor-pointer"
      onClick={handleRowClick}
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
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm campaign-action">
        <CampaignRowActions 
          campaign={campaign} 
          onStatusChange={onStatusChange}
        />
      </td>
    </tr>
  );
};

export default CampaignTableRow;
