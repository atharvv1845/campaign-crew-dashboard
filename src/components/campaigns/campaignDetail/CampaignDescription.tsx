
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Check, X } from 'lucide-react';

interface CampaignDescriptionProps {
  campaign: {
    description: string;
  };
  updateCampaign?: (data: any) => void;
}

const CampaignDescription: React.FC<CampaignDescriptionProps> = ({ campaign, updateCampaign }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(campaign.description || '');

  const handleSave = () => {
    if (updateCampaign) {
      updateCampaign({ description });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(campaign.description || '');
    setIsEditing(false);
  };

  return (
    <div className="relative group">
      {isEditing ? (
        <div className="space-y-2">
          <Textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Check className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <p className="text-sm text-muted-foreground">
            {campaign.description || 'No description provided.'}
          </p>
          {updateCampaign && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CampaignDescription;
