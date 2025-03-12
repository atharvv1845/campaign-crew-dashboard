
import { useState } from 'react';
import { LeadData } from '../../../types/campaignTypes';

export interface CsvParseResult {
  headers: string[];
  preview: Record<string, string>[];
  initialMapping: Record<string, string>;
}

export const useCsvParser = () => {
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvMapping, setCsvMapping] = useState<Record<string, string>>({});
  const [csvPreview, setCsvPreview] = useState<any[]>([]);
  
  const parseCsvFile = (file: File): Promise<CsvParseResult> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          const lines = text.split('\n');
          const headers = lines[0].split(',').map(header => header.trim());
          
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
          
          resolve({
            headers,
            preview,
            initialMapping
          });
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read the CSV file'));
      };
      
      reader.readAsText(file);
    });
  };
  
  const processLeadsFromCsv = (
    file: File, 
    mapping: Record<string, string>, 
    initialStageId: string,
    generateId: () => string
  ): Promise<LeadData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          const lines = text.split('\n');
          const headers = lines[0].split(',').map(header => header.trim());
          
          const newLeads: LeadData[] = [];
          
          for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            const values = lines[i].split(',').map(val => val.trim());
            const leadData: any = {
              id: generateId(),
              firstName: '',
              lastName: '',
              email: '',
              source: 'csv',
              status: initialStageId,
              socialProfiles: {}
            };
            
            let fullName = '';
            
            headers.forEach((header, index) => {
              const mappingKey = mapping[header];
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
                // Store the status name as a property we can use later
                leadData.statusName = value; 
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
            
            if (leadData.firstName && leadData.email) {
              newLeads.push(leadData);
            }
          }
          
          resolve(newLeads);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read the CSV file'));
      };
      
      reader.readAsText(file);
    });
  };
  
  const downloadCsvTemplate = () => {
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
  
  const handleMappingChange = (header: string, value: string) => {
    setCsvMapping(prev => ({
      ...prev,
      [header]: value
    }));
  };
  
  return {
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
  };
};
