
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Save, Loader } from 'lucide-react';
import { campaignData, leadsData } from './mockData';
import CampaignHeader from './CampaignHeader';
import CampaignDescription from './CampaignDescription';
import StatCards from './StatCards';
import ChannelsAndStages from './ChannelsAndStages';
import LeadTracking from './LeadTracking';
import CreateCampaign from '../CreateCampaign';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OutreachSummary from './OutreachSummary';
import MessageSequence from './MessageSequence';
import CampaignReports from './CampaignReports';
import { useToast } from "@/hooks/use-toast";

interface EnhancedLead {
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

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [view, setView] = useState<'table' | 'kanban'>('table');
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<any>(null);
  const [enhancedLeadsData, setEnhancedLeadsData] = useState<EnhancedLead[]>([]);
  
  // Fetch campaign data
  useEffect(() => {
    setLoading(true);
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      const foundCampaign = campaignData.find(c => c.id === Number(id));
      
      if (foundCampaign) {
        // Enhance the campaign with additional data
        const enhancedCampaign = {
          ...foundCampaign,
          contacted: foundCampaign.leads - Math.floor(foundCampaign.leads * 0.15),
          positive: Math.floor(foundCampaign.responses * 0.7),
          negative: Math.floor(foundCampaign.responses * 0.3),
          teamMembers: ['John Smith', 'Sarah Lee', 'Alex Chen', 'Mia Johnson'],
          stages: [
            { id: 1, name: 'Not Contacted', count: 24 },
            { id: 2, name: 'Contacted', count: 15 },
            { id: 3, name: 'Replied', count: 8 },
            { id: 4, name: 'Follow-Up Needed', count: 5 },
            { id: 5, name: 'Positive', count: 3 },
            { id: 6, name: 'Negative', count: 2 },
          ]
        };
        
        setCampaign(enhancedCampaign);
        
        // Enhance mock leads data
        const enhanced: EnhancedLead[] = leadsData.map(lead => ({
          ...lead,
          lastContacted: lead.lastContact,
          currentStage: lead.status,
          assignedTo: Math.random() > 0.5 ? 'John Smith' : 'Sarah Lee',
          followUpDate: Math.random() > 0.5 ? '2023-11-' + Math.floor(Math.random() * 30 + 1) : undefined,
          notes: Math.random() > 0.3 ? 'Last discussion about pricing options. Interested in Enterprise plan.' : '',
        }));
        
        setEnhancedLeadsData(enhanced);
      } else {
        toast({
          title: "Campaign not found",
          description: "The campaign you're looking for doesn't exist.",
          variant: "destructive"
        });
        navigate('/campaigns');
      }
      
      setLoading(false);
    }, 800); // Simulate loading
    
    return () => clearTimeout(timer);
  }, [id, navigate, toast]);
  
  const handleEditCampaign = () => {
    setShowEditModal(true);
  };
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading campaign details...</p>
        </div>
      </div>
    );
  }
  
  if (!campaign) {
    return null; // Should not happen due to navigation in useEffect
  }
  
  return (
    <div className="space-y-6 h-[calc(100vh-6rem)] overflow-y-auto pr-2">
      {/* Campaign header with edit functionality */}
      <CampaignHeader 
        campaign={campaign} 
        onEdit={handleEditCampaign}
      />
      
      {/* Campaign description */}
      {campaign.description && (
        <CampaignDescription description={campaign.description} />
      )}
      
      {/* Stats cards */}
      <StatCards campaign={campaign} />
      
      {/* Campaign details tabs */}
      <Tabs defaultValue="leads">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="leads">Lead Tracking</TabsTrigger>
          <TabsTrigger value="message">Message Sequence</TabsTrigger>
          <TabsTrigger value="outreach">Outreach Summary</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads" className="mt-6">
          {/* Channels and stages */}
          <ChannelsAndStages campaign={campaign} />
          
          {/* Leads tracking */}
          <div className="mt-6">
            <LeadTracking 
              campaign={campaign} 
              leadsData={enhancedLeadsData} 
              view={view} 
              setView={setView} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="message" className="mt-6">
          <MessageSequence />
        </TabsContent>
        
        <TabsContent value="outreach" className="mt-6">
          <OutreachSummary campaign={campaign} teamMembers={campaign.teamMembers} />
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <CampaignReports campaign={campaign} />
        </TabsContent>
      </Tabs>
      
      {/* Edit Campaign Modal */}
      {showEditModal && (
        <CreateCampaign 
          onClose={handleCloseEditModal} 
          existingCampaign={campaign}
        />
      )}
    </div>
  );
};

export default CampaignDetail;
