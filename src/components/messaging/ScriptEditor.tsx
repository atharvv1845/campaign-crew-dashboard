
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Send, Save, ChevronLeft, Plus, X, Mail, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MessageScript } from './MessageTemplates';

interface ScriptEditorProps {
  editingScript?: MessageScript;
  onSaveComplete: () => void;
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({ editingScript, onSaveComplete }) => {
  // State for form fields
  const [scriptName, setScriptName] = useState('');
  const [platform, setPlatform] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [variables, setVariables] = useState<string[]>([]);
  const [newVariable, setNewVariable] = useState('');
  const [activeTab, setActiveTab] = useState('edit');
  const [showCustomPlatform, setShowCustomPlatform] = useState(false);
  const [customPlatform, setCustomPlatform] = useState('');
  
  const { toast } = useToast();

  // Populate form when editing an existing script
  useEffect(() => {
    if (editingScript) {
      setScriptName(editingScript.name);
      setPlatform(editingScript.platform);
      setSubject(editingScript.subject || '');
      setContent(editingScript.content);
      setCampaignName(editingScript.campaignName || '');
      setVariables(editingScript.variables || []);
    }
  }, [editingScript]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!scriptName.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a name for your script",
        variant: "destructive"
      });
      return;
    }
    
    if (!platform) {
      toast({
        title: "Missing information",
        description: "Please select a platform for your script",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Missing information",
        description: "Please add some content to your script",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send data to an API
    // For now, we'll just show a success toast
    toast({
      title: editingScript ? "Script updated" : "Script created",
      description: `Your outreach script "${scriptName}" has been ${editingScript ? 'updated' : 'saved'} successfully.`,
    });
    
    // Return to templates list
    onSaveComplete();
  };

  // Add a variable
  const addVariable = () => {
    if (!newVariable.trim()) return;
    
    // Format as {variableName}
    let formattedVar = newVariable.trim();
    if (!formattedVar.startsWith('{')) formattedVar = '{' + formattedVar;
    if (!formattedVar.endsWith('}')) formattedVar = formattedVar + '}';
    
    // Don't add duplicates
    if (variables.includes(formattedVar)) {
      toast({
        title: "Duplicate variable",
        description: "This variable already exists",
        variant: "destructive"
      });
      return;
    }
    
    setVariables([...variables, formattedVar]);
    setNewVariable('');
  };

  // Remove a variable
  const removeVariable = (variable: string) => {
    setVariables(variables.filter(v => v !== variable));
  };

  // Insert a variable at cursor position
  const insertVariable = (variable: string) => {
    // Get the textarea element
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Insert the variable at cursor position
    const newContent = content.substring(0, start) + variable + content.substring(end);
    setContent(newContent);
    
    // Focus back on textarea and place cursor after the inserted variable
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + variable.length;
      textarea.selectionEnd = start + variable.length;
    }, 0);
  };

  // Handle adding custom platform
  const handleAddCustomPlatform = () => {
    if (!customPlatform.trim()) return;
    
    setPlatform(customPlatform.toLowerCase().trim());
    setShowCustomPlatform(false);
    
    // Save custom platform to localStorage for future use
    const savedPlatforms = JSON.parse(localStorage.getItem('customPlatforms') || '[]');
    if (!savedPlatforms.includes(customPlatform.toLowerCase().trim())) {
      savedPlatforms.push(customPlatform.toLowerCase().trim());
      localStorage.setItem('customPlatforms', JSON.stringify(savedPlatforms));
    }
  };

  // Get custom platforms from localStorage
  const getCustomPlatforms = () => {
    try {
      return JSON.parse(localStorage.getItem('customPlatforms') || '[]');
    } catch (error) {
      console.error("Error loading custom platforms:", error);
      return [];
    }
  };

  // Mock campaigns for dropdown
  const campaigns = [
    "Tech Startup Outreach",
    "Enterprise Outreach",
    "SMB Campaign",
    "Social Media Promotion"
  ];
  
  // Load custom platforms
  const customPlatforms = getCustomPlatforms();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onSaveComplete}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Templates
        </Button>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <TabsContent value="edit" className="mt-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  value={scriptName}
                  onChange={(e) => setScriptName(e.target.value)}
                  placeholder="e.g., LinkedIn First Outreach"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                {!showCustomPlatform ? (
                  <Select value={platform} onValueChange={(value) => {
                    if (value === "custom") {
                      setShowCustomPlatform(true);
                    } else {
                      setPlatform(value);
                    }
                  }}>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">
                        <div className="flex items-center">
                          <Linkedin className="h-4 w-4 mr-2" />
                          <span>LinkedIn</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="email">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>Email</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="whatsapp">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          <span>WhatsApp</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="facebook">
                        <div className="flex items-center">
                          <Facebook className="h-4 w-4 mr-2" />
                          <span>Facebook</span>
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
                      <SelectItem value="phone">
                        <div className="flex items-center">
                          <Send className="h-4 w-4 mr-2" />
                          <span>Phone Call</span>
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign</Label>
              <Select value={campaignName} onValueChange={setCampaignName}>
                <SelectTrigger id="campaign">
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map((campaign, index) => (
                    <SelectItem key={index} value={campaign}>
                      {campaign}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {(platform === 'email' || platform === '') && (
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Opportunity for collaboration with {company}"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="content">Message Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your message here. Use variables like {firstName} for personalization."
                className="min-h-[200px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Personalization Variables</Label>
              <div className="flex gap-2">
                <Input
                  value={newVariable}
                  onChange={(e) => setNewVariable(e.target.value)}
                  placeholder="e.g., firstName"
                  className="flex-grow"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addVariable())}
                />
                <Button type="button" onClick={addVariable}>
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              
              {variables.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Click to insert at cursor position:</p>
                  <div className="flex flex-wrap gap-2">
                    {variables.map((variable, index) => (
                      <Badge 
                        key={index} 
                        className="cursor-pointer flex items-center"
                        onClick={() => insertVariable(variable)}
                      >
                        {variable}
                        <button 
                          type="button"
                          className="ml-1 hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeVariable(variable);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-0 space-y-4">
            <Card className="p-4 bg-muted/20">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Preview ({platform || 'Message'})</h3>
              </div>
              
              {subject && (
                <div className="border-b pb-2 mb-2">
                  <p className="font-medium">Subject: {subject}</p>
                </div>
              )}
              
              <div className="whitespace-pre-line">
                {content || <span className="text-muted-foreground">No content added yet</span>}
              </div>
              
              {variables.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Personalization Variables:</p>
                  <div className="flex flex-wrap gap-1">
                    {variables.map((variable, index) => (
                      <Badge key={index} variant="secondary">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
            
            <div className="border rounded-md p-4 bg-muted/10">
              <h3 className="font-medium mb-2">Example with Data:</h3>
              <p className="text-sm mb-4">Here's how your message would look with sample data:</p>
              
              {subject && (
                <div className="border-b pb-2 mb-2">
                  <p className="font-medium">
                    Subject: {subject
                      .replace(/\{firstName\}/g, 'John')
                      .replace(/\{company\}/g, 'Acme Inc')
                      .replace(/\{industry\}/g, 'technology')
                    }
                  </p>
                </div>
              )}
              
              <div className="whitespace-pre-line">
                {content
                  ? content
                      .replace(/\{firstName\}/g, 'John')
                      .replace(/\{company\}/g, 'Acme Inc')
                      .replace(/\{industry\}/g, 'technology')
                      .replace(/\{benefit\}/g, '30% increase in leads')
                  : <span className="text-muted-foreground">No content added yet</span>
                }
              </div>
            </div>
          </TabsContent>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onSaveComplete}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default ScriptEditor;
