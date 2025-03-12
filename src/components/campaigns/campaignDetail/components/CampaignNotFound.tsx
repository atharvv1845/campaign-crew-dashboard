
import React from 'react';

const CampaignNotFound: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <h3 className="text-lg font-medium">Campaign not found</h3>
        <p className="text-muted-foreground">The campaign you're looking for doesn't exist or has been removed.</p>
      </div>
    </div>
  );
};

export default CampaignNotFound;
