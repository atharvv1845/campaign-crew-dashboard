
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
    
    headers.forEach((header, index) => {
      const mappingKey = mapping[header];
      const value = values[index] || '';
      
      if (mappingKey === 'fullName' && value) {
        const nameParts = value.split(' ');
        if (nameParts.length >= 2) {
          leadData.firstName = nameParts[0];
          leadData.lastName = nameParts.slice(1).join(' ');
          leadData.name = value; // Full name from CSV
        } else {
          leadData.firstName = value;
          leadData.name = value; // Single name becomes both name and firstName
        }
      } else if (mappingKey === 'firstName' && value) {
        leadData.firstName = value;
        leadData.name = value; // If only firstName, use it as name too
      } else if (mappingKey === 'lastName' && value) {
        leadData.lastName = value;
        if (!leadData.name) { // Only set name if not already set by firstName
          leadData.name = value;
        }
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

    // Final name determination - combine firstName and lastName if both exist
    if (leadData.firstName && leadData.lastName) {
      leadData.name = `${leadData.firstName} ${leadData.lastName}`;
    } else if (!leadData.name) {
      // Fallback if no name was set at all
      leadData.name = leadData.firstName || leadData.lastName || `Lead #${leadData.id}`;
    }
    
    newLeads.push(leadData);
  }
  
  return newLeads;
};
