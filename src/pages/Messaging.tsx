
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MessageTemplates from '@/components/messaging/MessageTemplates';
import ScriptEditor from '@/components/messaging/ScriptEditor';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { availableChannels } from '@/components/campaigns/constants/channels';
import FlowCanvas from '@/components/campaigns/wizardSteps/components/FlowCanvas';
import FlowNodeEditor from '@/components/campaigns/wizardSteps/FlowNodeEditor';
import { useMessageFlowState } from '@/components/campaigns/wizardSteps/hooks/useMessageFlowState';
import FlowNodeActions from '@/components/campaigns/wizardSteps/components/FlowNodeActions';
import FlowSaveValidation from '@/components/campaigns/wizardSteps/components/FlowSaveValidation';

const Messaging: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('templates');
  const { toast } = useToast();
  
  // Flow state for the outreach flow tab
  const formData = {
    name: '',
    description: '',
    channels: availableChannels.map(c => c.id),
    stages: [],
    team: [],
    leads: [],
    flows: [],
    messageFlow: { nodes: [], edges: [] }
  };
  
  const [flowFormData, setFlowFormData] = useState(formData);
  
  const {
    nodes,
    edges,
    selectedNode,
    showNodeModal,
    nodeType,
    nodeData,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeClick,
    validateFlow,
    validateMessageData,
    addNode,
    updateNode,
    deleteNode,
    setShowNodeModal,
    setNodeType,
    setNodeData,
    setSelectedNode
  } = useMessageFlowState(flowFormData, setFlowFormData, () => {
    toast({
      title: "Flow saved",
      description: "Your message flow has been saved successfully."
    });
  });

  const { handleAddNode, handleSaveNode, handleDeleteNode } = FlowNodeActions({
    nodeType,
    nodeData,
    setNodeData,
    selectedNode,
    validateMessageData,
    updateNode,
    addNode,
    setShowNodeModal,
    deleteNode,
    setNodeType,
    setSelectedNode
  });
  
  const { saveFlowToFormData } = FlowSaveValidation({
    nodes,
    edges,
    validateFlow,
    setFormData: setFlowFormData,
    onNext: () => {
      toast({
        title: "Flow saved",
        description: "Your message flow has been saved successfully."
      });
    }
  });

  const handleAddNodeType = (type: 'message' | 'delay' | 'condition') => {
    handleAddNode(type);
  };

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
              <TabsTrigger value="flow">Outreach Flow</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates">
              <MessageTemplates onEditScript={() => setActiveTab('editor')} />
            </TabsContent>
            
            <TabsContent value="editor">
              <ScriptEditor onSaveComplete={() => setActiveTab('templates')} />
            </TabsContent>
            
            <TabsContent value="flow">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Message Flow Builder</h2>
                  <Button onClick={saveFlowToFormData}>
                    Save Flow
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  Design your outreach message sequence by adding messages, delays, and conditions.
                </p>
                
                <div className="h-[500px] flex flex-col">
                  <FlowCanvas
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={handleNodeClick}
                    onAddNodeType={handleAddNodeType}
                  />
                </div>

                {/* Node editor dialog */}
                <FlowNodeEditor
                  open={showNodeModal}
                  onOpenChange={setShowNodeModal}
                  nodeType={nodeType}
                  nodeData={nodeData}
                  setNodeData={setNodeData}
                  selectedNode={selectedNode}
                  onSave={handleSaveNode}
                  onDelete={handleDeleteNode}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messaging;
