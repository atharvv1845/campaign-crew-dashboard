
import React, { useState, useEffect } from 'react';
import { CampaignFormData } from '../../types/campaignTypes';
import ManualImport from './ManualImport';
import CsvImport from './CsvImport';
import SavedLeadLists from './SavedLeadLists';
import ImportMethodSelector from './ImportMethodSelector';
import { useLeadImport } from './hooks/useLeadImport';
import { useToast } from "@/hooks/use-toast";

interface LeadImportProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

type ImportMethod = 'manual' | 'csv' | 'saved';

const LeadImport: React.FC<LeadImportProps> = ({ formData, setFormData, onNext, onBack }) => {
  const [importMethod, setImportMethod] = useState<ImportMethod>('manual');
  const { savedLeadLists, loadLeadList } = useLeadImport();
  const { toast } = useToast();
  
  // Handle loading a saved lead list
  const handleLoadLeadList = (listId: string) => {
    const leads = loadLeadList(listId);
    if (leads) {
      setFormData(prev => ({
        ...prev,
        leads: [...leads]
      }));
      
      toast({
        title: "Lead List Loaded",
        description: `${leads.length} leads have been loaded successfully.`
      });
    }
  };
  
  // Check if form has required leads
  const hasLeads = formData.leads.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Import Leads</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Add leads to your campaign by entering them manually, importing a CSV file, or selecting a saved lead list.
        </p>
        
        {/* Import method selection */}
        <ImportMethodSelector 
          importMethod={importMethod} 
          setImportMethod={setImportMethod} 
          hasSavedLists={savedLeadLists.length > 0}
        />
        
        {/* Saved lead lists */}
        {importMethod === 'saved' && savedLeadLists.length > 0 && (
          <SavedLeadLists 
            savedLeadLists={savedLeadLists} 
            loadLeadList={handleLoadLeadList} 
          />
        )}
        
        {/* Manual lead input form */}
        {importMethod === 'manual' && (
          <ManualImport 
            formData={formData}
            setFormData={setFormData}
          />
        )}
        
        {/* CSV import */}
        {importMethod === 'csv' && (
          <CsvImport 
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t border-border">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!hasLeads}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeadImport;
