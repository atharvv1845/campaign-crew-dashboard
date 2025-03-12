
import React from 'react';
import MessageSequence from '../MessageSequence';

interface MessagesTabProps {
  campaign: any;
  updateCampaign?: (data: any) => void;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ campaign, updateCampaign }) => {
  return (
    <div className="space-y-6">
      <MessageSequence campaign={campaign} updateCampaign={updateCampaign} />
    </div>
  );
};

export default MessagesTab;
