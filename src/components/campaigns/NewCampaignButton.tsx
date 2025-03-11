
import React from 'react';
import { Plus } from 'lucide-react';

interface NewCampaignButtonProps {
  onClick: () => void;
}

const NewCampaignButton: React.FC<NewCampaignButtonProps> = ({ onClick }) => {
  return (
    <button 
      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm shadow-sm hover:bg-primary/90 transition-colors"
      onClick={onClick}
    >
      <Plus className="h-4 w-4" />
      <span>New Campaign</span>
    </button>
  );
};

export default NewCampaignButton;
