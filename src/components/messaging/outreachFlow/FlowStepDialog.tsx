
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Linkedin, MessageSquare, Phone, AlertCircle, Clock } from 'lucide-react';
import { FlowStep } from '../OutreachFlow';
import { MessageScript } from '../MessageTemplates';

interface FlowStepDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: FlowStep;
  onSave: (step: FlowStep) => void;
  templates: MessageScript[];
  isLoading: boolean;
}

const FlowStepDialog: React.FC<FlowStepDialogProps> = ({
  open,
  onOpenChange,
  step,
  onSave,
  templates,
  isLoading
}) => {
  const [localStep, setLocalStep] = useState<FlowStep>(step);
  const [activeTab, setActiveTab] = useState<string>("content");
  const [useTemplate, setUseTemplate] = useState<boolean>(false);

  // Reset local state when step changes
  useEffect(() => {
    setLocalStep(step);
    setUseTemplate(false);
    setActiveTab("content");
  }, [step]);

  const handleSave = () => {
    onSave(localStep);
  };

  const updateLocalStep = (update: Partial<FlowStep>) => {
    setLocalStep(current => ({ ...current, ...update }));
  };

  const handleTemplateSelect = (templateId: number) => {
    const selectedTemplate = templates.find(t => t.id === templateId);
    if (selectedTemplate) {
      updateLocalStep({
        templateId,
        content: selectedTemplate.content,
        subject: selectedTemplate.subject,
        platform: selectedTemplate.platform
      });
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {step.id === 0 ? 'Add New Step' : 'Edit Step'}
          </DialogTitle>
        </DialogHeader>

        {step.type === 'message' && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="content">Message Content</TabsTrigger>
              <TabsTrigger value="template">Use Template</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select 
                    value={localStep.platform || 'email'}
                    onValueChange={(value) => updateLocalStep({ platform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>Email</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="linkedin">
                        <div className="flex items-center">
                          <Linkedin className="h-4 w-4 mr-2" />
                          <span>LinkedIn</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="whatsapp">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          <span>WhatsApp</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="call">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>Call</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {localStep.platform === 'email' && (
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input
                      value={localStep.subject || ''}
                      onChange={(e) => updateLocalStep({ subject: e.target.value })}
                      placeholder="Email subject line"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Message Content</Label>
                <Textarea
                  value={localStep.content || ''}
                  onChange={(e) => updateLocalStep({ content: e.target.value })}
                  placeholder="Enter your message content..."
                  rows={7}
                  className="h-[200px]"
                />
                <p className="text-xs text-muted-foreground">
                  Use variables like {"{firstName}"}, {"{company}"} for personalization.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="template" className="space-y-4">
              <div className="space-y-2">
                <Label>Select Template</Label>
                <Select 
                  onValueChange={(value) => handleTemplateSelect(Number(value))}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id.toString()}>
                        <div className="flex items-center">
                          {getPlatformIcon(template.platform)}
                          <span className="ml-2">{template.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {isLoading && (
                  <p className="text-xs text-muted-foreground">Loading templates...</p>
                )}
              </div>

              {localStep.templateId && (
                <div className="border rounded-md p-3 mt-2">
                  <p className="text-sm font-medium mb-1">Preview:</p>
                  {localStep.subject && (
                    <p className="text-sm mb-2">Subject: {localStep.subject}</p>
                  )}
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {localStep.content}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {step.type === 'delay' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Delay Duration</Label>
              <Select 
                value={localStep.delay || '1 day'}
                onValueChange={(value) => updateLocalStep({ delay: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select delay" />
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
              <p className="text-xs text-muted-foreground">
                The system will wait this amount of time before proceeding to the next step.
              </p>
            </div>
          </div>
        )}

        {step.type === 'condition' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Condition Type</Label>
              <Select 
                value={localStep.condition || 'noreply'}
                onValueChange={(value) => updateLocalStep({ condition: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noreply">If No Reply</SelectItem>
                  <SelectItem value="opened">If Message Opened</SelectItem>
                  <SelectItem value="clicked">If Link Clicked</SelectItem>
                  <SelectItem value="replied">If Replied</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This condition will determine whether to proceed with the next steps.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlowStepDialog;
