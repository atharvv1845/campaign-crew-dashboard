
import { LeadData } from '../hooks/types';
import { parseCsvContent } from './csvFileOperations';

export const processLeadData = (
  csvContent: string,
  mapping: Record<string, string>,
  initialStageId: string,
  generateId: () => string,
  customStages?: { id: string; name: string }[]
): LeadData[] => {
  try {
    const { data, headers } = parseCsvContent(csvContent);
    const leads: LeadData[] = [];
    
    // Extract mapped field names for easier access
    const nameField = Object.keys(mapping).find(key => mapping[key] === 'name');
    const emailField = Object.keys(mapping).find(key => mapping[key] === 'email');
    const phoneField = Object.keys(mapping).find(key => mapping[key] === 'phone');
    const companyField = Object.keys(mapping).find(key => mapping[key] === 'company');
    const titleField = Object.keys(mapping).find(key => mapping[key] === 'title');
    
    // Process each row in the CSV data
    data.forEach((row: any) => {
      // Skip empty rows
      if (!row || Object.values(row).every(val => !val)) {
        return;
      }
      
      // Create a new lead object
      const lead: LeadData = {
        id: generateId(),
        name: nameField ? row[nameField] : '',
        email: emailField ? row[emailField] : '',
        phone: phoneField ? row[phoneField] : '',
        company: companyField ? row[companyField] : '',
        title: titleField ? row[titleField] : '',
        status: 'New',
        currentStage: customStages && customStages.length > 0 
          ? customStages[0].name 
          : 'New Lead',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastContact: null,
        nextFollowUpDate: null,
        assignedTo: '',
        notes: '',
        campaignId: initialStageId,
        tags: [], // Add tags as an empty array
        contactPlatforms: [], // Initialize contact platforms
      };
      
      // Add extra fields from CSV if they exist
      Object.keys(row).forEach(key => {
        if (!mapping[key]) {
          // If this field wasn't mapped to a standard field, add it as a custom field
          (lead as any)[key] = row[key];
        }
      });
      
      leads.push(lead);
    });
    
    console.log(`Processed ${leads.length} leads from CSV`);
    return leads;
  } catch (error) {
    console.error('Error processing lead data:', error);
    throw error;
  }
};
