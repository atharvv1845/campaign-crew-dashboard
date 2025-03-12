
import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Linkedin, 
  Phone, 
  ArrowRight, 
  Clock, 
  Edit, 
  Plus,
  Save,
  Folder,
  XCircle,
  DragHorizontalIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MessageSequence: React.FC = () => {
  const { toast } = useToast();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const [editingStepData, setEditingStepData] = useState<any>(null);
  
  // Mock message sequence data
  const [sequence, setSequence] = useState([
    {
      id: 1,
      type: 'email',
      content: 'Initial outreach email introducing our product',
      delay: null,
    },
    {
      id: 2,
      type: 'delay',
      content: null,
      delay: '3 days',
    },
    {
      id: 3,
      type: 'email',
      content: 'Follow-up email if no response',
      delay: null,
    },
    {
      id: 4,
      type: 'delay',
      content: null,
      delay: '4 days',
    },
    {
      id: 5,
      type: 'linkedin',
      content: 'LinkedIn connection request with personalized message',
      delay: null,
    },
    {
      id: 6,
      type: 'delay',
      content: null,
      delay: '5 days',
    },
    {
      id: 7,
      type: 'call',
      content: 'Call to discuss potential fit',
      delay: null,
    },
  ]);
  
  // Mock saved workflows
  const [savedWorkflows, setSavedWorkflows] = useState([
    { id: 1, name: 'Standard Follow-up Sequence', sequence: [] },
    { id: 2, name: 'Cold Email Campaign', sequence: [] },
  ]);
  
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-indigo-500" />;
      case 'call':
        return <Phone className="h-5 w-5 text-green-500" />;
      case 'sms':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case 'delay':
        return <Clock className="h-5 w-5 text-gray-500" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  const handleAddStep = (type: string) => {
    const newStep = {
      id: Math.max(0, ...sequence.map(s => s.id)) + 1,
      type,
      content: type !== 'delay' ? '' : null,
      delay: type === 'delay' ? '1 day' : null,
    };
    
    setSequence([...sequence, newStep]);
    
    if (type !== 'delay') {
      setEditingStep(newStep.id);
      setEditingStepData(newStep);
    }
    
    toast({
      title: "Step added",
      description: `Added ${type} step to sequence.`,
    });
  };
  
  const handleEditStep = (step: any) => {
    setEditingStep(step.id);
    setEditingStepData({ ...step });
  };
  
  const handleUpdateStep = () => {
    if (!editingStepData) return;
    
    setSequence(sequence.map(step => 
      step.id === editingStep ? editingStepData : step
    ));
    
    setEditingStep(null);
    setEditingStepData(null);
    
    toast({
      title: "Step updated",
      description: "Message step has been updated.",
    });
  };
  
  const handleDeleteStep = (id: number) => {
    setSequence(sequence.filter(step => step.id !== id));
    
    toast({
      title: "Step removed",
      description: "Message step has been removed from sequence.",
    });
  };
  
  const handleMoveStep = (id: number, direction: 'up' | 'down') => {
    const index = sequence.findIndex(step => step.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === sequence.length - 1)
    ) {
      return;
    }
    
    const newSequence = [...sequence];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSequence[index], newSequence[targetIndex]] = [newSequence[targetIndex], newSequence[index]];
    
    setSequence(newSequence);
  };
  
  const handleSaveWorkflow = () => {
    if (!workflowName.trim()) {
      toast({
        title: "Validation error",
        description: "Please enter a name for your workflow.",
        variant: "destructive",
      });
      return;
    }
    
    const newWorkflow = {
      id: Math.max(0, ...savedWorkflows.map(w => w.id)) + 1,
      name: workflowName,
      sequence: [...sequence],
    };
    
    setSavedWorkflows([...savedWorkflows, newWorkflow]);
    setShowSaveDialog(false);
    setWorkflowName('');
    
    toast({
      title: "Workflow saved",
      description: `"${workflowName}" has been saved successfully.`,
    });
  };
  
  const handleLoadWorkflow = (id: number) => {
    const workflow = savedWorkflows.find(w => w.id === id);
    if (workflow) {
      setSequence(workflow.sequence.length > 0 ? workflow.sequence : sequence);
      setShowLoadDialog(false);
      
      toast({
        title: "Workflow loaded",
        description: `"${workflow.name}" has been loaded.`,
      });
    }
  };

  const channelOptions = [
    { value: 'email', label: 'Email' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'call', label: 'Call' },
    { value: 'sms', label: 'SMS' },
    { value: 'whatsapp', label: 'WhatsApp' },
  ];
  
  const teamOptions = [
    { value: 'john', label: 'John Smith' },
    { value: 'sarah', label: 'Sarah Lee' },
    { value: 'alex', label: 'Alex Chen' },
    { value: 'mia', label: 'Mia Johnson' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Message Sequence</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowLoadDialog(true)}
          >
            <Folder className="h-4 w-4 mr-2" />
            Load Workflow
          </Button>
          <Button 
            onClick={() => setShowSaveDialog(true)}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Workflow
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-4 p-2 text-sm font-medium text-muted-foreground">
          <div>Step</div>
          <div>Channel</div>
          <div className="col-span-2">Message / Delay</div>
          <div>Actions</div>
        </div>
        
        <div className="relative">
          <div className="space-y-3">
            {sequence.map((step, index) => (
              <Card key={step.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-5 gap-4 p-3 items-center">
                    <div className="flex items-center gap-2">
                      <DragHorizontalIcon className="h-4 w-4 cursor-move text-muted-foreground" />
                      <div className="flex items-center justify-center h-8 w-8 rounded-full border">
                        {getStepIcon(step.type)}
                      </div>
                    </div>
                    
                    <div>
                      {step.type === 'delay' ? (
                        <div className="text-muted-foreground flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Wait</span>
                        </div>
                      ) : (
                        <div className="capitalize">{step.type}</div>
                      )}
                    </div>
                    
                    <div className="col-span-2">
                      {step.type === 'delay' ? (
                        <div className="font-medium">{step.delay}</div>
                      ) : (
                        <div className="truncate text-sm">{step.content}</div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 justify-end">
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
                        disabled={index === sequence.length - 1}
                      >
                        ↓
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditStep(step)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteStep(step.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-4">
          <div className="text-sm text-muted-foreground mr-2 flex items-center">Add step:</div>
          {channelOptions.map(channel => (
            <Button 
              key={channel.value}
              variant="outline"
              size="sm"
              onClick={() => handleAddStep(channel.value)}
            >
              {getStepIcon(channel.value)}
              <span className="ml-2">{channel.label}</span>
            </Button>
          ))}
          <Button 
            variant="outline"
            size="sm"
            onClick={() => handleAddStep('delay')}
          >
            <Clock className="h-4 w-4" />
            <span className="ml-2">Delay</span>
          </Button>
        </div>
      </div>
      
      {/* Edit Step Dialog */}
      <Dialog open={editingStep !== null} onOpenChange={(open) => !open && setEditingStep(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStepData?.id ? 'Edit' : 'Add'} Message Step
            </DialogTitle>
            <DialogDescription>
              Configure the details for this message step.
            </DialogDescription>
          </DialogHeader>
          
          {editingStepData && editingStepData.type !== 'delay' && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Channel</Label>
                  <Select 
                    value={editingStepData.type}
                    onValueChange={(value) => setEditingStepData({...editingStepData, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      {channelOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assigned To</Label>
                  <Select 
                    value={editingStepData.assignedTo || ''}
                    onValueChange={(value) => setEditingStepData({...editingStepData, assignedTo: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {editingStepData.type === 'email' && (
                <div className="space-y-2">
                  <Label>Subject Line</Label>
                  <Input 
                    value={editingStepData.subject || ''}
                    onChange={(e) => setEditingStepData({...editingStepData, subject: e.target.value})}
                    placeholder="Enter subject line"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Message Content</Label>
                <Textarea 
                  value={editingStepData.content || ''}
                  onChange={(e) => setEditingStepData({...editingStepData, content: e.target.value})}
                  placeholder="Enter your message..."
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">
                  Use [name], [company], etc. for personalization.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Condition (Optional)</Label>
                <Select 
                  value={editingStepData.condition || ''}
                  onValueChange={(value) => setEditingStepData({...editingStepData, condition: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add a condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No condition</SelectItem>
                    <SelectItem value="noreply">If no reply in 3 days</SelectItem>
                    <SelectItem value="opened">If email opened</SelectItem>
                    <SelectItem value="clicked">If link clicked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {editingStepData && editingStepData.type === 'delay' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Days</Label>
                  <Select 
                    value={editingStepData.delay?.split(' ')[0] || '1'}
                    onValueChange={(value) => setEditingStepData({
                      ...editingStepData, 
                      delay: `${value} ${value === '1' ? 'day' : 'days'}`
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 7, 10, 14].map(d => (
                        <SelectItem key={d} value={String(d)}>
                          {d} {d === 1 ? 'day' : 'days'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingStep(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStep}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Save Workflow Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Workflow</DialogTitle>
            <DialogDescription>
              Save this message sequence as a template for future campaigns.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Workflow Name</Label>
              <Input 
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                placeholder="E.g., 'Standard Follow-up Sequence'"
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
      
      {/* Load Workflow Dialog */}
      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Load Saved Workflow</DialogTitle>
            <DialogDescription>
              Choose a previously saved workflow template.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {savedWorkflows.map(workflow => (
              <Button
                key={workflow.id}
                variant="outline"
                className="w-full justify-between"
                onClick={() => handleLoadWorkflow(workflow.id)}
              >
                <span>{workflow.name}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ))}
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

export default MessageSequence;
