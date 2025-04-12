
import { useState } from 'react';
import { LeadData, CsvParseResult } from './types';
import { parseCsvContent, generateCsvTemplate } from '../utils/csvFileOperations';
import { processLeadData } from '../utils/leadDataProcessor';

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
          const result = parseCsvContent(text);
          
          // Log the parsed result for debugging
          console.log('CSV parsing result:', result);
          
          resolve(result);
        } catch (error) {
          console.error('Error parsing CSV file:', error);
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
    generateId: () => string,
    customStages?: { id: string; name: string }[]
  ): Promise<LeadData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          console.log('Processing CSV with mapping:', mapping);
          console.log('Using custom stages:', customStages);
          
          const leads = processLeadData(text, mapping, initialStageId, generateId, customStages);
          console.log('Processed leads from CSV:', leads);
          
          resolve(leads);
        } catch (error) {
          console.error('Error processing leads from CSV:', error);
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read the CSV file'));
      };
      
      reader.readAsText(file);
    });
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
    downloadCsvTemplate: generateCsvTemplate,
    handleMappingChange
  };
};
