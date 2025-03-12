
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from 'lucide-react';

interface TeamMemberPerformance {
  member: string;
  responses: number;
  positive: number;
}

interface TeamPerformanceCardProps {
  teamPerformance: TeamMemberPerformance[];
}

const TeamPerformanceCard: React.FC<TeamPerformanceCardProps> = ({ teamPerformance }) => {
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
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{member.member}</span>
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
