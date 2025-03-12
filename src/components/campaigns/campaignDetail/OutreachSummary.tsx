
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, ThumbsUp, ThumbsDown, Clock, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface OutreachSummaryProps {
  campaign: any;
  teamMembers?: string[];
}

const OutreachSummary: React.FC<OutreachSummaryProps> = ({ campaign, teamMembers = [] }) => {
  // Mock data for outreach summary
  const outreachData = {
    today: 12,
    thisWeek: 68,
    thisMonth: 253,
    responseRate: 31,
    positiveResponses: 42,
    negativeResponses: 19,
    notReplied: 192,
    teamPerformance: [
      { member: 'John Smith', responses: 24, positive: 18 },
      { member: 'Sarah Lee', responses: 20, positive: 12 },
      { member: 'Alex Chen', responses: 16, positive: 8 },
      { member: 'Mia Johnson', responses: 12, positive: 4 },
    ]
  };
  
  const calculateProgress = (positive: number, negative: number, total: number) => {
    return {
      positive: (positive / total) * 100,
      negative: (negative / total) * 100,
      notReplied: ((total - positive - negative) / total) * 100,
    };
  };
  
  const progress = calculateProgress(
    outreachData.positiveResponses, 
    outreachData.negativeResponses, 
    outreachData.positiveResponses + outreachData.negativeResponses + outreachData.notReplied
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Outreach Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Leads Contacted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Today</span>
                </div>
                <p className="text-xl font-semibold">{outreachData.today}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Week</span>
                </div>
                <p className="text-xl font-semibold">{outreachData.thisWeek}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Month</span>
                </div>
                <p className="text-xl font-semibold">{outreachData.thisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Response Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                    <span className="text-sm">Positive</span>
                  </div>
                  <p className="text-lg font-semibold">{outreachData.positiveResponses}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    <span className="text-sm">Negative</span>
                  </div>
                  <p className="text-lg font-semibold">{outreachData.negativeResponses}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300 mr-2" />
                    <span className="text-sm">No Reply</span>
                  </div>
                  <p className="text-lg font-semibold">{outreachData.notReplied}</p>
                </div>
              </div>
              
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden flex">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${progress.positive}%` }}
                />
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${progress.negative}%` }}
                />
                <div
                  className="h-full bg-gray-300"
                  style={{ width: `${progress.notReplied}%` }}
                />
              </div>
              
              <div className="text-xs text-center text-muted-foreground">
                {outreachData.responseRate}% Response Rate
              </div>
            </div>
          </CardContent>
        </Card>
        
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
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground font-medium">Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {outreachData.teamPerformance.map((member, index) => (
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
    </div>
  );
};

export default OutreachSummary;
