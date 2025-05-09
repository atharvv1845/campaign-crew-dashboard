
import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CampaignFormData } from '../types/campaignTypes';
import { availableChannels } from '../constants/channels';

interface CampaignSetupProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
}

const CampaignSetup: React.FC<CampaignSetupProps> = ({ formData, setFormData, onNext }) => {
  const [customPlatform, setCustomPlatform] = useState('');
  const [showCustomPlatformInput, setShowCustomPlatformInput] = useState(false);

  // Handler for updating form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for toggling channels/platforms
  const toggleChannel = (channelId: string) => {
    setFormData(prev => {
      const channels = prev.channels.includes(channelId)
        ? prev.channels.filter(c => c !== channelId)
        : [...prev.channels, channelId];
      
      // Since channels and contactPlatforms are the same, update both
      return { 
        ...prev, 
        channels, 
        contactPlatforms: channels
      };
    });
  };

  // Handler for adding a custom platform
  const addCustomPlatform = () => {
    if (customPlatform.trim()) {
      const newPlatformId = customPlatform.toLowerCase().replace(/\s+/g, '-');
      
      // Add to both channels and contactPlatforms
      setFormData(prev => {
        const updatedChannels = [...prev.channels, newPlatformId];
        return { 
          ...prev, 
          channels: updatedChannels,
          contactPlatforms: updatedChannels,
          customPlatforms: [...(prev.customPlatforms || []), { id: newPlatformId, name: customPlatform }]
        };
      });
      
      // Reset the input
      setCustomPlatform('');
      setShowCustomPlatformInput(false);
    }
  };

  // Check if the form is valid
  const isValid = formData.name.trim() !== '' && formData.channels.length > 0;

  // Get all channels, including custom ones
  const allChannels = [
    ...availableChannels,
    ...(formData.customPlatforms || []).map(p => ({ id: p.id, name: p.name, icon: 'external-link' }))
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column - Form inputs */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Campaign Details</h3>
            
            {/* Campaign Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Campaign Name <span className="text-destructive">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Q2 Outreach Campaign"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              {formData.name.trim() === '' && (
                <p className="text-xs text-destructive">Name is required</p>
              )}
            </div>
            
            {/* Campaign Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                Description <span className="text-muted-foreground">(Optional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of this campaign's goals"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
              />
            </div>
          </div>
          
          {/* Combined Channel/Platform Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Contact Channels</h3>
            <p className="text-sm text-muted-foreground">Choose the channels you'll use to reach your leads</p>
            
            <div className="grid grid-cols-2 gap-3">
              {allChannels.map(channel => (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => toggleChannel(channel.id)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border border-border transition-colors",
                    formData.channels.includes(channel.id) 
                      ? "bg-primary/10 border-primary" 
                      : "hover:bg-muted/20"
                  )}
                >
                  <span>{channel.name}</span>
                  {formData.channels.includes(channel.id) && (
                    <span className="flex items-center justify-center w-5 h-5 bg-primary rounded-full text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </button>
              ))}
              
              {/* Custom Platform Add Button */}
              <button
                type="button"
                onClick={() => setShowCustomPlatformInput(true)}
                className="flex items-center justify-center p-3 rounded-lg border border-dashed border-border hover:bg-muted/10 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span>Add Custom Channel</span>
              </button>
            </div>
            
            {formData.channels.length === 0 && (
              <p className="text-xs text-destructive">Select at least one channel</p>
            )}
            
            {/* Custom Platform Input */}
            {showCustomPlatformInput && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={customPlatform}
                  onChange={(e) => setCustomPlatform(e.target.value)}
                  placeholder="Enter channel name (e.g., Slack)"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="button"
                  onClick={addCustomPlatform}
                  disabled={!customPlatform.trim()}
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomPlatformInput(false);
                    setCustomPlatform('');
                  }}
                  className="px-3 py-2 border border-border rounded-md hover:bg-muted/20"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right column - Preview */}
        <div className="bg-muted/20 rounded-lg p-4 space-y-4">
          <h3 className="text-md font-medium border-b border-border pb-2">Campaign Preview</h3>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Campaign Name:</span>
              <p className="text-sm">{formData.name || "Not specified"}</p>
            </div>
            
            <div>
              <span className="text-sm font-medium">Description:</span>
              <p className="text-sm line-clamp-3">{formData.description || "No description"}</p>
            </div>
            
            <div>
              <span className="text-sm font-medium">Selected Channels:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.channels.length === 0 ? (
                  <span className="text-sm text-muted-foreground">No channels selected</span>
                ) : (
                  formData.channels.map(channelId => {
                    const channel = allChannels.find(c => c.id === channelId);
                    return (
                      <span 
                        key={channelId}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {channel?.name}
                      </span>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-end pt-4 border-t border-border">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CampaignSetup;
