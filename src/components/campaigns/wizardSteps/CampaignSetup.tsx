
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CampaignFormData } from '../types/campaignTypes';
import { availableChannels } from '../constants/channels';

// Available contact platforms
const availablePlatforms = [
  { id: 'email', name: 'Email', icon: 'mail' },
  { id: 'phone', name: 'Phone', icon: 'phone' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
  { id: 'twitter', name: 'Twitter', icon: 'twitter' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram' },
  { id: 'facebook', name: 'Facebook', icon: 'facebook' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'message-circle' },
];

interface CampaignSetupProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
}

const CampaignSetup: React.FC<CampaignSetupProps> = ({ formData, setFormData, onNext }) => {
  // Handler for updating form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for toggling channels
  const toggleChannel = (channelId: string) => {
    setFormData(prev => {
      const channels = prev.channels.includes(channelId)
        ? prev.channels.filter(c => c !== channelId)
        : [...prev.channels, channelId];
      
      return { ...prev, channels };
    });
  };

  // Handler for toggling contact platforms
  const togglePlatform = (platformId: string) => {
    setFormData(prev => {
      const contactPlatforms = prev.contactPlatforms?.includes(platformId)
        ? prev.contactPlatforms.filter(p => p !== platformId)
        : [...(prev.contactPlatforms || []), platformId];
      
      return { ...prev, contactPlatforms };
    });
  };

  // Check if the form is valid
  const isValid = formData.name.trim() !== '' && formData.channels.length > 0;

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
          
          {/* Channel Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Outreach Channels</h3>
            <p className="text-sm text-muted-foreground">Choose the channels you'll use for this campaign</p>
            
            <div className="grid grid-cols-2 gap-3">
              {availableChannels.map(channel => (
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
            </div>
            {formData.channels.length === 0 && (
              <p className="text-xs text-destructive">Select at least one channel</p>
            )}
          </div>

          {/* Contact Platform Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Contact Platforms</h3>
            <p className="text-sm text-muted-foreground">Choose the platforms you'll use to contact leads</p>
            
            <div className="grid grid-cols-2 gap-3">
              {availablePlatforms.map(platform => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => togglePlatform(platform.id)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border border-border transition-colors",
                    formData.contactPlatforms?.includes(platform.id) 
                      ? "bg-primary/10 border-primary" 
                      : "hover:bg-muted/20"
                  )}
                >
                  <span>{platform.name}</span>
                  {formData.contactPlatforms?.includes(platform.id) && (
                    <span className="flex items-center justify-center w-5 h-5 bg-primary rounded-full text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </button>
              ))}
            </div>
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
                    const channel = availableChannels.find(c => c.id === channelId);
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

            <div>
              <span className="text-sm font-medium">Contact Platforms:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {!formData.contactPlatforms || formData.contactPlatforms.length === 0 ? (
                  <span className="text-sm text-muted-foreground">No platforms selected</span>
                ) : (
                  formData.contactPlatforms.map(platformId => {
                    const platform = availablePlatforms.find(p => p.id === platformId);
                    return (
                      <span 
                        key={platformId}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {platform?.name}
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
