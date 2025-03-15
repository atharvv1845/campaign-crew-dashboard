
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Linkedin, Twitter, Instagram, Facebook, MessageSquare, Phone, AlertCircle, Clock, Plus, Send } from 'lucide-react';
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
  const [showCustomPlatform, setShowCustomPlatform] = useState<boolean>(false);
  const [customPlatform, setCustomPlatform] = useState<string>("");

  // Reset local state when step changes
  useEffect(() => {
    setLocalStep(step);
    setUseTemplate(false);
    setActiveTab("content");
    setShowCustomPlatform(false);
    setCustomPlatform("");
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

  const handleAddCustomPlatform = () => {
    if (customPlatform.trim()) {
      updateLocalStep({ platform: customPlatform.toLowerCase().trim() });
      setShowCustomPlatform(false);
      
      // Save custom platform to localStorage for future use
      const savedPlatforms = JSON.parse(localStorage.getItem('customPlatforms') || '[]');
      if (!savedPlatforms.includes(customPlatform.toLowerCase().trim())) {
        savedPlatforms.push(customPlatform.toLowerCase().trim());
        localStorage.setItem('customPlatforms', JSON.stringify(savedPlatforms));
      }
    }
  };

  // Get all platforms including custom ones from localStorage
  const getCustomPlatforms = () => {
    try {
      return JSON.parse(localStorage.getItem('customPlatforms') || '[]');
    } catch (error) {
      console.error("Error loading custom platforms:", error);
      return [];
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
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'telegram':
        return <Send className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  // Load custom platforms
  const customPlatforms = getCustomPlatforms();

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
                  {!showCustomPlatform ? (
                    <>
                      <Select 
                        value={localStep.platform || 'email'}
                        onValueChange={(value) => {
                          if (value === "custom") {
                            setShowCustomPlatform(true);
                          } else {
                            updateLocalStep({ platform: value });
                          }
                        }}
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
                          <SelectItem value="twitter">
                            <div className="flex items-center">
                              <Twitter className="h-4 w-4 mr-2" />
                              <span>Twitter</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="instagram">
                            <div className="flex items-center">
                              <Instagram className="h-4 w-4 mr-2" />
                              <span>Instagram</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="facebook">
                            <div className="flex items-center">
                              <Facebook className="h-4 w-4 mr-2" />
                              <span>Facebook</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="whatsapp">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              <span>WhatsApp</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="telegram">
                            <div className="flex items-center">
                              <Send className="h-4 w-4 mr-2" />
                              <span>Telegram</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="sms">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              <span>SMS</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="call">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              <span>Call</span>
                            </div>
                          </SelectItem>
                          
                          {/* Display saved custom platforms */}
                          {customPlatforms.map((platform: string) => (
                            <SelectItem key={platform} value={platform}>
                              <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                <span className="capitalize">{platform}</span>
                              </div>
                            </SelectItem>
                          ))}
                          
                          <SelectItem value="custom">
                            <div className="flex items-center text-primary">
                              <Plus className="h-4 w-4 mr-2" />
                              <span>Add Custom Platform</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <Input 
                        value={customPlatform}
                        onChange={(e) => setCustomPlatform(e.target.value)}
                        placeholder="Enter platform name"
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={handleAddCustomPlatform}
                        disabled={!customPlatform.trim()}
                      >
                        Add
                      </Button>
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setShowCustomPlatform(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
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
