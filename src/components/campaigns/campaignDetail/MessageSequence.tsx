
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import StructuredView from './views/StructuredView';
import FlowView from './views/FlowView';

interface MessageSequenceProps {
  campaign: any;
  updateCampaign?: (data: any) => void;
}

const MessageSequence: React.FC<MessageSequenceProps> = ({ campaign, updateCampaign }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Message Sequence</h2>
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          Add Message
        </Button>
      </div>
      
      <Tabs defaultValue="structured">
        <TabsList>
          <TabsTrigger value="structured">Structured View</TabsTrigger>
          <TabsTrigger value="flow">Flow View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="structured">
          <StructuredView campaign={campaign} updateCampaign={updateCampaign} />
        </TabsContent>
        
        <TabsContent value="flow">
          <FlowView campaign={campaign} updateCampaign={updateCampaign} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessageSequence;
