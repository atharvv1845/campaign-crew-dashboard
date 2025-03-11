
import React from 'react';

interface CampaignDescriptionProps {
  description: string;
}

const CampaignDescription: React.FC<CampaignDescriptionProps> = ({ description }) => {
  return (
    <p className="text-sm text-muted-foreground">{description}</p>
  );
};

export default CampaignDescription;
