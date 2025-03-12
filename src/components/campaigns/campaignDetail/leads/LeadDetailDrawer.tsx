
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Calendar,
  Mail,
  Phone,
  Building2,
  Clock,
  MessageSquare,
  User,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StageBadge from '../badges/StageBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Interaction {
  id: number;
  type: 'email' | 'call' | 'meeting' | 'message';
  date: string;
  description: string;
  user: string;
}

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  linkedin?: string;
  whatsapp?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  lastContacted: string;
  currentStage: string;
  assignedTo: string;
  followUpDate?: string;
  notes?: string;
}

interface Campaign {
  stages: Array<{
    id: number;
    name: string;
    count: number;
  }>;
  leads: number;
  teamMembers?: string[];
}

interface LeadDetailDrawerProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  campaign: Campaign;
}

const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  open,
  onClose,
  campaign,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock interaction history
  const [interactions, setInteractions] = useState<Interaction[]>([
    {
      id: 1,
      type: 'email',
      date: '2023-10-15',
      description: 'Sent initial outreach email',
      user: 'John Smith',
    },
    {
      id: 2,
      type: 'call',
      date: '2023-10-18',
      description: 'Had an introductory call about our product',
      user: 'Sarah Lee',
    },
  ]);
  
  // Function to log a new interaction
  const logInteraction = (type: 'email' | 'call' | 'meeting' | 'message', description: string) => {
    const newInteraction: Interaction = {
      id: interactions.length + 1,
      type,
      date: new Date().toISOString().split('T')[0],
      description,
      user: 'Current User', // In a real app, this would be the current user
    };
    
    setInteractions([...interactions, newInteraction]);
    
    toast({
      title: "Interaction logged",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been recorded.`,
    });
  };
  
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'meeting':
        return <Calendar className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md md:max-w-lg w-full overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl">{lead.name}</SheetTitle>
          <SheetDescription className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>{lead.company}</span>
            <StageBadge stage={lead.currentStage} />
          </SheetDescription>
          <div className="mt-1 flex flex-wrap gap-2">
            {lead.email && (
              <a 
                href={`mailto:${lead.email}`} 
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                {lead.email}
              </a>
            )}
            {lead.linkedin && (
              <a 
                href={lead.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-indigo-500 hover:underline"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            )}
            {/* Add other social media links here */}
          </div>
        </SheetHeader>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.assignedTo}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Last Contacted</h3>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.lastContacted}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Follow-up Date</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.followUpDate || 'Not set'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Current Stage</h3>
                <StageBadge stage={lead.currentStage} />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
              <div className="p-3 bg-muted/20 rounded-md text-sm">
                {lead.notes || 'No notes available.'}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Recent Interactions</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary"
                  onClick={() => setActiveTab('interactions')}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-2">
                {interactions.slice(-2).map(interaction => (
                  <div key={interaction.id} className="flex items-start gap-3 p-2 bg-muted/10 rounded-md">
                    <div className="mt-0.5">
                      {getInteractionIcon(interaction.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">{interaction.date}</span>
                      </div>
                      <p className="text-sm">{interaction.description}</p>
                      <div className="text-xs text-muted-foreground mt-1">by {interaction.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="default" 
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "Email drafted",
                    description: "Redirecting to email composer.",
                  });
                }}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "Call initiated",
                    description: "Opening call dialog.",
                  });
                }}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </TabsContent>
          
          {/* Interactions Tab */}
          <TabsContent value="interactions" className="mt-4 space-y-4">
            <div className="flex justify-between">
              <h3 className="text-base font-medium">Interaction History</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // In a real app, this would open a dialog to log a new interaction
                  const type = 'call';
                  const description = 'Had a follow-up call about pricing options';
                  logInteraction(type, description);
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Log Interaction
              </Button>
            </div>
            
            <div className="space-y-3">
              {interactions.map(interaction => (
                <div key={interaction.id} className="flex items-start gap-3 p-3 bg-muted/10 rounded-md">
                  <div className="mt-0.5">
                    {getInteractionIcon(interaction.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">{interaction.date}</span>
                    </div>
                    <p className="text-sm">{interaction.description}</p>
                    <div className="text-xs text-muted-foreground mt-1">by {interaction.user}</div>
                  </div>
                </div>
              ))}
              
              {interactions.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No interactions recorded yet.
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Details Tab */}
          <TabsContent value="details" className="mt-4 space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">Name</h3>
                  <div className="text-sm">{lead.name}</div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">Company</h3>
                  <div className="text-sm">{lead.company}</div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">Email</h3>
                  <div className="text-sm">{lead.email}</div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">LinkedIn</h3>
                  <div className="text-sm">{lead.linkedin || 'Not available'}</div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">WhatsApp</h3>
                  <div className="text-sm">{lead.whatsapp || 'Not available'}</div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">Twitter</h3>
                  <div className="text-sm">{lead.twitter || 'Not available'}</div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">Instagram</h3>
                  <div className="text-sm">{lead.instagram || 'Not available'}</div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground">Facebook</h3>
                  <div className="text-sm">{lead.facebook || 'Not available'}</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Campaign Information</h3>
                <div className="bg-muted/10 p-3 rounded-md">
                  <p className="text-sm mb-1">
                    <span className="font-medium">Current Stage:</span> {lead.currentStage}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Assigned To:</span> {lead.assignedTo}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Last Contacted:</span> {lead.lastContacted}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    toast({
                      title: "Lead updated",
                      description: "Lead information has been updated.",
                    });
                  }}
                >
                  Update Details
                </Button>
                <SheetClose asChild>
                  <Button variant="ghost">Close</Button>
                </SheetClose>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default LeadDetailDrawer;
