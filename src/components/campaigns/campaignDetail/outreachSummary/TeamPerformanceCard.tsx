
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from 'lucide-react';
import { useTeamStore } from '@/hooks/useTeamStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeamMemberPerformance {
  member: string;
  memberId: string;
  responses: number;
  positive: number;
}

interface TeamPerformanceCardProps {
  teamPerformance: TeamMemberPerformance[];
}

const TeamPerformanceCard: React.FC<TeamPerformanceCardProps> = ({ teamPerformance }) => {
  const { teamMembers } = useTeamStore();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  const getMemberAvatar = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    return {
      name: member?.name || "Team Member",
      avatar: member?.avatar || ""
    };
  };

  // If there are no teamPerformance data or no team members, show empty state
  if (teamPerformance.length === 0 || teamMembers.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-sm text-muted-foreground">
            No team performance data available.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Team Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamPerformance.map((member, index) => {
            // Calculate positive response rate
            const positiveRate = Math.round((member.positive / member.responses) * 100);
            const memberDetails = getMemberAvatar(member.memberId);
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={memberDetails.avatar} />
                      <AvatarFallback className="text-xs">
                        {getInitials(memberDetails.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{member.member}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-muted/30 px-2 py-0.5 rounded-full">
                      {member.responses} responses
                    </span>
                    <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">
                      {positiveRate}% positive
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${positiveRate}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPerformanceCard;
