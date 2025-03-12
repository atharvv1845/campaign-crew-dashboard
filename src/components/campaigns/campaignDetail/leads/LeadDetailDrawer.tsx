
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Building2,
  Mail,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StageBadge from '../badges/StageBadge';
import { DetailDrawerProps } from './types/interactions';
import { useInteractions } from './hooks/useInteractions';
import OverviewTab from './components/drawer/OverviewTab';
import InteractionsTab from './components/drawer/InteractionsTab';
import DetailsTab from './components/drawer/DetailsTab';

const LeadDetailDrawer: React.FC<DetailDrawerProps> = ({
  lead,
  open,
  onClose,
  campaign,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { interactions, logInteraction } = useInteractions();

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
          <TabsContent value="overview">
            <OverviewTab 
              lead={lead} 
              interactions={interactions}
              onViewAllInteractions={() => setActiveTab('interactions')}
            />
          </TabsContent>
          
          {/* Interactions Tab */}
          <TabsContent value="interactions">
            <InteractionsTab 
              interactions={interactions} 
              onLogInteraction={logInteraction}
            />
          </TabsContent>
          
          {/* Details Tab */}
          <TabsContent value="details">
            <DetailsTab lead={lead} campaign={campaign} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default LeadDetailDrawer;
