
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [view, setView] = useState<'table' | 'kanban'>('table');
  const [showEditModal, setShowEditModal] = useState(false);
  
  // In a real app, we'd fetch the campaign data based on the ID
  // For now, we'll just use our mock data
  const campaign = {
    ...campaignData,
    teamMembers: ['John Smith', 'Sarah Lee', 'Alex Chen', 'Mia Johnson'], // Add team members for dropdown assignments
    stages: [
      { id: 1, name: 'Not Contacted', count: 24 },
      { id: 2, name: 'Contacted', count: 15 },
      { id: 3, name: 'Replied', count: 8 },
      { id: 4, name: 'Follow-Up Needed', count: 5 },
      { id: 5, name: 'Positive', count: 3 },
      { id: 6, name: 'Negative', count: 2 },
    ]
  };
  
  // Enhance mock leads data with follow-up dates and notes
  const enhancedLeadsData = leadsData.map(lead => ({
    ...lead,
    followUpDate: Math.random() > 0.5 ? '2023-11-' + Math.floor(Math.random() * 30 + 1) : undefined,
    notes: Math.random() > 0.3 ? 'Last discussion about pricing options. Interested in Enterprise plan.' : '',
  }));
  
  const handleEditCampaign = () => {
    setShowEditModal(true);
  };
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leads">Lead Tracking</TabsTrigger>
          <TabsTrigger value="message">Message Sequence</TabsTrigger>
          <TabsTrigger value="outreach">Outreach Summary</TabsTrigger>
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
      </Tabs>
      
      {/* Edit Campaign Modal */}
      {showEditModal && (
        <CreateCampaign onClose={handleCloseEditModal} />
      )}
    </div>
  );
};

export default CampaignDetail;
