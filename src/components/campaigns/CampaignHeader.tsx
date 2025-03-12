
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CampaignHeaderProps {
  onCreateCampaign: () => void;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ onCreateCampaign }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Campaign Management</h1>
      <Button 
        onClick={onCreateCampaign}
        className="gap-2"
      >
        <PlusCircle className="h-4 w-4" />
        Create Campaign
      </Button>
    </div>
  );
};

export default CampaignHeader;
