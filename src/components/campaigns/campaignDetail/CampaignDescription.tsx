
import React from 'react';

interface CampaignDescriptionProps {
  campaign: {
    description: string;
  };
}

const CampaignDescription: React.FC<CampaignDescriptionProps> = ({ campaign }) => {
  return (
    <p className="text-sm text-muted-foreground">{campaign.description}</p>
  );
};

export default CampaignDescription;
