
import React from 'react';
import { ArrowLeft, Edit, Trash2, PauseOctagon, Play, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CampaignStatusBadge from '../CampaignStatusBadge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from "@/hooks/use-toast";
import { campaignData } from '../campaignData';

interface CampaignHeaderProps {
  campaign: any;
  onEdit?: () => void;
  onEditCampaign?: () => void; // Added for compatibility
  onExportCampaign?: () => void;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ 
  campaign, 
  onEdit, 
  onEditCampaign, 
  onExportCampaign 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleGoBack = () => {
    navigate('/campaigns');
  };
  
  const handleDeleteCampaign = () => {
    const index = campaignData.findIndex(c => c.id === campaign.id);
    if (index !== -1) {
      const campaignName = campaignData[index].name;
      campaignData.splice(index, 1);
      toast({
        title: 'Campaign Deleted',
        description: `${campaignName} has been deleted.`,
      });
      navigate('/campaigns');
    }
  };

  const handlePauseCampaign = () => {
    campaign.status = 'Paused';
    toast({
      title: 'Campaign Paused',
      description: `${campaign.name} has been paused.`,
    });
  };

  const handleResumeCampaign = () => {
    campaign.status = 'Active';
    toast({
      title: 'Campaign Resumed',
      description: `${campaign.name} has been resumed.`,
    });
  };

  const handleStopCampaign = () => {
    campaign.status = 'Stopped';
    toast({
      title: 'Campaign Stopped',
      description: `${campaign.name} has been stopped.`,
    });
  };

  // Use either onEdit or onEditCampaign, preferring onEditCampaign if both are provided
  const handleEdit = onEditCampaign || onEdit;
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={handleGoBack}
          className="p-2 rounded-full hover:bg-muted/20 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{campaign.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <CampaignStatusBadge status={campaign.status} />
            <span className="text-sm text-muted-foreground">Created {campaign.createdAt}</span>
          </div>
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors flex items-center gap-2">
            <span>Actions</span>
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Campaign
          </DropdownMenuItem>
          
          {campaign.status === 'Active' ? (
            <DropdownMenuItem onClick={handlePauseCampaign}>
              <PauseOctagon className="h-4 w-4 mr-2" />
              Pause Campaign
            </DropdownMenuItem>
          ) : campaign.status === 'Paused' ? (
            <DropdownMenuItem onClick={handleResumeCampaign}>
              <Play className="h-4 w-4 mr-2" />
              Resume Campaign
            </DropdownMenuItem>
          ) : null}
          
          {campaign.status !== 'Stopped' && (
            <DropdownMenuItem onClick={handleStopCampaign}>
              <PauseOctagon className="h-4 w-4 mr-2" />
              Stop Campaign
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleDeleteCampaign}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Campaign
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CampaignHeader;
