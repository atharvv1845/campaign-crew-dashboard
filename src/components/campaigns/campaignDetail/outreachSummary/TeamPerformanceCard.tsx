
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <CardTitle className="text-sm text-muted-foreground font-medium">Team Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamPerformance.map((member, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {member.member.split(' ').map(name => name[0]).join('')}
                  </div>
                  <span className="ml-2 font-medium">{member.member}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">{member.responses}</span> responses
                  (<span className="text-green-500">{member.positive}</span> positive)
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(member.responses / 30) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPerformanceCard;
