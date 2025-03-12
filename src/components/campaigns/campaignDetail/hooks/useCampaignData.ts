
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { campaignData } from '../../campaignData';
import { useNavigate } from 'react-router-dom';

export const useCampaignData = (id: string | undefined) => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
          console.log('Fetching campaign with ID:', id);
          console.log('Available campaigns:', campaignData.map(c => c.id));
          
          // First try to find by exact id match
          let foundCampaign = campaignData.find(c => c.id === Number(id));
          
          // If not found and we have campaigns, return the first one for demo purposes
          if (!foundCampaign && campaignData.length > 0) {
            console.log('Campaign not found for id:', id, 'showing first campaign instead');
            foundCampaign = campaignData[0];
            
            // Update the URL to match the campaign we're showing
            navigate(`/campaigns/${foundCampaign.id}`, { replace: true });
          }
          
          if (foundCampaign) {
            console.log('Displaying campaign:', foundCampaign);
            setCampaign(foundCampaign);
          } else {
            console.log('No campaigns available');
            toast({
              title: "Error",
              description: "No campaigns available",
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
    } else {
      setLoading(false);
      setCampaign(null);
    }
  }, [id, toast, refreshTrigger, navigate]);

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
