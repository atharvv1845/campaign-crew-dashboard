import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import CampaignHeader from './CampaignHeader';
import CampaignDescription from './CampaignDescription';
import StatCards from './StatCards';
import LeadTracking from './LeadTracking';
import MessageSequence from './MessageSequence';
import { OutreachSummary } from './outreachSummary';
import ChannelsAndStages from './ChannelsAndStages';
import CampaignReports from './CampaignReports';
import CampaignExportImport from './components/CampaignExportImport';
import { campaignData } from '../campaignData';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<any>(null);
  const [view, setView] = useState<'table' | 'kanban'>('table');
  
  const handleEditCampaign = () => {
    toast({
      title: "Edit Campaign",
      description: "Campaign editing feature is not yet implemented.",
    });
  };

  const handleExportCampaign = () => {
    toast({
      title: "Export Campaign",
      description: "Campaign export feature is not yet implemented.",
    });
  };

  const handleImportCampaign = () => {
    toast({
      title: "Import Campaign",
      description: "Campaign import feature is not yet implemented.",
    });
  };

  useEffect(() => {
    const fetchCampaign = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
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
      <CampaignHeader 
        campaign={campaign} 
        onEditCampaign={handleEditCampaign}
        onExportCampaign={handleExportCampaign}
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-3xl grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <StatCards campaign={campaign} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CampaignDescription data={campaign} />
            <ChannelsAndStages campaign={campaign} />
          </div>
          <Separator />
          <OutreachSummary campaign={campaign} />
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <LeadTracking campaign={campaign} />
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <MessageSequence />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <CampaignReports campaign={campaign} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <CampaignExportImport 
            campaign={campaign}
            onExportCampaign={handleExportCampaign}
            onImportCampaign={handleImportCampaign}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignDetail;
