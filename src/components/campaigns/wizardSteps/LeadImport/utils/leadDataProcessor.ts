
import { LeadData } from '../../../types/campaignTypes';

export const processLeadData = (
  content: string,
  mapping: Record<string, string>,
  initialStageId: string,
  generateId: () => string
): LeadData[] => {
  console.log('Processing CSV content with mapping:', mapping);
  console.log('Initial stage ID:', initialStageId);
  
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  console.log('Found headers:', headers);
  
  const newLeads: LeadData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',').map(val => val.trim());
    console.log(`Processing row ${i} with values:`, values);
    
    const leadData: any = {
      id: generateId(),
      firstName: '',
      lastName: '',
      name: '',
      email: '',
      company: '',
      title: '',
      status: initialStageId,
      currentStage: initialStageId,
      source: 'csv',
      lastContact: '',
      firstContactDate: '',
      nextFollowUpDate: '',
      notes: '',
      campaignId: '',
      assignedTo: '',
      socialProfiles: {}
    };
    
    headers.forEach((header, index) => {
      const mappingKey = mapping[header];
      const value = values[index] || '';
      
      console.log(`Mapping: ${header} -> ${mappingKey} = ${value}`);
      
      if (mappingKey === 'name' || mappingKey === 'fullName') {
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
      } else if (mappingKey === 'phone') {
        leadData.phone = value;
      } else if (mappingKey === 'status' || mappingKey === 'currentStage') {
        leadData.statusName = value;
        leadData.currentStage = value;
        leadData.status = initialStageId; // Will be updated later if stage matches
      } else if (mappingKey === 'assignedTo') {
        leadData.assignedTo = value;
      } else if (mappingKey === 'notes') {
        leadData.notes = value;
      } else if (mappingKey === 'lastContact') {
        leadData.lastContact = value;
      } else if (mappingKey === 'firstContactDate') {
        leadData.firstContactDate = value;
      } else if (mappingKey === 'nextFollowUpDate') {
        leadData.nextFollowUpDate = value;
      } else if (mappingKey === 'source') {
        leadData.source = value;
      } else if (mappingKey === 'linkedin') {
        if (!leadData.socialProfiles) leadData.socialProfiles = {};
        leadData.socialProfiles.linkedin = value;
      } else if (mappingKey === 'twitter') {
        if (!leadData.socialProfiles) leadData.socialProfiles = {};
        leadData.socialProfiles.twitter = value;
      } else if (mappingKey === 'facebook') {
        if (!leadData.socialProfiles) leadData.socialProfiles = {};
        leadData.socialProfiles.facebook = value;
      } else if (mappingKey === 'instagram') {
        if (!leadData.socialProfiles) leadData.socialProfiles = {};
        leadData.socialProfiles.instagram = value;
      } else if (mappingKey === 'whatsapp') {
        if (!leadData.socialProfiles) leadData.socialProfiles = {};
        leadData.socialProfiles.whatsapp = value;
      } else if (mappingKey && mappingKey.startsWith('platform_')) {
        // Handle custom platforms (keys starting with 'platform_')
        if (!leadData.socialProfiles) leadData.socialProfiles = {};
        const platformId = mappingKey.replace('platform_', '');
        if (platformId && value) {
          leadData.socialProfiles[platformId] = value;
        }
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
    
    // Ensure id is always a string for consistency
    if (typeof leadData.id === 'number') {
      leadData.id = String(leadData.id);
    }
    
    console.log('Processed lead data:', leadData);
    newLeads.push(leadData);
  }
  
  console.log(`Total leads processed: ${newLeads.length}`);
  return newLeads;
};
