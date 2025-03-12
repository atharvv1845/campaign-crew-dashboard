
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface LeadsContactedCardProps {
  today: number;
  thisWeek: number;
  thisMonth: number;
}

const LeadsContactedCard: React.FC<LeadsContactedCardProps> = ({
  today,
  thisWeek,
  thisMonth,
}) => {
  return (
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
            <p className="text-xl font-semibold">{today}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Week</span>
            </div>
            <p className="text-xl font-semibold">{thisWeek}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Month</span>
            </div>
            <p className="text-xl font-semibold">{thisMonth}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsContactedCard;
