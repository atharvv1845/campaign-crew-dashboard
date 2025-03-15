
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MessageTemplates from '@/components/messaging/MessageTemplates';
import ScriptEditor from '@/components/messaging/ScriptEditor';
import OutreachFlow from '@/components/messaging/OutreachFlow';

const Messaging: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('templates');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Message Scripts</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="editor">Create/Edit</TabsTrigger>
              <TabsTrigger value="flow">Outreach Flow</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates">
              <MessageTemplates onEditScript={() => setActiveTab('editor')} />
            </TabsContent>
            
            <TabsContent value="editor">
              <ScriptEditor onSaveComplete={() => setActiveTab('templates')} />
            </TabsContent>
            
            <TabsContent value="flow">
              <OutreachFlow />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messaging;
