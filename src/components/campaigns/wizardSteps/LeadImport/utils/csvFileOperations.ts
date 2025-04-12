import FileSaver from 'file-saver';
import { CsvParseResult } from '../hooks/types';
import Papa from 'papaparse';

export const parseCsvContent = (csvContent: string): CsvParseResult => {
  try {
    const results = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
    });

    const headers = results.meta.fields || [];
    const data = results.data;

    // Create a preview with a subset of the data
    const preview = data.slice(0, 5).map(row => {
      const typedRow: Record<string, string> = {};
      headers.forEach(header => {
        typedRow[header] = (row as any)[header] || '';
      });
      return typedRow;
    });

    // Create initial mapping suggestion
    const initialMapping = createInitialMapping(headers);

    return {
      headers,
      data,
      preview,
      initialMapping
    };
  } catch (error) {
    console.error('Error parsing CSV:', error);
    throw error;
  }
};

// Helper function to create initial mapping suggestion
const createInitialMapping = (headers: string[]): Record<string, string> => {
  const mapping: Record<string, string> = {};
  headers.forEach(header => {
    const lowerHeader = header.toLowerCase();
    if (lowerHeader.includes('name')) {
      mapping[header] = 'name';
    } else if (lowerHeader.includes('email')) {
      mapping[header] = 'email';
    } else if (lowerHeader.includes('phone')) {
      mapping[header] = 'phone';
    } else if (lowerHeader.includes('company')) {
      mapping[header] = 'company';
    } else if (lowerHeader.includes('title')) {
      mapping[header] = 'title';
    }
  });
  return mapping;
};

export const generateCsvTemplate = () => {
  const headers = ['name', 'email', 'phone', 'company', 'title', 'notes'];
  const data = [
    'John Doe,john@example.com,+1234567890,Acme Inc,CEO,Interested in our product',
    'Jane Smith,jane@example.com,+0987654321,Tech Corp,CTO,Follow up in two weeks'
  ];
  
  const csvContent = [headers.join(','), ...data].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  FileSaver.saveAs(blob, 'lead_import_template.csv');
};
