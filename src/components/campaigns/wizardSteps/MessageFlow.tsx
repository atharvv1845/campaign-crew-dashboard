
import React, { useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { availableChannels } from '../constants/channels';
import { CampaignFormData, MessageStep } from '../types/campaignTypes';

interface MessageFlowProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

// Types for step data
interface MessageStepData {
  message: string;
  assignedTo?: string;
}

interface DelayStepData {
  days: number;
  hours?: number;
}

interface ConditionStepData {
  condition: 'replied' | 'no_response' | 'negative_response';
  action: 'move_stage' | 'continue' | 'mark_not_interested';
  targetStage?: string;
  waitDays?: number;
}

const MessageFlow: React.FC<MessageFlowProps> = ({ formData, setFormData, onNext, onBack }) => {
  const [activeChannel, setActiveChannel] = useState(formData.channels[0] || 'email');
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [newStepType, setNewStepType] = useState<'message' | 'delay' | 'condition'>('message');

  // Initialize step flows if not present
  React.useEffect(() => {
    const initializedStepFlows = { ...formData.stepFlows };
    
    formData.channels.forEach(channel => {
      if (!initializedStepFlows[channel]) {
        initializedStepFlows[channel] = [];
      }
    });
    
    if (JSON.stringify(initializedStepFlows) !== JSON.stringify(formData.stepFlows)) {
      setFormData(prev => ({
        ...prev,
        stepFlows: initializedStepFlows
      }));
    }
  }, [formData.channels]);

  // Get current channel steps
  const currentChannelSteps = formData.stepFlows[activeChannel] || [];

  // Change active channel
  const handleChannelChange = (channel: string) => {
    setActiveChannel(channel);
    setIsAddingStep(false);
  };

  // Add a new step to the current channel
  const addStep = (type: 'message' | 'delay' | 'condition') => {
    const newStep: MessageStep = {
      id: `${activeChannel}-step-${Date.now()}`,
      type,
      order: currentChannelSteps.length + 1,
      data: type === 'message' 
        ? { message: '' } 
        : type === 'delay' 
          ? { days: 1 } 
          : { condition: 'replied', action: 'continue', waitDays: 3 }
    };
    
    setFormData(prev => ({
      ...prev,
      stepFlows: {
        ...prev.stepFlows,
        [activeChannel]: [...(prev.stepFlows[activeChannel] || []), newStep]
      }
    }));
    
    setIsAddingStep(false);
  };

  // Remove a step
  const removeStep = (stepId: string) => {
    setFormData(prev => ({
      ...prev,
      stepFlows: {
        ...prev.stepFlows,
        [activeChannel]: prev.stepFlows[activeChannel].filter(step => step.id !== stepId)
      }
    }));
  };

  // Update a message step
  const updateMessageStep = (stepId: string, data: MessageStepData) => {
    setFormData(prev => ({
      ...prev,
      stepFlows: {
        ...prev.stepFlows,
        [activeChannel]: prev.stepFlows[activeChannel].map(step => 
          step.id === stepId ? { ...step, data } : step
        )
      }
    }));
  };

  // Update a delay step
  const updateDelayStep = (stepId: string, data: DelayStepData) => {
    setFormData(prev => ({
      ...prev,
      stepFlows: {
        ...prev.stepFlows,
        [activeChannel]: prev.stepFlows[activeChannel].map(step => 
          step.id === stepId ? { ...step, data } : step
        )
      }
    }));
  };

  // Update a condition step
  const updateConditionStep = (stepId: string, data: ConditionStepData) => {
    setFormData(prev => ({
      ...prev,
      stepFlows: {
        ...prev.stepFlows,
        [activeChannel]: prev.stepFlows[activeChannel].map(step => 
          step.id === stepId ? { ...step, data } : step
        )
      }
    }));
  };

  // Render a message step
  const renderMessageStep = (step: MessageStep) => {
    const data = step.data as MessageStepData;
    
    return (
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-medium">Message</h4>
          <button 
            onClick={() => removeStep(step.id)}
            className="p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
        
        <textarea
          value={data.message}
          onChange={(e) => updateMessageStep(step.id, { ...data, message: e.target.value })}
          placeholder={`Enter your ${activeChannel} message...`}
          className="w-full p-3 border border-border rounded-md min-h-[100px] focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none mb-3"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Assign to team member</label>
            <select
              value={data.assignedTo || ''}
              onChange={(e) => updateMessageStep(step.id, { ...data, assignedTo: e.target.value })}
              className="w-full p-2 border border-border rounded-md text-sm"
            >
              <option value="">Unassigned</option>
              <option value="john">John Doe</option>
              <option value="jane">Jane Smith</option>
              <option value="alex">Alex Johnson</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Save as template</label>
            <button className="w-full p-2 border border-border rounded-md text-sm hover:bg-muted/20 transition-colors">
              Save as Template
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render a delay step
  const renderDelayStep = (step: MessageStep) => {
    const data = step.data as DelayStepData;
    
    return (
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-medium">Wait</h4>
          <button 
            onClick={() => removeStep(step.id)}
            className="p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Days</label>
            <input
              type="number"
              value={data.days}
              onChange={(e) => updateDelayStep(step.id, { ...data, days: parseInt(e.target.value) })}
              min="0"
              className="w-full p-2 border border-border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Hours</label>
            <input
              type="number"
              value={data.hours || 0}
              onChange={(e) => updateDelayStep(step.id, { ...data, hours: parseInt(e.target.value) })}
              min="0"
              max="23"
              className="w-full p-2 border border-border rounded-md text-sm"
            />
          </div>
        </div>
      </div>
    );
  };

  // Render a condition step
  const renderConditionStep = (step: MessageStep) => {
    const data = step.data as ConditionStepData;
    
    return (
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-sm font-medium">Condition</h4>
          <button 
            onClick={() => removeStep(step.id)}
            className="p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">If lead:</label>
            <select
              value={data.condition}
              onChange={(e) => updateConditionStep(step.id, { 
                ...data, 
                condition: e.target.value as 'replied' | 'no_response' | 'negative_response' 
              })}
              className="w-full p-2 border border-border rounded-md text-sm"
            >
              <option value="replied">Replied to message</option>
              <option value="no_response">Did not respond</option>
              <option value="negative_response">Responded negatively</option>
            </select>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Then:</label>
            <select
              value={data.action}
              onChange={(e) => updateConditionStep(step.id, { 
                ...data, 
                action: e.target.value as 'move_stage' | 'continue' | 'mark_not_interested' 
              })}
              className="w-full p-2 border border-border rounded-md text-sm"
            >
              <option value="continue">Continue sequence</option>
              <option value="move_stage">Move to different stage</option>
              <option value="mark_not_interested">Mark as not interested</option>
            </select>
          </div>
          
          {data.action === 'move_stage' && (
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Target stage:</label>
              <select
                value={data.targetStage || ''}
                onChange={(e) => updateConditionStep(step.id, { ...data, targetStage: e.target.value })}
                className="w-full p-2 border border-border rounded-md text-sm"
              >
                {formData.stages.map(stage => (
                  <option key={stage.id} value={stage.id}>{stage.name}</option>
                ))}
              </select>
            </div>
          )}
          
          {data.condition === 'no_response' && (
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Wait days:</label>
              <input
                type="number"
                value={data.waitDays || 3}
                onChange={(e) => updateConditionStep(step.id, { ...data, waitDays: parseInt(e.target.value) })}
                min="1"
                className="w-full p-2 border border-border rounded-md text-sm"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Message Flow</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create a sequence of messages, delays, and conditions for each channel.
        </p>
        
        {/* Channel tabs */}
        <Tabs value={activeChannel} onValueChange={handleChannelChange} className="w-full">
          <TabsList className="mb-4">
            {formData.channels.map(channel => {
              const channelData = availableChannels.find(c => c.id === channel);
              return (
                <TabsTrigger key={channel} value={channel}>
                  {channelData?.name || channel}
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {formData.channels.map(channel => (
            <TabsContent key={channel} value={channel} className="space-y-4 mt-2">
              {/* Channel steps */}
              {formData.stepFlows[channel]?.map(step => (
                <div key={step.id}>
                  {step.type === 'message' && renderMessageStep(step)}
                  {step.type === 'delay' && renderDelayStep(step)}
                  {step.type === 'condition' && renderConditionStep(step)}
                </div>
              ))}
              
              {/* Add step button or selection */}
              {isAddingStep ? (
                <div className="border border-dashed border-border rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-3">Add a step</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => addStep('message')}
                      className="p-3 border border-border rounded-md text-sm hover:bg-muted/20 transition-colors"
                    >
                      Message
                    </button>
                    <button
                      onClick={() => addStep('delay')}
                      className="p-3 border border-border rounded-md text-sm hover:bg-muted/20 transition-colors"
                    >
                      Wait
                    </button>
                    <button
                      onClick={() => addStep('condition')}
                      className="p-3 border border-border rounded-md text-sm hover:bg-muted/20 transition-colors"
                    >
                      Condition
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingStep(true)}
                  className="flex items-center gap-2 w-full p-3 border border-dashed border-border rounded-lg text-sm hover:bg-muted/20 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Step</span>
                </button>
              )}
            </TabsContent>
          ))}
        </Tabs>
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

export default MessageFlow;
