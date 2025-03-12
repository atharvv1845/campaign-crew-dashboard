
import { CsvParseResult } from '../hooks/types';

export const generateCsvTemplate = () => {
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

export const parseInitialMapping = (headers: string[]): Record<string, string> => {
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
  return initialMapping;
};

export const parseCsvContent = (content: string): CsvParseResult => {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const initialMapping = parseInitialMapping(headers);
  
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
  
  return {
    headers,
    preview,
    initialMapping
  };
};
