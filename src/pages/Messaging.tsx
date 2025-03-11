
import React from 'react';

const Messaging: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-card rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">Message Templates</h1>
        <p className="text-muted-foreground">
          Create and manage your message templates for campaigns here.
        </p>
        
        {/* Placeholder for future implementation */}
        <div className="flex items-center justify-center h-64 border border-dashed border-border rounded-lg mt-6">
          <p className="text-muted-foreground">Message templates feature coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
