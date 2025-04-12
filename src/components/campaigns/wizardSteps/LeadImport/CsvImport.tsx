
import React, { useCallback, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCsvParser } from './hooks/useCsvParser';
import { FileUploader } from './components/FileUploader';
import CsvColumnMapper from './components/CsvColumnMapper';
import MappingTable from './components/MappingTable';
import { CsvParseResult, LeadData } from './hooks/types';
import { CampaignFormData } from '../../../types/campaignTypes';
import { generateCsvTemplate } from './utils/csvFileOperations';

interface CsvImportProps {
  formData: CampaignFormData;
  setFormData: (data: CampaignFormData | ((prev: CampaignFormData) => CampaignFormData)) => void;
  onLeadsImported?: (leads: LeadData[]) => void;
}

const CsvImport: React.FC<CsvImportProps> = ({ formData, setFormData, onLeadsImported }) => {
  const { toast } = useToast();
  const [csvContent, setCsvContent] = useState<string | null>(null);
  const [csvResult, setCsvResult] = useState<CsvParseResult | null>(null);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const { parseCsv, processLeads, importStatus } = useCsvParser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = useCallback(async (file: File) => {
    if (!file) return;
    
    try {
      const content = await file.text();
      setCsvContent(content);
      
      // Parse CSV content
      const result = await parseCsv(content);
      setCsvResult(result);
      setColumnMapping(result.initialMapping);
      
      toast({
        title: "CSV File Loaded",
        description: `Successfully loaded ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Error Loading CSV",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }, [parseCsv, toast]);

  // Handle mapping change
  const handleMappingChange = (header: string, mappedField: string) => {
    setColumnMapping(prev => ({
      ...prev,
      [header]: mappedField
    }));
  };

  // Handle import button click
  const handleImport = async () => {
    if (!csvContent || !csvResult) {
      toast({
        title: "Error",
        description: "No CSV data to import",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Process the CSV data with the column mapping
      const importedLeads = await processLeads(
        csvContent, 
        columnMapping, 
        formData.stages[0]?.id || 'new',
        formData.stages
      );
      
      // Add contactPlatforms to leads if specified in the campaign
      const leadsWithPlatforms = importedLeads.map(lead => ({
        ...lead,
        contactPlatforms: formData.contactPlatforms || []
      }));
      
      // Update status names for display
      const leadsWithStatusNames = leadsWithPlatforms.map(lead => {
        const stage = formData.stages.find(s => s.id === lead.status);
        return {
          ...lead,
          status: stage?.id || lead.status,
          currentStage: stage?.name || lead.currentStage
        };
      });
      
      // Update form data with imported leads
      setFormData(prev => ({
        ...prev,
        leads: leadsWithStatusNames as LeadData[]
      }));
      
      // Invoke callback if provided
      if (onLeadsImported) {
        onLeadsImported(leadsWithStatusNames as LeadData[]);
      }
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Show success message
      toast({
        title: "Import Successful",
        description: `${leadsWithStatusNames.length} leads have been imported.`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  // Download CSV template
  const handleDownloadTemplate = () => {
    generateCsvTemplate(formData.contactPlatforms);
    toast({
      title: "Template Downloaded",
      description: "CSV template has been downloaded to your device.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Import Leads from CSV</h3>
        <p className="text-sm text-muted-foreground">
          Upload a CSV file with lead data or download our template to get started.
        </p>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={handleDownloadTemplate}
          >
            Download Template
          </Button>
        </div>
      </div>
      
      {/* File Upload Section */}
      <FileUploader 
        ref={fileInputRef}
        onFileSelected={handleFileChange}
        isLoading={importStatus.loading}
      />
      
      {/* Mapping Configuration */}
      {csvResult && csvResult.headers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-medium">Column Mapping</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Map CSV columns to lead properties.
          </p>
          
          <CsvColumnMapper 
            headers={csvResult.headers}
            mapping={columnMapping}
            onMappingChange={handleMappingChange}
          />
          
          {/* Preview Table */}
          <div className="mt-4">
            <h3 className="text-base font-medium">Preview</h3>
            <MappingTable 
              headers={csvResult.headers}
              mapping={columnMapping}
              preview={csvResult.preview}
            />
          </div>
          
          {/* Import Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleImport}
              disabled={importStatus.loading || !csvContent}
            >
              {importStatus.loading ? 'Importing...' : 'Import Leads'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CsvImport;
