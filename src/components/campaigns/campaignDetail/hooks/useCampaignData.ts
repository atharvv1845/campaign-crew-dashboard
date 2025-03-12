
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { campaignData } from '../../campaignData';

export const useCampaignData = (id: string | undefined) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshCampaign = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const fetchCampaign = async () => {
      setLoading(true);
      try {
        // Simulate API call with setTimeout
        setTimeout(() => {
          const foundCampaign = campaignData.find(c => c.id === Number(id));
          
          if (foundCampaign) {
            console.log('Found campaign:', foundCampaign);
            setCampaign(foundCampaign);
          } else {
            console.log('Campaign not found for id:', id);
            toast({
              title: "Error",
              description: "Campaign not found",
              variant: "destructive",
            });
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        toast({
          title: "Error",
          description: "Failed to load campaign details",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    if (id) {
      fetchCampaign();
    }
  }, [id, toast, refreshTrigger]);

  const updateCampaign = (updatedData: Partial<any>) => {
    if (!campaign) return;
    
    const campaignIndex = campaignData.findIndex(c => c.id === Number(id));
    if (campaignIndex === -1) return;
    
    // Update the campaign in the global data
    const updatedCampaign = {
      ...campaignData[campaignIndex],
      ...updatedData
    };
    
    campaignData[campaignIndex] = updatedCampaign;
    setCampaign(updatedCampaign);
    
    toast({
      title: "Campaign Updated",
      description: "The campaign has been updated successfully."
    });
  };

  return { loading, campaign, refreshCampaign, updateCampaign };
};
