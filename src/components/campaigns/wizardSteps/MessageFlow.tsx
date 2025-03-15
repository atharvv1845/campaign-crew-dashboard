
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CampaignFormData } from '../types/campaignTypes';
import OutreachFlowSelector from './OutreachFlowSelector';

interface MessageFlowProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

const MessageFlow: React.FC<MessageFlowProps> = ({
  formData,
  setFormData,
  onNext,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<string>("flowSelector");
  
  // Handler for selecting an outreach flow
  const handleSelectFlow = (flowId: number | null) => {
    setFormData(prev => ({
      ...prev,
      outreachFlowId: flowId
    }));
  };
  
  // Handler for editing a flow
  const handleEditFlow = (flowId: number) => {
    // In a real app, this would navigate to the messaging section
    // with the selected flow loaded for editing
    window.open(`/messaging?tab=flow&flowId=${flowId}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column - Message flow selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Outreach Sequence</h3>
          <p className="text-sm text-muted-foreground">
            Select an existing outreach flow or create a new one for this campaign.
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="flowSelector">Select Flow</TabsTrigger>
              <TabsTrigger value="templateMessages">Template Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="flowSelector">
              <OutreachFlowSelector
                selectedFlowId={formData.outreachFlowId || null}
                onSelectFlow={handleSelectFlow}
                onEditFlow={handleEditFlow}
              />
            </TabsContent>
            
            <TabsContent value="templateMessages">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">
                  You can select individual message templates to use in your campaign.
                  Visit the Messaging section to create and manage message templates.
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => window.open('/messaging?tab=templates', '_blank')}
                >
                  Manage Message Templates
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right column - Preview */}
        <div className="bg-muted/20 rounded-lg p-4 space-y-4">
          <h3 className="text-md font-medium border-b border-border pb-2">Flow Settings</h3>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Selected Outreach Flow:</span>
              <p className="text-sm">
                {formData.outreachFlowId 
                  ? "Flow #" + formData.outreachFlowId 
                  : "No outreach flow selected"}
              </p>
            </div>
            
            <div>
              <span className="text-sm font-medium">Flow Activation:</span>
              <p className="text-sm">
                {formData.outreachFlowId 
                  ? "Flow will be activated when campaign starts"
                  : "No flow to activate"}
              </p>
            </div>
            
            <div>
              <span className="text-sm font-medium">Target Channels:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.channels.length > 0 ? (
                  formData.channels.map(channel => (
                    <span
                      key={channel}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize"
                    >
                      {channel}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No channels selected</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-4 mt-4">
            <p className="text-xs text-muted-foreground">
              You can always modify the outreach flow after creating the campaign.
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MessageFlow;
