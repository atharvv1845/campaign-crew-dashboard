import React, { useState, useEffect } from 'react';
import { Plus, Copy, Edit, Trash, Check, Clock, Mail, Search, MessageSquare, Linkedin, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { fetchScriptTemplates, deleteScript } from '@/lib/api/messageApi';

// Types for script templates
export interface MessageScript {
  id: number;
  name: string;
  platform: string;
  subject?: string;
  content: string;
  usageCount: number;
  responseRate: number;
  lastUsed: string;
  campaignId?: number | string;
  campaignName?: string;
  variables?: string[];
  createdAt: string;
}

interface MessageTemplatesProps {
  onEditScript: (script?: MessageScript) => void;
}

const MessageTemplates: React.FC<MessageTemplatesProps> = ({ onEditScript }) => {
  const [templates, setTemplates] = useState<MessageScript[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch templates on component mount
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoading(true);
        const data = await fetchScriptTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to load templates:", error);
        toast({
          title: "Error loading templates",
          description: "Failed to load message templates. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplates();
  }, [toast]);

  // Filter templates based on search and filters
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          template.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampaign = campaignFilter === 'all' || template.campaignName === campaignFilter;
    const matchesPlatform = platformFilter === 'all' || template.platform === platformFilter;
    
    return matchesSearch && matchesCampaign && matchesPlatform;
  });

  // Campaigns (unique list from templates)
  const campaigns = Array.from(new Set(templates.map(t => t.campaignName))).filter(Boolean);

  // Handle copy to clipboard
  const handleCopyScript = (content: string) => {
    navigator.clipboard.writeText(content);
    
    toast({
      title: "Copied to clipboard",
      description: "Message script has been copied to your clipboard",
    });
  };

  // Handle delete script
  const handleDeleteScript = async (id: number) => {
    try {
      await deleteScript(id);
      setTemplates(templates.filter(t => t.id !== id));
      
      toast({
        title: "Script deleted",
        description: "The message script has been deleted",
      });
    } catch (error) {
      console.error("Failed to delete script:", error);
      toast({
        title: "Error deleting script",
        description: "Failed to delete message script. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  // Get platform color
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return 'bg-blue-100 text-blue-800';
      case 'email':
        return 'bg-purple-100 text-purple-800';
      case 'whatsapp':
        return 'bg-green-100 text-green-800';
      case 'facebook':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={campaignFilter} onValueChange={setCampaignFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            {campaigns.map((campaign, index) => (
              <SelectItem key={index} value={campaign || ''}>
                {campaign}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
          </SelectContent>
        </Select>
        
        <Button onClick={() => onEditScript()} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>
      
      {/* No results message */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No templates found. Try adjusting your filters or create a new template.</p>
        </div>
      )}
      
      {/* Templates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-border">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-base">{template.name}</h4>
                  <div className="flex items-center mt-1 gap-1">
                    <Badge variant="outline" className={cn("px-2 py-0.5 text-xs", getPlatformColor(template.platform))}>
                      {getPlatformIcon(template.platform)}
                      <span className="ml-1">{template.platform.charAt(0).toUpperCase() + template.platform.slice(1)}</span>
                    </Badge>
                    {template.campaignName && (
                      <Badge variant="outline" className="px-2 py-0.5 text-xs">
                        {template.campaignName}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleCopyScript(template.content)} title="Copy to clipboard">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEditScript(template)} title="Edit template">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteScript(template.id)} title="Delete template">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {template.subject && (
                <p className="text-sm font-medium mt-2">Subject: {template.subject}</p>
              )}
            </div>
            
            <div className="p-5 border-b border-border">
              <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
              
              {template.variables && template.variables.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {template.variables.map((variable, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {variable}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-5 grid grid-cols-3 gap-2 bg-muted/10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                  <Mail className="h-3 w-3" />
                  <span>Sent</span>
                </div>
                <p className="text-sm font-medium">{template.usageCount.toLocaleString()}</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                  <Check className="h-3 w-3" />
                  <span>Response</span>
                </div>
                <p className="text-sm font-medium">{template.responseRate}%</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                  <Clock className="h-3 w-3" />
                  <span>Last Used</span>
                </div>
                <p className="text-sm font-medium">{template.lastUsed}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MessageTemplates;
