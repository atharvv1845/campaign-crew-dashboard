
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
      console.log('Parsing CSV file:', file.name);
      const { headers, preview, initialMapping } = await parseCsvFile(file);
      
      console.log('Parsed CSV headers:', headers);
      console.log('CSV preview:', preview);
      console.log('Initial mapping:', initialMapping);
      
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
    if (!csvFile) {
      console.error('No CSV file selected');
      return;
    }
    
    try {
      console.log('Starting import with formData:', formData);
      const initialStageId = formData.stages[0]?.id || '';
      console.log('Initial stage ID:', initialStageId);
      console.log('CSV mapping to use:', csvMapping);
      
      const newLeads = await processLeadsFromCsv(csvFile, csvMapping, initialStageId, generateId);
      console.log('Processed new leads:', newLeads);
      
      // Add contact platforms to each lead based on campaign settings
      const leadsWithPlatforms = newLeads.map(lead => {
        // Initialize contactPlatforms array
        let leadPlatforms: string[] = [];
        
        // Add platforms based on the presence of data
        if (formData.contactPlatforms && formData.contactPlatforms.length > 0) {
          formData.contactPlatforms.forEach(platform => {
            // Check if lead has data for this platform
            if (
              (platform === 'email' && lead.email) ||
              (platform === 'phone' && lead.phone) ||
              (platform === 'linkedin' && lead.socialProfiles?.linkedin) ||
              (platform === 'twitter' && lead.socialProfiles?.twitter) ||
              (platform === 'facebook' && lead.socialProfiles?.facebook) ||
              (platform === 'instagram' && lead.socialProfiles?.instagram) ||
              (platform === 'whatsapp' && lead.socialProfiles?.whatsapp)
            ) {
              leadPlatforms.push(platform);
            }
          });
        }
        
        return {
          ...lead,
          contactPlatforms: leadPlatforms
        };
      });
      
      console.log('Leads with platforms:', leadsWithPlatforms);
      
      // No validation - Accept all leads
      const validLeads = leadsWithPlatforms;
      
      if (validLeads.length === 0) {
        toast({
          title: "Import Error",
          description: "No leads found in the CSV file.",
          variant: "destructive"
        });
        return;
      }
      
      const leadsWithStages = validLeads.map(lead => {
        if (lead.statusName) {
          const stage = formData.stages.find(s => 
            s.name.toLowerCase() === lead.statusName.toLowerCase()
          );
          if (stage) {
            lead.status = stage.id;
          }
          // We'll keep statusName property for display purposes
        }
        return lead;
      });
      
      console.log('Final leads to add to formData:', leadsWithStages);
      
      setFormData(prev => {
        const updatedFormData = {
          ...prev,
          leads: [...prev.leads, ...leadsWithStages]
        };
        console.log('Updated formData:', updatedFormData);
        return updatedFormData;
      });
      
      setImportedLeads(leadsWithStages);
      
      toast({
        title: "Leads Imported",
        description: `Successfully imported ${leadsWithStages.length} leads from CSV.`,
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

  // Generate CSV template with all selected contact platforms
  const handleDownloadTemplate = () => {
    downloadCsvTemplate(formData.contactPlatforms);
  };

  return (
    <div className="space-y-6">
      <FileUpload 
        csvFile={csvFile}
        handleFileChange={handleFileChange}
        handleCancelFile={handleCancelFile}
        downloadTemplate={handleDownloadTemplate}
      />
      
      {csvFile && (
        <div className="space-y-6">
          {csvHeaders.length > 0 && (
            <CsvMapping 
              csvHeaders={csvHeaders}
              csvMapping={csvMapping}
              onMappingChange={handleMappingChange}
              contactPlatforms={formData.contactPlatforms}
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
      
      <ImportedLeadsTable leads={importedLeads.length > 0 ? importedLeads : formData.leads} />
    </div>
  );
};

export default CsvImport;
