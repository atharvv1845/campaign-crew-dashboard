
import { useState } from 'react';
import { LeadData } from '../../../types/campaignTypes';
import { CsvParseResult } from './types';
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
          resolve(result);
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
          const leads = processLeadData(text, mapping, initialStageId, generateId);
          resolve(leads);
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
