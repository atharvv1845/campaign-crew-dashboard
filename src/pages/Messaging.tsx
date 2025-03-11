
import React from 'react';

const Messaging: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Messaging</h3>
      </div>
      <div className="p-8 text-center text-muted-foreground">
        <p>Message templates are now integrated directly within the campaign creation workflow.</p>
        <p className="mt-2">Create and save templates while building your campaign message sequences.</p>
      </div>
    </div>
  );
};

export default Messaging;
