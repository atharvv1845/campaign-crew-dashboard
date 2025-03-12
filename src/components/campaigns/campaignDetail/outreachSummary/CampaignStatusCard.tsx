
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CampaignStatusCardProps {
  campaign: any;
  teamMembers?: string[];
}

const CampaignStatusCard: React.FC<CampaignStatusCardProps> = ({ campaign, teamMembers = [] }) => {
  const { toast } = useToast();
  
  const handleAddTeamMember = () => {
    toast({
      title: "Add team member",
      description: "Opening team member selection dialog.",
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <Briefcase className="h-4 w-4 mr-2" />
          Campaign Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Created on</span>
          </div>
          <span className="text-sm">{campaign.createdAt}</span>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Team Members</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-xs bg-muted/20 px-2 py-1 rounded-full">
                {member}
              </div>
            ))}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full h-6 text-xs"
              onClick={handleAddTeamMember}
            >
              + Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignStatusCard;
