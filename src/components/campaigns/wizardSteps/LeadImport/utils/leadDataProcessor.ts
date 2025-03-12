
import { LeadData } from '../../../types/campaignTypes';

export const processLeadData = (
  content: string,
  mapping: Record<string, string>,
  initialStageId: string,
  generateId: () => string
): LeadData[] => {
  const lines = content.split('\n');
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
        const nameParts = value.split(' ');
        if (nameParts.length >= 2) {
          leadData.firstName = nameParts[0];
          leadData.lastName = nameParts.slice(1).join(' ');
          leadData.name = value; // Set the full name directly from CSV
        } else {
          leadData.firstName = value;
          leadData.name = value; // Use single name as full name
        }
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
        leadData.statusName = value;
      } else if (mappingKey === 'assignedTo') {
        leadData.assignedTo = value;
      } else if (mappingKey === 'notes') {
        leadData.notes = value;
      } else if (['linkedin', 'twitter', 'facebook', 'instagram', 'whatsapp'].includes(mappingKey)) {
        leadData.socialProfiles[mappingKey] = value;
      }
    });

    // Only set name from firstName/lastName if fullName wasn't provided
    if (!leadData.name) {
      leadData.name = leadData.firstName && leadData.lastName 
        ? `${leadData.firstName} ${leadData.lastName}`
        : leadData.firstName || leadData.lastName || `Lead #${leadData.id}`;
    }
    
    newLeads.push(leadData);
  }
  
  return newLeads;
};
