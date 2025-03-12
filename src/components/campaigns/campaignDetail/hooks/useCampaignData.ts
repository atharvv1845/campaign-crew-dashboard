import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { campaignData } from '../../campaignData';
import { useNavigate } from 'react-router-dom';

export const useCampaignData = (id: string | undefined) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const refreshCampaign = useCallback(() => {
    if (!isFetching) {
      setRefreshTrigger(prev => prev + 1);
    }
  }, [isFetching]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setCampaign(null);
      return;
    }

    const fetchCampaign = async () => {
      if (isFetching) return;
      
      setIsFetching(true);
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
            
            // Process leads data appropriately
            let leadsData = [];
            
            // If we have proper lead objects in leadsData, use those
            if (foundCampaign.leadsData && Array.isArray(foundCampaign.leadsData)) {
              leadsData = foundCampaign.leadsData;
            } 
            // If leads is an array of lead objects, use those
            else if (Array.isArray(foundCampaign.leads) && 
                     foundCampaign.leads.length > 0 && 
                     typeof foundCampaign.leads[0] !== 'number') {
              leadsData = foundCampaign.leads;
            }
            // Otherwise, leadsData remains an empty array
              
            // Ensure all required fields are present to prevent errors
            const sanitizedCampaign = {
              ...foundCampaign,
              id: foundCampaign.id,
              name: foundCampaign.name || 'Untitled Campaign',
              description: foundCampaign.description || '',
              channels: foundCampaign.channels || [],
              teamMembers: foundCampaign.teamMembers || [],
              createdAt: foundCampaign.createdAt || new Date().toISOString().slice(0, 10),
              leads: foundCampaign.leads || 0,
              leadsData: leadsData,
              responses: foundCampaign.responses || 0,
              positive: foundCampaign.positive || 0,
              negative: foundCampaign.negative || 0,
              conversion: foundCampaign.conversion || '0%',
              stages: foundCampaign.stages || [],
              messageFlow: foundCampaign.messageFlow || { nodes: [], edges: [] }
            };
            
            setCampaign(sanitizedCampaign);
          } else {
            console.log('No campaigns available');
            toast({
              title: "Error",
              description: "No campaigns available",
              variant: "destructive",
            });
          }
          setLoading(false);
          setIsFetching(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        toast({
          title: "Error",
          description: "Failed to load campaign details",
          variant: "destructive",
        });
        setLoading(false);
        setIsFetching(false);
      }
    };

    fetchCampaign();
  }, [id, toast, refreshTrigger, navigate]);

  const updateCampaign = useCallback((updatedData: Partial<any>) => {
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
  }, [campaign, id, toast]);

  return { loading, campaign, refreshCampaign, updateCampaign };
};
