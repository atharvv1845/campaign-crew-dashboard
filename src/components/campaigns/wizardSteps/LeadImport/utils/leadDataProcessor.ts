
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
      name: '',
      email: '',
      company: '',
      title: '',
      status: initialStageId,
      source: 'csv',
      lastContact: '',
      notes: '',
      platformLinks: '',
      assignedTo: ''
    };
    
    headers.forEach((header, index) => {
      const mappingKey = mapping[header];
      const value = values[index] || '';
      
      if (mappingKey === 'name') {
        leadData.name = value;
      } else if (mappingKey === 'email') {
        leadData.email = value;
      } else if (mappingKey === 'company') {
        leadData.company = value;
      } else if (mappingKey === 'title') {
        leadData.title = value;
      } else if (mappingKey === 'currentStage') {
        leadData.statusName = value;
        leadData.status = initialStageId; // Will be updated later if stage matches
      } else if (mappingKey === 'assignedTo') {
        leadData.assignedTo = value;
      } else if (mappingKey === 'notes') {
        leadData.notes = value;
      } else if (mappingKey === 'platformLinks') {
        leadData.platformLinks = value;
      } else if (mappingKey === 'lastContact') {
        leadData.lastContact = value;
      }
    });

    // Ensure name is set
    if (!leadData.name) {
      leadData.name = leadData.email || `Lead #${leadData.id}`;
    }
    
    newLeads.push(leadData);
  }
  
  return newLeads;
};
