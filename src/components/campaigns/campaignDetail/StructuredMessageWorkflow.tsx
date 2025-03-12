
import React, { useState } from 'react';
import { PlusCircle, ArrowRight, Clock, Mail, MessageSquare, Linkedin, Phone, Save, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { availableChannels } from '../constants/channels';
import { MessageStep } from './hooks/sequenceTypes';
import { toast } from '@/hooks/use-toast';

interface StructuredMessageWorkflowProps {
  steps: MessageStep[];
  onUpdateSteps: (steps: MessageStep[]) => void;
}

interface WorkflowStep {
  id: number;
  channel: string;
  message: string;
  delay: string | null;
  condition: string | null;
  assignedTo: string | null;
}

const StructuredMessageWorkflow: React.FC<StructuredMessageWorkflowProps> = ({ steps, onUpdateSteps }) => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingStep, setEditingStep] = useState<MessageStep | null>(null);
  const [savedWorkflows, setSavedWorkflows] = useState<{ id: number; name: string; steps: MessageStep[] }[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [workflowName, setWorkflowName] = useState('');

  // Channel icon mapping
  const getChannelIcon = (channel: string) => {
    switch(channel) {
      case 'email': return <Mail className="h-5 w-5 text-blue-500" />;
      case 'linkedin': return <Linkedin className="h-5 w-5 text-indigo-500" />;
      case 'call': return <Phone className="h-5 w-5 text-green-500" />;
      case 'sms': return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case 'whatsapp': return <MessageSquare className="h-5 w-5 text-green-500" />;
      default: return <Mail className="h-5 w-5" />;
    }
  };

  // Handle adding a new step
  const handleAddStep = (type: string) => {
    const newStep: MessageStep = {
      id: Math.max(0, ...steps.map(s => Number(s.id))) + 1,
      type: type !== 'delay' ? type : 'delay',
      content: type !== 'delay' ? '' : null,
      delay: type === 'delay' ? '1 day' : null,
      assignedTo: '',
    };
    
    setEditingStep(newStep);
    setShowEditDialog(true);
  };

  // Handle editing an existing step
  const handleEditStep = (step: MessageStep) => {
    setEditingStep({ ...step });
    setShowEditDialog(true);
  };

  // Save changes to a step
  const handleSaveStep = () => {
    if (!editingStep) return;
    
    // Validate required fields
    if (editingStep.type !== 'delay' && !editingStep.content) {
      toast({
        title: "Validation Error",
        description: "Message content is required",
        variant: "destructive"
      });
      return;
    }
    
    // Check if this is an edit or new step
    const existingStepIndex = steps.findIndex(s => s.id === editingStep.id);
    
    if (existingStepIndex >= 0) {
      // Update existing step
      const updatedSteps = [...steps];
      updatedSteps[existingStepIndex] = editingStep;
      onUpdateSteps(updatedSteps);
    } else {
      // Add new step
      onUpdateSteps([...steps, editingStep]);
    }
    
    setShowEditDialog(false);
    setEditingStep(null);
    
    toast({
      title: existingStepIndex >= 0 ? "Step Updated" : "Step Added",
      description: existingStepIndex >= 0 
        ? "Message step has been updated successfully."
        : "New message step has been added to the workflow."
    });
  };

  // Delete a step
  const handleDeleteStep = (id: number) => {
    onUpdateSteps(steps.filter(step => step.id !== id));
    toast({
      title: "Step Deleted",
      description: "Message step has been removed from the workflow."
    });
  };

  // Move a step up or down
  const handleMoveStep = (id: number, direction: 'up' | 'down') => {
    const stepIndex = steps.findIndex(s => s.id === id);
    if ((direction === 'up' && stepIndex <= 0) || 
        (direction === 'down' && stepIndex >= steps.length - 1)) {
      return;
    }
    
    const updatedSteps = [...steps];
    const targetIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;
    [updatedSteps[stepIndex], updatedSteps[targetIndex]] = [updatedSteps[targetIndex], updatedSteps[stepIndex]];
    
    onUpdateSteps(updatedSteps);
  };

  // Save the current workflow
  const handleSaveWorkflow = () => {
    if (!workflowName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide a name for this workflow.",
        variant: "destructive"
      });
      return;
    }
    
    const newWorkflow = {
      id: Math.max(0, ...savedWorkflows.map(w => w.id)) + 1,
      name: workflowName,
      steps: [...steps]
    };
    
    setSavedWorkflows([...savedWorkflows, newWorkflow]);
    setShowSaveDialog(false);
    setWorkflowName('');
    
    toast({
      title: "Workflow Saved",
      description: `"${workflowName}" workflow has been saved successfully.`
    });
  };

  // Load a saved workflow
  const handleLoadWorkflow = (id: number) => {
    const workflow = savedWorkflows.find(w => w.id === id);
    if (workflow) {
      onUpdateSteps([...workflow.steps]);
      setShowLoadDialog(false);
      
      toast({
        title: "Workflow Loaded",
        description: `"${workflow.name}" workflow has been loaded.`
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Message Workflow</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowLoadDialog(true)}>
            <Folder className="h-4 w-4 mr-2" />
            Load Workflow
          </Button>
          <Button onClick={() => setShowSaveDialog(true)}>
            <Save className="h-4 w-4 mr-2" />
            Save Workflow
          </Button>
        </div>
      </div>
      
      {/* Message workflow table */}
      <Card>
        <CardContent className="p-0">
          {/* Table header */}
          <div className="grid grid-cols-6 gap-4 p-4 border-b text-sm font-medium text-muted-foreground">
            <div>Step</div>
            <div>Channel</div>
            <div className="col-span-2">Message / Delay</div>
            <div>Assigned To</div>
            <div>Actions</div>
          </div>
          
          {/* Table content */}
          <div className="divide-y">
            {steps.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No message steps added yet. Click "Add Step" to start building your workflow.
              </div>
            ) : (
              steps.map((step, index) => (
                <div key={step.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full border">
                      {step.type === 'delay' ? (
                        <Clock className="h-5 w-5 text-gray-500" />
                      ) : (
                        getChannelIcon(step.type)
                      )}
                    </div>
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  
                  <div className="capitalize">
                    {step.type === 'delay' ? 'Wait' : step.type}
                  </div>
                  
                  <div className="col-span-2 truncate">
                    {step.type === 'delay' ? (
                      <span className="text-sm">{step.delay}</span>
                    ) : (
                      <span className="text-sm">{step.content}</span>
                    )}
                  </div>
                  
                  <div>
                    {step.assignedTo ? (
                      <span className="text-sm">{step.assignedTo}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not assigned</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleMoveStep(step.id, 'up')}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleMoveStep(step.id, 'down')}
                      disabled={index === steps.length - 1}
                    >
                      ↓
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditStep(step)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteStep(step.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Add step buttons */}
      <div className="flex flex-wrap gap-3">
        <div className="text-sm text-muted-foreground flex items-center mr-2">Add step:</div>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => handleAddStep('email')}
        >
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => handleAddStep('linkedin')}
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => handleAddStep('whatsapp')}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          WhatsApp
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => handleAddStep('sms')}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          SMS
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => handleAddStep('call')}
        >
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => handleAddStep('delay')}
        >
          <Clock className="h-4 w-4 mr-2" />
          Delay
        </Button>
      </div>
      
      {/* Step edit dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingStep && steps.find(s => s.id === editingStep.id) 
                ? 'Edit Message Step' 
                : 'Add Message Step'}
            </DialogTitle>
          </DialogHeader>
          
          {editingStep && (
            <div className="space-y-4">
              {editingStep.type !== 'delay' ? (
                // Message form
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Channel</Label>
                      <Select
                        value={editingStep.type}
                        onValueChange={(value) => setEditingStep({...editingStep, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select channel" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableChannels.map(channel => (
                            <SelectItem key={channel.id} value={channel.id}>
                              {channel.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Assigned To</Label>
                      <Select
                        value={editingStep.assignedTo || ''}
                        onValueChange={(value) => setEditingStep({...editingStep, assignedTo: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select team member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="John Smith">John Smith</SelectItem>
                          <SelectItem value="Sarah Lee">Sarah Lee</SelectItem>
                          <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {editingStep.type === 'email' && (
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Input
                        value={editingStep.subject || ''}
                        onChange={(e) => setEditingStep({...editingStep, subject: e.target.value})}
                        placeholder="Email subject line"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label>Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={editingStep.content || ''}
                      onChange={(e) => setEditingStep({...editingStep, content: e.target.value})}
                      placeholder="Enter your message..."
                      rows={5}
                      required
                    />
                    <div className="text-xs text-muted-foreground">
                      Use {"{{firstName}}"}, {"{{company}}"}, etc. for personalization.
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Condition (Optional)</Label>
                    <Select
                      value={editingStep.condition || ''}
                      onValueChange={(value) => setEditingStep({...editingStep, condition: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No condition</SelectItem>
                        <SelectItem value="if-no-reply">If no reply in 3 days</SelectItem>
                        <SelectItem value="if-opened">If opened but no reply</SelectItem>
                        <SelectItem value="if-clicked">If link was clicked</SelectItem>
                        <SelectItem value="if-responded">If responded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                // Delay form
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Delay Duration</Label>
                    <Select
                      value={editingStep.delay || '1 day'}
                      onValueChange={(value) => setEditingStep({...editingStep, delay: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 day">1 Day</SelectItem>
                        <SelectItem value="2 days">2 Days</SelectItem>
                        <SelectItem value="3 days">3 Days</SelectItem>
                        <SelectItem value="5 days">5 Days</SelectItem>
                        <SelectItem value="1 week">1 Week</SelectItem>
                        <SelectItem value="2 weeks">2 Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveStep}>
                  Save
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Save workflow dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Workflow</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Workflow Name</Label>
              <Input
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                placeholder="E.g., Standard Follow-up Sequence"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveWorkflow}>
              Save Workflow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Load workflow dialog */}
      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Load Saved Workflow</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {savedWorkflows.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                No saved workflows yet. Create and save a workflow first.
              </div>
            ) : (
              savedWorkflows.map(workflow => (
                <Button
                  key={workflow.id}
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => handleLoadWorkflow(workflow.id)}
                >
                  <span>{workflow.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ))
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoadDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StructuredMessageWorkflow;
