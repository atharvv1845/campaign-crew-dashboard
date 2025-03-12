
import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { CampaignFormData } from '../types/campaignTypes';
import { availableChannels } from '../constants/channels';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ReviewLaunchProps {
  formData: CampaignFormData;
  onSubmit: () => void;
  onBack: () => void;
}

export const ReviewLaunch: React.FC<ReviewLaunchProps> = ({ formData, onSubmit, onBack }) => {
  // Check if all required sections are complete
  const isSetupComplete = formData.name.trim() !== '' && formData.channels.length > 0;
  const isLeadsComplete = formData.leads && formData.leads.length > 0;
  const isMessagesComplete = formData.messageFlow && formData.messageFlow.nodes.length > 0;
  const isStagesComplete = formData.stages && formData.stages.length > 0;
  const isTeamComplete = formData.team && formData.team.length > 0;
  
  // Check if campaign is ready to launch
  const isReadyToLaunch = isSetupComplete && isLeadsComplete && isMessagesComplete && isStagesComplete && isTeamComplete;

  // Get channel names from IDs
  const getChannelNames = () => {
    return formData.channels.map(channelId => {
      const channel = availableChannels.find(c => c.id === channelId);
      return channel ? channel.name : channelId;
    }).join(', ');
  };

  const handleSubmit = () => {
    console.log("Submitting campaign with data:", formData);
    
    // Check if leads exist and have required fields, including Google sheet imported leads
    if (!formData.leads || formData.leads.length === 0) {
      toast({
        title: "Warning",
        description: "No leads found. Please import or add leads before launching.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate that each lead has required fields
    const invalidLeads = formData.leads.filter(lead => 
      !lead.firstName || !lead.email
    );
    
    if (invalidLeads.length > 0) {
      toast({
        title: "Warning",
        description: `${invalidLeads.length} leads are missing required fields (name or email).`,
        variant: "destructive"
      });
      return;
    }
    
    // Validate the message flow
    if (!formData.messageFlow || !formData.messageFlow.nodes || formData.messageFlow.nodes.length === 0) {
      toast({
        title: "Warning",
        description: "No message flow found. Please add at least one message step.",
        variant: "destructive"
      });
      return;
    }
    
    // Proceed with submission
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Review & Launch</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Review your campaign details before launching
        </p>
      </div>

      <div className="bg-muted/20 rounded-lg p-6 space-y-6">
        {/* Campaign Overview */}
        <div>
          <h4 className="text-base font-medium">Campaign Overview</h4>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium">Name:</span>
              <p className="text-sm">{formData.name}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Channels:</span>
              <p className="text-sm">{getChannelNames()}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Description:</span>
              <p className="text-sm line-clamp-2">{formData.description || "No description"}</p>
            </div>
          </div>
        </div>

        {/* Completion Status */}
        <div className="space-y-3 border-t border-border pt-4">
          <h4 className="text-base font-medium">Completion Status</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              {isSetupComplete ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
              <span className="text-sm">Campaign Setup</span>
            </div>
            
            <div className="flex items-center gap-2">
              {isLeadsComplete ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
              <span className="text-sm">Leads Import ({formData.leads?.length || 0} leads)</span>
            </div>
            
            <div className="flex items-center gap-2">
              {isMessagesComplete ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
              <span className="text-sm">Message Flow ({formData.messageFlow?.nodes.length || 0} steps)</span>
            </div>
            
            <div className="flex items-center gap-2">
              {isStagesComplete ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
              <span className="text-sm">Lead Stages ({formData.stages?.length || 0} stages)</span>
            </div>
            
            <div className="flex items-center gap-2">
              {isTeamComplete ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
              <span className="text-sm">Team Assignment ({formData.team?.length || 0} members)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Launch Warning */}
      {!isReadyToLaunch && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 mt-0.5" />
          <div>
            <h5 className="font-medium">Campaign not ready</h5>
            <p className="text-sm mt-1">
              Some sections are incomplete. You can still save as draft, but you won't be able to launch until all sections are complete.
            </p>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        
        <Button onClick={handleSubmit}>
          {isReadyToLaunch ? 'Launch Campaign' : 'Save as Draft'}
        </Button>
      </div>
    </div>
  );
};

export default ReviewLaunch;
