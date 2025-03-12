
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface ResponseBreakdownCardProps {
  positiveResponses: number;
  negativeResponses: number;
  notReplied: number;
  responseRate: number;
}

const ResponseBreakdownCard: React.FC<ResponseBreakdownCardProps> = ({ 
  positiveResponses, 
  negativeResponses, 
  notReplied,
  responseRate
}) => {
  const total = positiveResponses + negativeResponses + notReplied;
  
  // Calculate percentages for the chart
  const positivePercent = Math.round((positiveResponses / total) * 100);
  const negativePercent = Math.round((negativeResponses / total) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Response Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span className="text-sm">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{positiveResponses}</span>
              <span className="text-xs text-muted-foreground">({positivePercent}%)</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ThumbsDown className="h-4 w-4 text-red-500" />
              <span className="text-sm">Negative</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{negativeResponses}</span>
              <span className="text-xs text-muted-foreground">({negativePercent}%)</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Not Replied</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{notReplied}</span>
              <span className="text-xs text-muted-foreground">({100 - positivePercent - negativePercent}%)</span>
            </div>
          </div>
          
          <div className="pt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Overall Response Rate</span>
              <span>{responseRate}%</span>
            </div>
            <Progress value={responseRate} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseBreakdownCard;
