
import React from 'react';
import { Plus } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface NewCampaignButtonProps {
  onClick: () => void;
}

const NewCampaignButton: React.FC<NewCampaignButtonProps> = ({ onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm shadow-sm hover:bg-primary/90 transition-colors"
            onClick={onClick}
          >
            <Plus className="h-4 w-4" />
            <span>New Campaign</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create a new outreach campaign</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NewCampaignButton;
