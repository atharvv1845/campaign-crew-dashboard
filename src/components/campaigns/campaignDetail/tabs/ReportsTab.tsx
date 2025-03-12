
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead } from '../leads/types';

interface ReportsTabProps {
  campaign: any;
  leadsData: Lead[];
}

const ReportsTab: React.FC<ReportsTabProps> = ({ campaign, leadsData }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your campaign has {leadsData.length} leads in total.
          </p>
          
          {/* Additional reporting content would go here */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;
