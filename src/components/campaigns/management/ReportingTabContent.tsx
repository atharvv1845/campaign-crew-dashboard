
import React from 'react';
import { BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmptyTabContent from './EmptyTabContent';

interface ReportingTabContentProps {
  campaigns: any[];
  onCreateCampaignClick: () => void;
}

const ReportingTabContent: React.FC<ReportingTabContentProps> = ({ 
  campaigns, 
  onCreateCampaignClick 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        {campaigns.length === 0 ? (
          <EmptyTabContent
            icon={BarChart}
            title="No Campaign Data"
            description="Create your first campaign to begin tracking and visualizing your outreach performance metrics."
            buttonText="Create First Campaign"
            onButtonClick={onCreateCampaignClick}
          />
        ) : (
          <div className="h-[400px] flex items-center justify-center">
            <p className="text-muted-foreground">Campaign performance charts will appear here when you have active campaigns with data.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportingTabContent;
