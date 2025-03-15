
import React from 'react';
import LeadTable from '@/components/leads/LeadTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Leads: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default Leads;
