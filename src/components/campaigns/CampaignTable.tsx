
import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  PauseOctagon, 
  Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CampaignStatusBadge from './CampaignStatusBadge';
import ChannelBadge from './ChannelBadge';
import { CampaignData, campaignData } from './campaignData';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from "@/hooks/use-toast";

interface CampaignTableProps {
  campaigns: CampaignData[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCampaignClick = (campaignId: number) => {
    navigate(`/campaigns/${campaignId}`);
  };

  // Handle campaign actions
  const handleEditCampaign = (e: React.MouseEvent, campaignId: number) => {
    e.stopPropagation();
    // In a real app, you'd open an edit form
    toast({
      title: 'Edit Campaign',
      description: 'Campaign editing will be implemented in a future update.',
    });
  };

  const handleDeleteCampaign = (e: React.MouseEvent, campaignId: number) => {
    e.stopPropagation();
    const index = campaignData.findIndex(c => c.id === campaignId);
    if (index !== -1) {
      const campaignName = campaignData[index].name;
      campaignData.splice(index, 1);
      toast({
        title: 'Campaign Deleted',
        description: `${campaignName} has been deleted.`,
      });
    }
  };

  const handlePauseCampaign = (e: React.MouseEvent, campaignId: number) => {
    e.stopPropagation();
    const campaign = campaignData.find(c => c.id === campaignId);
    if (campaign) {
      campaign.status = 'Paused';
      toast({
        title: 'Campaign Paused',
        description: `${campaign.name} has been paused.`,
      });
    }
  };

  const handleResumeCampaign = (e: React.MouseEvent, campaignId: number) => {
    e.stopPropagation();
    const campaign = campaignData.find(c => c.id === campaignId);
    if (campaign) {
      campaign.status = 'Active';
      toast({
        title: 'Campaign Resumed',
        description: `${campaign.name} has been resumed.`,
      });
    }
  };

  const handleStopCampaign = (e: React.MouseEvent, campaignId: number) => {
    e.stopPropagation();
    const campaign = campaignData.find(c => c.id === campaignId);
    if (campaign) {
      campaign.status = 'Stopped';
      toast({
        title: 'Campaign Stopped',
        description: `${campaign.name} has been stopped.`,
      });
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/20 transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => handleEditCampaign(e, campaign.id)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      
                      {campaign.status === 'Active' ? (
                        <DropdownMenuItem onClick={(e) => handlePauseCampaign(e, campaign.id)}>
                          <PauseOctagon className="h-4 w-4 mr-2" />
                          Pause
                        </DropdownMenuItem>
                      ) : campaign.status === 'Paused' ? (
                        <DropdownMenuItem onClick={(e) => handleResumeCampaign(e, campaign.id)}>
                          <Play className="h-4 w-4 mr-2" />
                          Resume
                        </DropdownMenuItem>
                      ) : null}
                      
                      {campaign.status !== 'Stopped' && (
                        <DropdownMenuItem onClick={(e) => handleStopCampaign(e, campaign.id)}>
                          <PauseOctagon className="h-4 w-4 mr-2" />
                          Stop
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        onClick={(e) => handleDeleteCampaign(e, campaign.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
