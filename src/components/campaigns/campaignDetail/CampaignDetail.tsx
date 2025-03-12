
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CampaignHeader from './CampaignHeader';
import CampaignDescription from './CampaignDescription';
import StatCards from './StatCards';
import LeadTracking from './LeadTracking';
import MessageSequence from './MessageSequence';
import OutreachSummary from './outreachSummary'; // Import as default
import ChannelsAndStages from './ChannelsAndStages';
import CampaignReports from './CampaignReports';
import CampaignExportImport from './components/CampaignExportImport';
import { campaignData } from '../campaignData';
import { leadsData } from './mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<any>(null);
  const [view, setView] = useState<'table' | 'kanban'>('table');
  
  const handleEditCampaign = () => {
    // Edit campaign logic would go here
    toast({
      title: "Edit Campaign",
      description: "Campaign editing feature is not yet implemented.",
    });
  };
  
  useEffect(() => {
    // Simulate API call to fetch campaign details
    const fetchCampaign = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          // Find the campaign by ID
          const campaignById = campaignData.find(c => c.id === parseInt(id || '0'));
          
          if (campaignById) {
            setCampaign(campaignById);
          } else {
            toast({
              title: "Error",
              description: "Campaign not found",
              variant: "destructive",
            });
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load campaign details",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium">Campaign not found</h3>
          <p className="text-muted-foreground">The campaign you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <CampaignHeader campaign={campaign} onEdit={handleEditCampaign} />
        <CampaignExportImport campaignId={campaign.id} />
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="sequence">Message Sequence</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <StatCards campaign={campaign} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CampaignDescription campaign={campaign} />
            <ChannelsAndStages campaign={campaign} />
          </div>
          <Separator />
          <OutreachSummary campaignId={campaign.id} />
        </TabsContent>
        
        <TabsContent value="leads" className="space-y-6">
          <LeadTracking 
            campaign={campaign} 
            leadsData={leadsData} 
            view={view} 
            setView={setView} 
          />
        </TabsContent>
        
        <TabsContent value="sequence" className="space-y-6">
          <MessageSequence />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <CampaignReports campaign={campaign} />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Campaign Settings</h2>
            <p className="text-muted-foreground">
              Configure your campaign settings, notifications, and automation rules.
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Export & Import</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Download your campaign configuration or upload a previously exported one.
              </p>
              <CampaignExportImport campaignId={campaign.id} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignDetail;
