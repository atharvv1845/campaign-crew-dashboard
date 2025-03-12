
import React from 'react';

interface BulkActionsProps {
  selectedLeads: number[];
  onBulkAction: (action: 'status' | 'team' | 'followUp', value: string) => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({ 
  selectedLeads, 
  onBulkAction 
}) => {
  // Implementation would update the leads in a real app
  const handleBulkAction = (action: 'status' | 'team' | 'followUp', value: string) => {
    onBulkAction(action, value);
  };

  return null; // This is a utility component that doesn't render anything directly
};

export default BulkActions;
