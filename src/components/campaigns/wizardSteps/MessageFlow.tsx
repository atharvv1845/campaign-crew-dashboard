
import React, { useState } from 'react';
import { CampaignFormData, MessageStep, defaultStages } from '../types/campaignTypes';
import { availableChannels } from '../constants/channels';
import { Plus, MessageSquare, Clock, ArrowRight, Edit, Trash2, Save, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

interface MessageFlowProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

// Mock saved templates data
const mockTemplates = [
  { id: 'temp1', name: 'Initial Outreach', content: 'Hi [name], I noticed your profile and wanted to connect regarding [topic].' },
  { id: 'temp2', name: 'Follow Up', content: 'Hi [name], I wanted to follow up on my previous message about [topic].' },
];

const MessageFlow: React.FC<MessageFlowProps> = ({ formData, setFormData, onNext, onBack }) => {
  const { toast } = useToast();
  const [activeChannel, setActiveChannel] = useState<string>(formData.channels[0] || '');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  
  // Get selected channels
  const selectedChannels = availableChannels.filter(channel => 
    formData.channels.includes(channel.id)
  );
  
  // Initialize step flows if not present
  React.useEffect(() => {
    if (!formData.stepFlows) {
      const initialStepFlows: Record<string, MessageStep[]> = {};
      formData.channels.forEach(channel => {
        initialStepFlows[channel] = [];
      });
      
      setFormData(prev => ({
        ...prev,
        stepFlows: initialStepFlows
      }));
    }
  }, [formData.channels, setFormData]);
  
  // Get steps for current channel
  const getChannelSteps = (): MessageStep[] => {
    return formData.stepFlows?.[activeChannel] || [];
  };
  
  // Add a new step
  const addStep = (type: 'message' | 'delay' | 'condition') => {
    const steps = getChannelSteps();
    const newStepId = `${activeChannel}-${type}-${Date.now()}`;
    const newStep: MessageStep = {
      id: newStepId,
      type,
      order: steps.length + 1,
      data: type === 'message' 
        ? { message: '', assignedTo: '' } 
        : type === 'delay' 
        ? { days: 1 } 
        : { condition: 'no_response', action: 'continue' }
    };
    
    setFormData(prev => ({
      ...prev,
      stepFlows: {
        ...prev.stepFlows,
        [activeChannel]: [...steps, newStep]
      }
    }));
  };
  
  // Delete a step
  const deleteStep = (stepId: string) => {
    const steps = getChannelSteps();
    const filteredSteps = steps.filter(step => step.id !== stepId);
    
    // Reorder remaining steps
    const reorderedSteps = filteredSteps.map((step, index) => ({
      ...step,
      order: index + 1
    }));
    
    setFormData(prev => ({
      ...prev,
      stepFlows: {
        ...prev.stepFlows,
        [activeChannel]: reorderedSteps
      }
    }));
    
    toast({
      title: "Step Removed",
      description: "Step has been removed from the sequence."
    });
  };
  
  // Update a step
  const updateStep = (stepId: string, data: any) => {
    const steps = getChannelSteps();
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, data: { ...step.data, ...data } } : step
    );
    
    setFormData(prev => ({
      ...prev,
      stepFlows: {
        ...prev.stepFlows,
        [activeChannel]: updatedSteps
      }
    }));
  };
  
  // Save message as template
  const saveAsTemplate = (stepId: string) => {
    const step = getChannelSteps().find(s => s.id === stepId);
    if (step && step.type === 'message') {
      // This would actually save to your template store
      toast({
        title: "Template Saved",
        description: "Message has been saved as a template."
      });
    }
  };
  
  // Use a saved template
  const useTemplate = (stepId: string, templateContent: string) => {
    updateStep(stepId, { message: templateContent });
    setShowTemplateModal(false);
    
    toast({
      title: "Template Applied",
      description: "Template has been applied to the message."
    });
  };
  
  // Move step up in order
  const moveStepUp = (stepId: string) => {
    const steps = getChannelSteps();
    const stepIndex = steps.findIndex(s => s.id === stepId);
    
    if (stepIndex > 0) {
      const newSteps = [...steps];
      const temp = newSteps[stepIndex];
      newSteps[stepIndex] = newSteps[stepIndex - 1];
      newSteps[stepIndex - 1] = temp;
      
      // Update order property
      const reorderedSteps = newSteps.map((step, index) => ({
        ...step,
        order: index + 1
      }));
      
      setFormData(prev => ({
        ...prev,
        stepFlows: {
          ...prev.stepFlows,
          [activeChannel]: reorderedSteps
        }
      }));
    }
  };
  
  // Move step down in order
  const moveStepDown = (stepId: string) => {
    const steps = getChannelSteps();
    const stepIndex = steps.findIndex(s => s.id === stepId);
    
    if (stepIndex < steps.length - 1) {
      const newSteps = [...steps];
      const temp = newSteps[stepIndex];
      newSteps[stepIndex] = newSteps[stepIndex + 1];
      newSteps[stepIndex + 1] = temp;
      
      // Update order property
      const reorderedSteps = newSteps.map((step, index) => ({
        ...step,
        order: index + 1
      }));
      
      setFormData(prev => ({
        ...prev,
        stepFlows: {
          ...prev.stepFlows,
          [activeChannel]: reorderedSteps
        }
      }));
    }
  };
  
  // Render a message step
  const renderMessageStep = (step: MessageStep) => {
    const { data } = step as { data: MessageStepData };
    return (
      <div className="p-4 border border-border rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Message</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedTemplate(step)}
              className="p-1 rounded-full hover:bg-muted/50 transition-colors"
              title="Use Template"
            >
              <FileText className="h-4 w-4" />
            </button>
            <button
              onClick={() => saveAsTemplate(step.id)}
              className="p-1 rounded-full hover:bg-muted/50 transition-colors"
              title="Save as Template"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={() => moveStepUp(step.id)}
              className="p-1 rounded-full hover:bg-muted/50 transition-colors"
              disabled={step.order === 1}
              title="Move Up"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
            <button
              onClick={() => moveStepDown(step.id)}
              className="p-1 rounded-full hover:bg-muted/50 transition-colors"
              disabled={step.order === getChannelSteps().length}
              title="Move Down"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => deleteStep(step.id)}
              className="p-1 rounded-full hover:bg-muted/50 transition-colors"
              title="Delete Step"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mb-3">
          <textarea
            value={data.message}
            onChange={(e) => updateStep(step.id, { message: e.target.value })}
            className="w-full p-3 border border-border rounded-md min-h-[120px] focus:outline-none focus:ring-1 focus:ring-primary/50"
            placeholder="Enter your message content..."
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use <span className="font-mono">[name]</span>, <span className="font-mono">[company]</span> for personalization.
          </p>
        </div>
        <div>
          <label className="text-sm font-medium">Assign To:</label>
          <select
            value={data.assignedTo || ''}
            onChange={(e) => updateStep(step.id, { assignedTo: e.target.value })}
            className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50"
          >
            <option value="">Unassigned</option>
            <option value="John">John Smith</option>
            <option value="Sarah">Sarah Lee</option>
            <option value="Alex">Alex Chen</option>
          </select>
        </div>
      </div>
    );
  };
  
  // Render a delay step
  const renderDelayStep = (step: MessageStep) => {
    const { data } = step as { data: DelayStepData };
    return (
      <div className="p-4 border border-border rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-sm">Delay</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => moveStepUp(step.id)}
              className="p-1 rounded-full hover:bg-muted/50 transition-colors"
              disabled={step.order === 1}
              title="Move Up"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
            <button
              onClick={() => moveStepDown(step.id)}
              className="p-1 rounded-full hover:bg-muted/50 transition-colors"
              disabled={step.order === getChannelSteps().length}
              title="Move Down"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => deleteStep(step.id)}
              className="p-1 rounded-full hover:bg-muted/50 transition-colors"
              title="Delete Step"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Wait for</span>
          <div className="flex-1">
            <input
              type="number"
              min="0"
              value={data.days}
              onChange={(e) => updateStep(step.id, { days: parseInt(e.target.value) || 0 })}
              className="w-20 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
          <span className="text-sm">days</span>
          <div className="flex-1">
            <input
              type="number"
              min="0"
              max="23"
              value={data.hours || 0}
              onChange={(e) => updateStep(step.id, { hours: parseInt(e.target.value) || 0 })}
              className="w-20 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
          <span className="text-sm">hours before next step</span>
        </div>
      </div>
    );
  };
  
  // Render a condition step
  const renderConditionStep = (step: MessageStep) => {
    const { data } = step as { data: ConditionStepData };
    return (
      <div className="p-4 border border-border rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-yellow-500" />
            <span className="font-medium text-sm">Condition</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => moveStepUp(step.id)}
              className="p-1 rounded-full hover:bg-muted/50 transition-colors"
              disabled={step.order === 1}
              title="Move Up"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
            <button
              onClick={() => moveStepDown(step.id)}
              className="p-1 rounded-full hover:bg-muted/50 transition-colors"
              disabled={step.order === getChannelSteps().length}
              title="Move Down"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => deleteStep(step.id)}
              className="p-1 rounded-full hover:bg-muted/50 transition-colors"
              title="Delete Step"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">If:</label>
            <select
              value={data.condition}
              onChange={(e) => updateStep(step.id, { condition: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50"
            >
              <option value="replied">Lead Replied</option>
              <option value="no_response">No Response</option>
              <option value="negative_response">Negative Response</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Then:</label>
            <select
              value={data.action}
              onChange={(e) => updateStep(step.id, { action: e.target.value })}
              className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50"
            >
              <option value="move_stage">Move to Stage</option>
              <option value="continue">Continue Sequence</option>
              <option value="mark_not_interested">Mark as Not Interested</option>
            </select>
          </div>
          
          {data.action === 'move_stage' && (
            <div>
              <label className="text-sm font-medium">Target Stage:</label>
              <select
                value={data.targetStage || ''}
                onChange={(e) => updateStep(step.id, { targetStage: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50"
              >
                <option value="">Select a Stage</option>
                {formData.stages.map(stage => (
                  <option key={stage.id} value={stage.id}>
                    {stage.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {data.action === 'continue' && (
            <div>
              <label className="text-sm font-medium">Wait Days:</label>
              <input
                type="number"
                min="0"
                value={data.waitDays || 0}
                onChange={(e) => updateStep(step.id, { waitDays: parseInt(e.target.value) || 0 })}
                className="w-full mt-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Render a step based on its type
  const renderStep = (step: MessageStep) => {
    switch (step.type) {
      case 'message':
        return renderMessageStep(step);
      case 'delay':
        return renderDelayStep(step);
      case 'condition':
        return renderConditionStep(step);
      default:
        return null;
    }
  };
  
  // Check if we have at least one message step
  const hasMessageSteps = Object.values(formData.stepFlows || {}).some(
    steps => steps.some(step => step.type === 'message')
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Message Sequence Flow</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create step-by-step message sequences for each channel in your outreach campaign.
        </p>
        
        {/* Channel tabs */}
        <Tabs 
          value={activeChannel} 
          onValueChange={setActiveChannel}
          className="w-full"
        >
          <TabsList className="mb-4">
            {selectedChannels.map(channel => (
              <TabsTrigger 
                key={channel.id} 
                value={channel.id}
                className="min-w-[100px]"
              >
                {channel.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {selectedChannels.map(channel => (
            <TabsContent key={channel.id} value={channel.id} className="space-y-4">
              {/* Steps for this channel */}
              {formData.stepFlows?.[channel.id]?.length > 0 ? (
                <div className="space-y-4">
                  {formData.stepFlows[channel.id]
                    .sort((a, b) => a.order - b.order)
                    .map(step => (
                      <div key={step.id} className="animate-fade-in">
                        {renderStep(step)}
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center p-8 border border-dashed border-border rounded-lg text-muted-foreground">
                  <p>No steps added yet. Add your first step below.</p>
                </div>
              )}
              
              {/* Add step buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => addStep('message')}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-md"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Add Message</span>
                </button>
                <button
                  onClick={() => addStep('delay')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-md"
                >
                  <Clock className="h-4 w-4" />
                  <span>Add Delay</span>
                </button>
                <button
                  onClick={() => addStep('condition')}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-md"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span>Add Condition</span>
                </button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Template selection modal */}
        {showTemplateModal && selectedTemplate && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div 
              className="bg-card w-full max-w-md rounded-xl shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h3 className="text-lg font-medium">Select Template</h3>
                <button 
                  onClick={() => setShowTemplateModal(false)}
                  className="p-2 rounded-full hover:bg-muted/50 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4 max-h-[400px] overflow-y-auto">
                <div className="space-y-2">
                  {mockTemplates.map(template => (
                    <div 
                      key={template.id}
                      className="p-3 border border-border rounded-lg hover:border-primary hover:bg-muted/20 cursor-pointer transition-colors"
                      onClick={() => useTemplate(selectedTemplate.id, template.content)}
                    >
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{template.content}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t border-border">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="w-full px-4 py-2 bg-muted hover:bg-muted/80 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Tips */}
        <div className="mt-4 p-3 bg-muted/20 rounded-lg text-sm">
          <div className="flex items-start gap-2">
            <div>
              <span className="font-medium">Flow Building Tips:</span>
              <ul className="list-disc list-inside text-muted-foreground mt-1 ml-2 text-xs">
                <li>Start with a message step to engage your leads</li>
                <li>Add delay steps between messages to give leads time to respond</li>
                <li>Use condition steps to create different paths based on lead responses</li>
                <li>Each channel can have its own unique sequence of steps</li>
              </ul>
            </div>
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
          onClick={() => {
            onNext();
          }}
          disabled={!hasMessageSteps}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MessageFlow;
