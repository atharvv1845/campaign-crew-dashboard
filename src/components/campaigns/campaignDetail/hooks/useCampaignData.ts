
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { campaignData } from '../../campaignData';

export const useCampaignData = (id: string | undefined) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<any>(null);

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

  return { loading, campaign };
};
