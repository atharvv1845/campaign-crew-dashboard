
import React from 'react';
import { CampaignFormData, availableChannels } from '../CreateCampaign';

interface MessageSequenceProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

const MessageSequence: React.FC<MessageSequenceProps> = ({ formData, setFormData, onNext, onBack }) => {
  // Update message for a channel
  const updateMessage = (channelId: string, message: string) => {
    setFormData(prev => ({
      ...prev,
      messages: {
        ...prev.messages,
        [channelId]: message
      }
    }));
  };

  // Update general notes
  const updateNotes = (notes: string) => {
    setFormData(prev => ({
      ...prev,
      notes
    }));
  };

  // Toggle sharing notes
  const toggleShareNotes = () => {
    setFormData(prev => ({
      ...prev,
      shareNotes: !prev.shareNotes
    }));
  };

  // Get character limit based on channel
  const getCharacterLimit = (channelId: string) => {
    switch (channelId) {
      case 'twitter':
        return 280;
      case 'whatsapp':
        return 1000;
      case 'linkedin':
        return 2000;
      default:
        return null;
    }
  };

  // Calculate remaining characters
  const getRemainingCharacters = (channelId: string) => {
    const limit = getCharacterLimit(channelId);
    if (!limit) return null;
    
    const message = formData.messages[channelId] || '';
    return limit - message.length;
  };

  // Selected channels from previous step
  const selectedChannels = availableChannels.filter(channel => 
    formData.channels.includes(channel.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Message Sequence & Notes</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create message templates for each channel. These will be available when you send messages to leads.
        </p>
        
        {/* Message templates */}
        <div className="space-y-4">
          {selectedChannels.map(channel => {
            const message = formData.messages[channel.id] || '';
            const charLimit = getCharacterLimit(channel.id);
            const remainingChars = getRemainingCharacters(channel.id);
            
            return (
              <div key={channel.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">{channel.name} Template</h4>
                  {remainingChars !== null && (
                    <span className={`text-xs ${remainingChars < 20 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {remainingChars} characters remaining
                    </span>
                  )}
                </div>
                
                {channel.id === 'email' ? (
                  // Rich text editor for email (simplified version)
                  <div className="border border-border rounded-md overflow-hidden">
                    <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/10">
                      <button className="p-1 rounded hover:bg-muted/30">B</button>
                      <button className="p-1 rounded hover:bg-muted/30">I</button>
                      <button className="p-1 rounded hover:bg-muted/30">U</button>
                      <button className="p-1 rounded hover:bg-muted/30">Link</button>
                    </div>
                    <textarea
                      value={message}
                      onChange={e => updateMessage(channel.id, e.target.value)}
                      placeholder={`Enter your ${channel.name} message template...`}
                      className="w-full p-3 min-h-[150px] focus:outline-none focus:ring-0 resize-none"
                    />
                  </div>
                ) : (
                  // Regular text area for other channels
                  <textarea
                    value={message}
                    onChange={e => updateMessage(channel.id, e.target.value)}
                    placeholder={`Enter your ${channel.name} message template...`}
                    className="w-full p-3 border border-border rounded-md min-h-[100px] focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                    maxLength={charLimit || undefined}
                  />
                )}
                
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    Use <span className="font-mono">[name]</span>, <span className="font-mono">[company]</span>, etc. as placeholders for personalization.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Internal notes */}
        <div className="mt-6 border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">Internal Notes (For Team Members)</h4>
          <textarea
            value={formData.notes}
            onChange={e => updateNotes(e.target.value)}
            placeholder="Add notes about campaign strategy, follow-up procedures, etc."
            className="w-full p-3 border border-border rounded-md min-h-[100px] focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
          />
          
          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="shareNotes"
              checked={formData.shareNotes}
              onChange={toggleShareNotes}
              className="h-4 w-4 rounded border-gray-300 focus:ring-primary"
            />
            <label htmlFor="shareNotes" className="text-sm">
              Make these notes visible to all team members
            </label>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t border-border">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MessageSequence;
