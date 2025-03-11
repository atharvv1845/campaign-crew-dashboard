
import React, { useState } from 'react';
import { CampaignFormData, availableChannels } from '../CreateCampaign';
import { ChevronDown, ChevronRight, Check, Download, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewLaunchProps {
  formData: CampaignFormData;
  onSubmit: () => void;
  onBack: () => void;
}

const ReviewLaunch: React.FC<ReviewLaunchProps> = ({ formData, onSubmit, onBack }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['details']);
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };
  
  // Check if a section is expanded
  const isSectionExpanded = (section: string) => {
    return expandedSections.includes(section);
  };
  
  // Get channel names for display
  const getChannelNames = () => {
    return formData.channels
      .map(id => availableChannels.find(channel => channel.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };
  
  // Mock team members data (normally this would come from a database)
  const getTeamMemberNames = (memberIds: string[]) => {
    const mockTeamMembers: Record<string, string> = {
      'user1': 'John Smith',
      'user2': 'Sarah Lee',
      'user3': 'Alex Chen',
      'user4': 'Mia Johnson',
      'user5': 'David Kim',
    };
    
    return memberIds.map(id => mockTeamMembers[id] || id).join(', ');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Review & Launch Campaign</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Review all the details of your campaign before launching it. Click on any section to edit if needed.
        </p>
        
        {/* Campaign Details Section */}
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <button
            onClick={() => toggleSection('details')}
            className="flex items-center justify-between w-full p-4 text-left font-medium text-sm bg-muted/10 hover:bg-muted/20 border-b border-border"
          >
            <span>Campaign Details</span>
            {isSectionExpanded('details') ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          
          {isSectionExpanded('details') && (
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Campaign Name</p>
                  <p className="text-sm font-medium">{formData.name}</p>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Outreach Channels</p>
                  <p className="text-sm font-medium">{getChannelNames()}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Description</p>
                <p className="text-sm">{formData.description || 'No description provided.'}</p>
              </div>
              
              <div className="flex justify-end">
                <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80">
                  <Check className="h-3 w-3" />
                  <span>All details look good</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Lead Stages Section */}
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <button
            onClick={() => toggleSection('stages')}
            className="flex items-center justify-between w-full p-4 text-left font-medium text-sm bg-muted/10 hover:bg-muted/20 border-b border-border"
          >
            <span>Lead Stages ({formData.stages.length})</span>
            {isSectionExpanded('stages') ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          
          {isSectionExpanded('stages') && (
            <div className="p-4">
              <div className="space-y-2">
                {formData.stages.map(stage => (
                  <div 
                    key={stage.id}
                    className="flex items-center gap-2 py-1 border-b border-border/50 last:border-b-0"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted/20 text-xs">
                      {stage.order}
                    </span>
                    <span className="text-sm">{stage.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end mt-3">
                <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80">
                  <Check className="h-3 w-3" />
                  <span>All stages look good</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Team Assignments Section */}
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <button
            onClick={() => toggleSection('team')}
            className="flex items-center justify-between w-full p-4 text-left font-medium text-sm bg-muted/10 hover:bg-muted/20 border-b border-border"
          >
            <span>Team Assignments</span>
            {isSectionExpanded('team') ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          
          {isSectionExpanded('team') && (
            <div className="p-4">
              <div className="space-y-3">
                {formData.channels.map(channelId => {
                  const channel = availableChannels.find(c => c.id === channelId);
                  const assignedMembers = formData.teamAssignments[channelId] || [];
                  
                  return (
                    <div 
                      key={channelId}
                      className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0"
                    >
                      <span className="text-sm font-medium">{channel?.name}</span>
                      <span className="text-sm">
                        {assignedMembers.length > 0 
                          ? getTeamMemberNames(assignedMembers)
                          : 'No team members assigned'}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-end mt-3">
                <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80">
                  <Check className="h-3 w-3" />
                  <span>All assignments look good</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Messages Section */}
        <div className="border border-border rounded-lg overflow-hidden mb-4">
          <button
            onClick={() => toggleSection('messages')}
            className="flex items-center justify-between w-full p-4 text-left font-medium text-sm bg-muted/10 hover:bg-muted/20 border-b border-border"
          >
            <span>Message Templates</span>
            {isSectionExpanded('messages') ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          
          {isSectionExpanded('messages') && (
            <div className="p-4 space-y-4">
              {formData.channels.map(channelId => {
                const channel = availableChannels.find(c => c.id === channelId);
                const message = formData.messages[channelId] || '';
                
                return (
                  <div key={channelId} className="space-y-1">
                    <p className="text-xs text-muted-foreground">{channel?.name} Template</p>
                    <div className="bg-muted/10 p-3 rounded-md">
                      {message ? (
                        <p className="text-sm whitespace-pre-wrap break-words">{message}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No template provided</p>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {formData.notes && (
                <div className="space-y-1 pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">Internal Notes</p>
                  <div className="bg-muted/10 p-3 rounded-md">
                    <p className="text-sm whitespace-pre-wrap break-words">{formData.notes}</p>
                    {formData.shareNotes && (
                      <p className="text-xs text-primary mt-1">Visible to all team members</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end mt-2">
                <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80">
                  <Check className="h-3 w-3" />
                  <span>All messages look good</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
          >
            Back
          </button>
          
          <button 
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Save Template</span>
          </button>
        </div>
        
        <button
          onClick={onSubmit}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Rocket className="h-4 w-4" />
          <span>Launch Campaign</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewLaunch;
