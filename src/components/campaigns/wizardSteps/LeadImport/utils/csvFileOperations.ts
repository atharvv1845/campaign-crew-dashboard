
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
  
  console.log('Creating initial mapping for headers:', headers);
  
  headers.forEach(header => {
    const lowerHeader = header.toLowerCase();
    
    // Match headers to field names
    if (lowerHeader.includes('first') && lowerHeader.includes('name')) {
      initialMapping[header] = 'firstName';
    } else if (lowerHeader.includes('last') && lowerHeader.includes('name')) {
      initialMapping[header] = 'lastName';
    } else if (lowerHeader === 'name' || lowerHeader === 'full name' || lowerHeader === 'fullname') {
      initialMapping[header] = 'name';
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
    } else if (lowerHeader.includes('status') || lowerHeader.includes('stage')) {
      initialMapping[header] = 'currentStage';
    } else if (lowerHeader.includes('assign') || lowerHeader.includes('rep')) {
      initialMapping[header] = 'assignedTo';
    } else if (lowerHeader.includes('note')) {
      initialMapping[header] = 'notes';
    } else if (lowerHeader.includes('title') || lowerHeader.includes('position') || lowerHeader.includes('job')) {
      initialMapping[header] = 'title';
    }
  });
  
  console.log('Generated initial mapping:', initialMapping);
  return initialMapping;
};

export const parseCsvContent = (content: string): CsvParseResult => {
  console.log('Parsing CSV content...');
  
  // Split by newlines, but handle different line endings (CRLF, LF)
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  console.log(`Found ${lines.length} lines in CSV`);
  
  if (lines.length === 0 || !lines[0].trim()) {
    console.error('CSV file is empty or has no headers');
    throw new Error('CSV file is empty or has no headers');
  }
  
  // Parse headers from first line
  const headers = lines[0].split(',').map(header => header.trim());
  console.log('CSV headers:', headers);
  
  if (headers.length === 0) {
    console.error('No valid headers found in CSV');
    throw new Error('No valid headers found in CSV');
  }
  
  const initialMapping = parseInitialMapping(headers);
  
  // Generate preview data (up to 5 rows)
  const preview = [];
  for (let i = 1; i < Math.min(6, lines.length); i++) {
    if (lines[i].trim()) {
      try {
        const values = lines[i].split(',').map(val => val.trim());
        
        // Only process rows with the right number of values
        if (values.length >= headers.length) {
          const row: Record<string, string> = {};
          
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          
          preview.push(row);
        } else {
          console.warn(`Row ${i} has fewer values than headers. Skipping.`);
        }
      } catch (error) {
        console.error(`Error parsing row ${i}:`, error);
      }
    }
  }
  
  console.log(`Generated preview with ${preview.length} rows`);
  
  return {
    headers,
    preview,
    initialMapping
  };
};
