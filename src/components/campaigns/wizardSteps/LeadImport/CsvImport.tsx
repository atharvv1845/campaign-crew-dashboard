
import React, { useState } from 'react';
import { CampaignFormData } from '../../types/campaignTypes';
import { useToast } from "@/hooks/use-toast";
import { useLeadImport } from './hooks/useLeadImport';
import { useCsvParser } from './hooks/useCsvParser';
import CsvMapping from './CsvMapping';
import CsvPreview from './CsvPreview';
import FileUpload from './components/FileUpload';
import ImportedLeadsTable from './components/ImportedLeadsTable';

interface CsvImportProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
}

const CsvImport: React.FC<CsvImportProps> = ({ formData, setFormData }) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [importedLeads, setImportedLeads] = useState<any[]>([]);
  const { toast } = useToast();
  const { generateId } = useLeadImport();
  const {
    csvHeaders,
    setCsvHeaders,
    csvMapping,
    setCsvMapping,
    csvPreview,
    setCsvPreview,
    parseCsvFile,
    processLeadsFromCsv,
    downloadCsvTemplate,
    handleMappingChange
  } = useCsvParser();
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setCsvFile(file);
    
    try {
      const { headers, preview, initialMapping } = await parseCsvFile(file);
      
      setCsvHeaders(headers);
      setCsvMapping(initialMapping);
      setCsvPreview(preview);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      toast({
        title: "Error parsing CSV",
        description: "There was an error parsing the CSV file. Please check the format and try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleCancelFile = () => {
    setCsvFile(null);
    setCsvHeaders([]);
    setCsvMapping({});
    setCsvPreview([]);
  };
  
  const importCsvLeads = async () => {
    if (!csvFile) return;
    
    try {
      const initialStageId = formData.stages[0]?.id || '';
      const newLeads = await processLeadsFromCsv(csvFile, csvMapping, initialStageId, generateId);
      
      // Handle stage mapping if there's a status column
      newLeads.forEach(lead => {
        if (lead.statusName) {
          const stage = formData.stages.find(s => 
            s.name.toLowerCase() === lead.statusName.toLowerCase()
          );
          if (stage) {
            lead.status = stage.id;
          }
          delete lead.statusName; // Clean up temporary property
        }
      });
      
      setFormData(prev => ({
        ...prev,
        leads: [...prev.leads, ...newLeads]
      }));
      
      setImportedLeads(newLeads);
      
      toast({
        title: "Leads Imported",
        description: `Successfully imported ${newLeads.length} leads from CSV.`,
      });
      
      setCsvPreview([]);
    } catch (error) {
      console.error('Error importing leads:', error);
      toast({
        title: "Import Error",
        description: "There was an error importing the leads. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <FileUpload 
        csvFile={csvFile}
        handleFileChange={handleFileChange}
        handleCancelFile={handleCancelFile}
        downloadTemplate={downloadCsvTemplate}
      />
      
      {csvFile && (
        <div className="space-y-6">
          {csvHeaders.length > 0 && (
            <CsvMapping 
              csvHeaders={csvHeaders}
              csvMapping={csvMapping}
              onMappingChange={handleMappingChange}
            />
          )}
          
          {csvPreview.length > 0 && (
            <CsvPreview 
              csvHeaders={csvHeaders}
              csvPreview={csvPreview}
            />
          )}
          
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancelFile}
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={importCsvLeads}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Import Leads
            </button>
          </div>
        </div>
      )}
      
      <ImportedLeadsTable leads={formData.leads} />
    </div>
  );
};

export default CsvImport;
