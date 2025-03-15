
import { CsvParseResult } from '../hooks/types';

export const generateCsvTemplate = (contactPlatforms?: string[]) => {
  // Base headers that are always included
  const baseHeaders = ['First Name', 'Last Name', 'Email', 'Company', 'Phone', 'Status', 'Assigned To', 'Notes'];
  
  // Platform headers that are included only if selected
  const platformHeaders: string[] = [];
  
  if (contactPlatforms && contactPlatforms.length > 0) {
    if (contactPlatforms.includes('linkedin')) platformHeaders.push('LinkedIn');
    if (contactPlatforms.includes('twitter')) platformHeaders.push('Twitter');
    if (contactPlatforms.includes('facebook')) platformHeaders.push('Facebook');
    if (contactPlatforms.includes('instagram')) platformHeaders.push('Instagram');
    if (contactPlatforms.includes('whatsapp')) platformHeaders.push('WhatsApp');
  } else {
    // If no platforms specified, include all by default
    platformHeaders.push('LinkedIn', 'Twitter', 'Facebook', 'Instagram', 'WhatsApp');
  }
  
  // Combine all headers
  const headers = [...baseHeaders, ...platformHeaders];
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
    } else if (lowerHeader.includes('facebook')) {
      initialMapping[header] = 'facebook';
    } else if (lowerHeader.includes('instagram')) {
      initialMapping[header] = 'instagram';
    } else if (lowerHeader.includes('whatsapp')) {
      initialMapping[header] = 'whatsapp';
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
