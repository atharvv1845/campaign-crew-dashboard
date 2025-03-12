
import React from 'react';
import { 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  PauseOctagon, 
  Play
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from "@/hooks/use-toast";
import { CampaignData, campaignData } from './campaignData';

interface CampaignRowActionsProps {
  campaign: CampaignData;
  onStatusChange: () => void;
}

const CampaignRowActions: React.FC<CampaignRowActionsProps> = ({ campaign, onStatusChange }) => {
  const { toast } = useToast();

  // Handle campaign actions
  const handleEditCampaign = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, you'd open an edit form
    toast({
      title: 'Edit Campaign',
      description: 'Campaign editing will be implemented in a future update.',
    });
  };

  const handleDeleteCampaign = (e: React.MouseEvent) => {
    e.stopPropagation();
    const index = campaignData.findIndex(c => c.id === campaign.id);
    if (index !== -1) {
      const campaignName = campaignData[index].name;
      campaignData.splice(index, 1);
      toast({
        title: 'Campaign Deleted',
        description: `${campaignName} has been deleted.`,
      });
    }
  };

  const handlePauseCampaign = (e: React.MouseEvent) => {
    e.stopPropagation();
    const foundCampaign = campaignData.find(c => c.id === campaign.id);
    if (foundCampaign) {
      foundCampaign.status = 'Paused';
      toast({
        title: 'Campaign Paused',
        description: `${foundCampaign.name} has been paused.`,
      });
      onStatusChange();
    }
  };

  const handleResumeCampaign = (e: React.MouseEvent) => {
    e.stopPropagation();
    const foundCampaign = campaignData.find(c => c.id === campaign.id);
    if (foundCampaign) {
      foundCampaign.status = 'Active';
      toast({
        title: 'Campaign Resumed',
        description: `${foundCampaign.name} has been resumed.`,
      });
      onStatusChange();
    }
  };

  const handleStopCampaign = (e: React.MouseEvent) => {
    e.stopPropagation();
    const foundCampaign = campaignData.find(c => c.id === campaign.id);
    if (foundCampaign) {
      foundCampaign.status = 'Stopped';
      toast({
        title: 'Campaign Stopped',
        description: `${foundCampaign.name} has been stopped.`,
      });
      onStatusChange();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <button 
          className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/20 transition-colors"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEditCampaign}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        
        {campaign.status === 'Active' ? (
          <DropdownMenuItem onClick={handlePauseCampaign}>
            <PauseOctagon className="h-4 w-4 mr-2" />
            Pause
          </DropdownMenuItem>
        ) : campaign.status === 'Paused' ? (
          <DropdownMenuItem onClick={handleResumeCampaign}>
            <Play className="h-4 w-4 mr-2" />
            Resume
          </DropdownMenuItem>
        ) : null}
        
        {campaign.status !== 'Stopped' && (
          <DropdownMenuItem onClick={handleStopCampaign}>
            <PauseOctagon className="h-4 w-4 mr-2" />
            Stop
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleDeleteCampaign}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CampaignRowActions;
