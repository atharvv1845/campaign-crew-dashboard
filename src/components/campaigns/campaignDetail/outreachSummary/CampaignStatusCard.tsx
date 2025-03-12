
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Users, Calendar } from 'lucide-react';

interface CampaignStatusCardProps {
  campaign: {
    status: string;
    createdAt: string;
  };
  teamMembers?: string[];
}

const CampaignStatusCard: React.FC<CampaignStatusCardProps> = ({ 
  campaign, 
  teamMembers = [] 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground font-medium">Campaign Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-sm">Status</span>
            </div>
            <span className="font-medium">{campaign.status}</span>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">Team Members</span>
            </div>
            <span className="font-medium">{teamMembers?.length || 0}</span>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
              <span className="text-sm">Created</span>
            </div>
            <span className="font-medium">{campaign.createdAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignStatusCard;
