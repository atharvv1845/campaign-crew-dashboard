import React, { useState, useRef } from 'react';
import { Upload, FileCheck, X, Download } from 'lucide-react';
import { CampaignFormData } from '../../types/campaignTypes';
import { useToast } from "@/hooks/use-toast";
import { useLeadImport } from './hooks/useLeadImport';
import CsvMapping from './CsvMapping';
import CsvPreview from './CsvPreview';

interface CsvImportProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
}

const CsvImport: React.FC<CsvImportProps> = ({ formData, setFormData }) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvMapping, setCsvMapping] = useState<Record<string, string>>({});
  const [csvPreview, setCsvPreview] = useState<any[]>([]);
  const [importedLeads, setImportedLeads] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { generateId } = useLeadImport();
  
  // Trigger file input click
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  // Handle CSV file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setCsvFile(file);
    
    // Parse CSV file
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      
      setCsvHeaders(headers);
      
      // Initialize mapping with suggestions
      const initialMapping: Record<string, string> = {};
      headers.forEach(header => {
        const lowerHeader = header.toLowerCase();
        if (lowerHeader.includes('first') && lowerHeader.includes('name')) {
          initialMapping[header] = 'firstName';
        } else if (lowerHeader.includes('last') && lowerHeader.includes('name')) {
          initialMapping[header] = 'lastName';
        } else if (lowerHeader === 'name') {
          initialMapping[header] = 'fullName';
        } else if (lowerHeader.includes('email')) {
          initialMapping[header] = 'email';
        } else if (lowerHeader.includes('company')) {
          initialMapping[header] = 'company';
        } else if (lowerHeader.includes('phone')) {
          initialMapping[header] = 'phone';
        } else if (lowerHeader.includes('linkedin')) {
          initialMapping[header] = 'linkedin';
        } else if (lowerHeader.includes('twitter')) {
          initialMapping[header] = 'twitter';
        } else if (lowerHeader.includes('status')) {
          initialMapping[header] = 'status';
        } else if (lowerHeader.includes('assign') || lowerHeader.includes('rep')) {
          initialMapping[header] = 'assignedTo';
        } else if (lowerHeader.includes('note')) {
          initialMapping[header] = 'notes';
        }
      });
      
      setCsvMapping(initialMapping);
      
      // Create preview of first 5 rows
      const preview = [];
      for (let i = 1; i < Math.min(6, lines.length); i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',').map(val => val.trim());
          const row: Record<string, string> = {};
          
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          
          preview.push(row);
        }
      }
      
      setCsvPreview(preview);
    };
    
    reader.readAsText(file);
  };
  
  // Handle mapping changes
  const handleMappingChange = (header: string, value: string) => {
    setCsvMapping(prev => ({
      ...prev,
      [header]: value
    }));
  };
  
  // Import leads from CSV based on mapping
  const importCsvLeads = () => {
    if (!csvFile) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      
      const newLeads: any[] = [];
      
      // Start from line 1 (skip headers)
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',').map(val => val.trim());
        const leadData: any = {
          id: generateId(),
          firstName: '',
          lastName: '',
          email: '',
          source: 'csv',
          status: formData.stages[0]?.id || '',
          socialProfiles: {}
        };
        
        // Process full name if mapping exists
        let fullName = '';
        
        headers.forEach((header, index) => {
          const mappingKey = csvMapping[header];
          const value = values[index] || '';
          
          if (mappingKey === 'fullName' && value) {
            fullName = value;
          } else if (mappingKey === 'firstName') {
            leadData.firstName = value;
          } else if (mappingKey === 'lastName') {
            leadData.lastName = value;
          } else if (mappingKey === 'email') {
            leadData.email = value;
          } else if (mappingKey === 'company') {
            leadData.company = value;
          } else if (mappingKey === 'phone') {
            leadData.phone = value;
          } else if (mappingKey === 'status') {
            // Find matching stage
            const stage = formData.stages.find(s => 
              s.name.toLowerCase() === value.toLowerCase()
            );
            if (stage) {
              leadData.status = stage.id;
            }
          } else if (mappingKey === 'assignedTo') {
            leadData.assignedTo = value;
          } else if (mappingKey === 'notes') {
            leadData.notes = value;
          } else if (['linkedin', 'twitter', 'facebook', 'instagram'].includes(mappingKey)) {
            leadData.socialProfiles = {
              ...leadData.socialProfiles,
              [mappingKey]: value
            };
          }
        });
        
        // Process full name if needed
        if (fullName && (!leadData.firstName || !leadData.lastName)) {
          const nameParts = fullName.split(' ');
          if (nameParts.length >= 2) {
            leadData.firstName = leadData.firstName || nameParts[0];
            leadData.lastName = leadData.lastName || nameParts.slice(1).join(' ');
          } else {
            leadData.firstName = leadData.firstName || fullName;
            leadData.lastName = leadData.lastName || '';
          }
        }
        
        // Only add if we have the minimum required fields
        if (leadData.firstName && leadData.email) {
          newLeads.push(leadData);
        }
      }
      
      // Add imported leads to form data
      setFormData(prev => ({
        ...prev,
        leads: [...prev.leads, ...newLeads]
      }));
      
      // Update imported leads for display
      setImportedLeads(newLeads);
      
      toast({
        title: "Leads Imported",
        description: `Successfully imported ${newLeads.length} leads from CSV.`,
      });
      
      // Reset CSV state but keep imported leads visible
      setCsvFile(null);
      setCsvHeaders([]);
      setCsvMapping({});
      setCsvPreview([]);
    };
    
    reader.readAsText(csvFile);
  };
  
  // Download CSV template
  const downloadTemplate = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Company', 'Phone', 'LinkedIn', 'Twitter', 'Status', 'Assigned To', 'Notes'];
    const csvContent = headers.join(',') + '\n';
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'leads_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {!csvFile ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <div>
              <h4 className="text-base font-medium">Upload CSV File</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Drag and drop your file or click to browse
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={handleFileButtonClick}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Select File
            </button>
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-1 text-sm text-primary"
            >
              <Download className="h-4 w-4" />
              Download Template
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-green-500" />
              <span className="font-medium">{csvFile.name}</span>
              <span className="text-sm text-muted-foreground">
                ({(csvFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <button
              onClick={() => setCsvFile(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Mapping interface */}
          <CsvMapping 
            csvHeaders={csvHeaders}
            csvMapping={csvMapping}
            onMappingChange={handleMappingChange}
          />
          
          {/* Preview */}
          {csvPreview.length > 0 && (
            <CsvPreview 
              csvHeaders={csvHeaders}
              csvPreview={csvPreview}
            />
          )}
          
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setCsvFile(null)}
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
      
      {/* Display imported leads */}
      {importedLeads.length > 0 && (
        <div className="mt-6 border border-border rounded-lg">
          <div className="bg-muted/20 px-4 py-3 border-b border-border">
            <h4 className="font-medium">Imported Leads ({importedLeads.length})</h4>
          </div>
          <div className="p-4 max-h-[300px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/10">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Company</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {importedLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-4 py-2">{`${lead.firstName} ${lead.lastName}`}</td>
                    <td className="px-4 py-2">{lead.email}</td>
                    <td className="px-4 py-2">{lead.company || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Display all leads from form data */}
      {formData.leads.length > 0 && !csvFile && importedLeads.length === 0 && (
        <div className="mt-6 border border-border rounded-lg">
          <div className="bg-muted/20 px-4 py-3 border-b border-border">
            <h4 className="font-medium">All Leads ({formData.leads.length})</h4>
          </div>
          <div className="p-4 max-h-[300px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/10">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Company</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {formData.leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-4 py-2">{`${lead.firstName} ${lead.lastName}`}</td>
                    <td className="px-4 py-2">{lead.email}</td>
                    <td className="px-4 py-2">{lead.company || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CsvImport;
