
import React from 'react';
import { Lead, Campaign } from './types';
import RefactoredLeadTable from './components/table/RefactoredLeadTable';

interface LeadTableProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
  onSelectLead?: (leadId: number, selected: boolean) => void;
  selectedLeads?: number[];
  campaign?: Campaign;
  onUpdateLead?: (lead: Lead) => void;
}

// This is a simple wrapper component to maintain backward compatibility
const LeadTable: React.FC<LeadTableProps> = (props) => {
  return <RefactoredLeadTable {...props} />;
};

export default LeadTable;
