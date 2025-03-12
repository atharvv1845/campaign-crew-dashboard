
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
      firstContacted: '',
      lastContacted: '',
      followUpDate: '',
      notes: '',
      platformLinks: '',
      assignedTo: '',
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: '',
      whatsapp: '',
      socialProfiles: {}
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
        leadData.socialProfiles.linkedin = value;
      } else if (mappingKey === 'twitter') {
        leadData.twitter = value;
        leadData.socialProfiles.twitter = value;
      } else if (mappingKey === 'facebook') {
        leadData.facebook = value;
        leadData.socialProfiles.facebook = value;
      } else if (mappingKey === 'instagram') {
        leadData.instagram = value;
        leadData.socialProfiles.instagram = value;
      } else if (mappingKey === 'whatsapp') {
        leadData.whatsapp = value;
        leadData.socialProfiles.whatsapp = value;
      } else if (mappingKey === 'platformLinks') {
        leadData.platformLinks = value;
        
        // Try to extract individual links if platformLinks contains URLs
        if (value) {
          const urls = value.split(/[\s,;]+/);
          
          urls.forEach(url => {
            const trimmedUrl = url.trim();
            if (!trimmedUrl) return;
            
            if (trimmedUrl.includes('linkedin.com') || /linkedin|\/in\//.test(trimmedUrl)) {
              leadData.linkedin = trimmedUrl;
              leadData.socialProfiles.linkedin = trimmedUrl;
            } else if (trimmedUrl.includes('twitter.com') || trimmedUrl.includes('x.com') || /twitter|@/.test(trimmedUrl)) {
              leadData.twitter = trimmedUrl;
              leadData.socialProfiles.twitter = trimmedUrl;
            } else if (trimmedUrl.includes('facebook.com') || /facebook|fb\.com/.test(trimmedUrl)) {
              leadData.facebook = trimmedUrl;
              leadData.socialProfiles.facebook = trimmedUrl;
            } else if (trimmedUrl.includes('instagram.com') || /instagram|insta/.test(trimmedUrl)) {
              leadData.instagram = trimmedUrl;
              leadData.socialProfiles.instagram = trimmedUrl;
            } else if (trimmedUrl.includes('wa.me') || /whatsapp|whats\sapp/.test(trimmedUrl)) {
              leadData.whatsapp = trimmedUrl;
              leadData.socialProfiles.whatsapp = trimmedUrl;
            } else if (trimmedUrl.includes('@') && !leadData.email) {
              // Assume it's an email if it contains @ and we don't already have one
              leadData.email = trimmedUrl;
            }
          });
        }
      } else if (mappingKey === 'lastContacted') {
        leadData.lastContacted = value;
      } else if (mappingKey === 'firstContacted') {
        leadData.firstContacted = value;
      } else if (mappingKey === 'followUpDate') {
        leadData.followUpDate = value;
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
    
    // Debugging the processed lead data
    console.log('Processed lead data:', leadData);
    
    newLeads.push(leadData);
  }
  
  return newLeads;
};
