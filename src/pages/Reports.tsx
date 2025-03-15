
import React from 'react';

const ReportsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="bg-background border rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-6">Reports & Analytics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-medium mb-4">Campaign Performance</h2>
            <p className="text-muted-foreground">View detailed metrics on campaign effectiveness and ROI.</p>
            <button className="mt-4 text-primary text-sm font-medium">Generate Report →</button>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-medium mb-4">Lead Conversion</h2>
            <p className="text-muted-foreground">Track lead progression through your sales pipeline.</p>
            <button className="mt-4 text-primary text-sm font-medium">Generate Report →</button>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-medium mb-4">Team Performance</h2>
            <p className="text-muted-foreground">Measure individual and team outreach effectiveness.</p>
            <button className="mt-4 text-primary text-sm font-medium">Generate Report →</button>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-medium mb-4">Response Analytics</h2>
            <p className="text-muted-foreground">Analyze response rates across different channels.</p>
            <button className="mt-4 text-primary text-sm font-medium">Generate Report →</button>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-medium mb-4">Content Performance</h2>
            <p className="text-muted-foreground">See which message templates get the best engagement.</p>
            <button className="mt-4 text-primary text-sm font-medium">Generate Report →</button>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-medium mb-4">Custom Reports</h2>
            <p className="text-muted-foreground">Build and save your own custom analytics dashboards.</p>
            <button className="mt-4 text-primary text-sm font-medium">Create Report →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
