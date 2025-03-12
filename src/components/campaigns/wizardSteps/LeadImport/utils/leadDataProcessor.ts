
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
      name: '',
      email: '',
      company: '',
      title: '',
      status: initialStageId,
      currentStage: '',
      source: 'csv',
      lastContact: '',
      lastContacted: '',
      notes: '',
      platformLinks: '',
      assignedTo: '',
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: '',
      whatsapp: ''
    };
    
    headers.forEach((header, index) => {
      const mappingKey = mapping[header];
      const value = values[index] || '';
      
      if (mappingKey === 'name') {
        leadData.name = value;
        
        // Try to split name into first and last name if it contains a space
        if (value.includes(' ')) {
          const nameParts = value.split(' ');
          leadData.firstName = nameParts[0] || '';
          leadData.lastName = nameParts.slice(1).join(' ') || '';
        } else {
          leadData.firstName = value;
        }
      } else if (mappingKey === 'firstName') {
        leadData.firstName = value;
        if (leadData.lastName) {
          leadData.name = `${value} ${leadData.lastName}`;
        } else {
          leadData.name = value;
        }
      } else if (mappingKey === 'lastName') {
        leadData.lastName = value;
        if (leadData.firstName) {
          leadData.name = `${leadData.firstName} ${value}`;
        } else {
          leadData.name = value;
        }
      } else if (mappingKey === 'email') {
        leadData.email = value;
      } else if (mappingKey === 'company') {
        leadData.company = value;
      } else if (mappingKey === 'title') {
        leadData.title = value;
      } else if (mappingKey === 'currentStage') {
        leadData.statusName = value;
        leadData.currentStage = value;
        leadData.status = initialStageId; // Will be updated later if stage matches
      } else if (mappingKey === 'assignedTo') {
        leadData.assignedTo = value;
      } else if (mappingKey === 'notes') {
        leadData.notes = value;
      } else if (mappingKey === 'linkedin') {
        leadData.linkedin = value;
        leadData.platformLinks = leadData.platformLinks ? `${leadData.platformLinks}, LinkedIn: ${value}` : `LinkedIn: ${value}`;
      } else if (mappingKey === 'twitter') {
        leadData.twitter = value;
        leadData.platformLinks = leadData.platformLinks ? `${leadData.platformLinks}, Twitter: ${value}` : `Twitter: ${value}`;
      } else if (mappingKey === 'facebook') {
        leadData.facebook = value;
        leadData.platformLinks = leadData.platformLinks ? `${leadData.platformLinks}, Facebook: ${value}` : `Facebook: ${value}`;
      } else if (mappingKey === 'instagram') {
        leadData.instagram = value;
        leadData.platformLinks = leadData.platformLinks ? `${leadData.platformLinks}, Instagram: ${value}` : `Instagram: ${value}`;
      } else if (mappingKey === 'whatsapp') {
        leadData.whatsapp = value;
        leadData.platformLinks = leadData.platformLinks ? `${leadData.platformLinks}, WhatsApp: ${value}` : `WhatsApp: ${value}`;
      } else if (mappingKey === 'platformLinks') {
        leadData.platformLinks = value;
      } else if (mappingKey === 'lastContact' || mappingKey === 'lastContacted') {
        leadData.lastContact = value;
        leadData.lastContacted = value;
      }
    });

    // Ensure name is set
    if (!leadData.name) {
      if (leadData.firstName && leadData.lastName) {
        leadData.name = `${leadData.firstName} ${leadData.lastName}`;
      } else if (leadData.firstName) {
        leadData.name = leadData.firstName;
      } else if (leadData.lastName) {
        leadData.name = leadData.lastName;
      } else {
        leadData.name = leadData.email || `Lead #${leadData.id}`;
      }
    }
    
    newLeads.push(leadData);
  }
  
  return newLeads;
};
