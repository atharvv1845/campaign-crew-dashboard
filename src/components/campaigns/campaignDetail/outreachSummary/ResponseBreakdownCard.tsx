
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  responseRate,
}) => {
  const calculateProgress = (positive: number, negative: number, total: number) => {
    return {
      positive: (positive / total) * 100,
      negative: (negative / total) * 100,
      notReplied: ((total - positive - negative) / total) * 100,
    };
  };
  
  const progress = calculateProgress(
    positiveResponses, 
    negativeResponses, 
    positiveResponses + negativeResponses + notReplied
  );

  return (
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
              <p className="text-lg font-semibold">{positiveResponses}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                <span className="text-sm">Negative</span>
              </div>
              <p className="text-lg font-semibold">{negativeResponses}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 mr-2" />
                <span className="text-sm">No Reply</span>
              </div>
              <p className="text-lg font-semibold">{notReplied}</p>
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
            {responseRate}% Response Rate
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseBreakdownCard;
