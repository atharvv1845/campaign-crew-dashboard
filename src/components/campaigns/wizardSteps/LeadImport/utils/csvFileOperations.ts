
import FileSaver from 'file-saver';
import { CsvParseResult } from '../hooks/types';

export const parseCsvContent = (content: string): CsvParseResult => {
  // Split the CSV content by lines
  const lines = content.split(/\r\n|\n|\r/).filter(line => line.trim() !== '');
  
  if (lines.length === 0) {
    throw new Error('The CSV file is empty');
  }
  
  // Extract headers from the first line
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Process data rows
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    if (values.length !== headers.length) {
      console.warn(`Line ${i+1} has ${values.length} fields, but there are ${headers.length} headers. Skipping.`);
      continue;
    }
    
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index].trim();
    });
    
    data.push(row);
  }
  
  return { headers, data };
};

// Helper function to correctly parse CSV lines accounting for quoted fields
function parseCSVLine(line: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current); // Add the last field
  return result;
}

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
