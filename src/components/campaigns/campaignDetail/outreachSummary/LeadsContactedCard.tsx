
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, UserCheck } from 'lucide-react';

interface LeadsContactedCardProps {
  today: number;
  thisWeek: number;
  thisMonth: number;
}

const LeadsContactedCard: React.FC<LeadsContactedCardProps> = ({ 
  today, 
  thisWeek, 
  thisMonth 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <UserCheck className="h-4 w-4 mr-2" />
          Leads Contacted
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-semibold">{today}</p>
            <p className="text-xs text-muted-foreground">Today</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">{thisWeek}</p>
            <p className="text-xs text-muted-foreground">This Week</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">{thisMonth}</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsContactedCard;
