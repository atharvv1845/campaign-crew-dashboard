
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmptyTabContent from './EmptyTabContent';

interface LeadsTabContentProps {
  onImportLeadsClick: () => void;
}

const LeadsTabContent: React.FC<LeadsTabContentProps> = ({ onImportLeadsClick }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <EmptyTabContent
          icon={Users}
          title="Unified Lead View"
          description="View and manage all leads across all campaigns in one place. Import your leads to get started."
          buttonText="Import Leads"
          onButtonClick={onImportLeadsClick}
        />
      </CardContent>
    </Card>
  );
};

export default LeadsTabContent;
