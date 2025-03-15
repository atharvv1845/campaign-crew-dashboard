
import { MessageScript } from '@/components/messaging/MessageTemplates';

// Mock templates data
const scriptTemplates: MessageScript[] = [
  {
    id: 1,
    name: 'Initial Outreach',
    platform: 'linkedin',
    subject: 'Introducing our new solution for {company}',
    content: 'Hi {firstName}, I hope this message finds you well. I noticed that {company} has been working on {industry} solutions, and I thought you might be interested in our approach that has helped similar companies achieve {benefit}.',
    usageCount: 1432,
    responseRate: 32,
    lastUsed: '2 days ago',
    campaignName: 'Tech Startup Outreach',
    variables: ['{firstName}', '{company}', '{industry}', '{benefit}'],
    createdAt: '2023-08-15',
  },
  {
    id: 2,
    name: 'Follow-up #1',
    platform: 'email',
    subject: 'Following up on my previous email',
    content: 'Hi {firstName}, I just wanted to follow up on my previous message to see if you had a chance to consider our proposal for {company}. I\'d be happy to provide more information or schedule a quick call.',
    usageCount: 1056,
    responseRate: 24,
    lastUsed: '1 day ago',
    campaignName: 'Tech Startup Outreach',
    variables: ['{firstName}', '{company}'],
    createdAt: '2023-08-20',
  },
  {
    id: 3,
    name: 'Demo Request',
    platform: 'whatsapp',
    content: "Hi {firstName}, I'd like to offer you a personalized demo of our solution that has helped {company} achieve {benefit}. Would you have 15 minutes this week for a quick demonstration?",
    usageCount: 873,
    responseRate: 41,
    lastUsed: '3 days ago',
    campaignName: 'Enterprise Outreach',
    variables: ['{firstName}', '{company}', '{benefit}'],
    createdAt: '2023-09-01',
  },
  {
    id: 4,
    name: 'Case Study Share',
    platform: 'email',
    subject: 'How {similarCompany} achieved {result}',
    content: 'Hi {firstName}, I thought you might be interested in this case study of how we helped {similarCompany} in the {industry} industry improve their {metric} by {result}. Given {company}\'s recent focus on {focus}, I thought this might be relevant.',
    usageCount: 632,
    responseRate: 37,
    lastUsed: '5 days ago',
    campaignName: 'Enterprise Outreach',
    variables: ['{firstName}', '{company}', '{similarCompany}', '{industry}', '{metric}', '{result}', '{focus}'],
    createdAt: '2023-09-10',
  },
];

// Function to fetch all script templates
export const fetchScriptTemplates = async () => {
  // In a real application, this would be an API call
  return new Promise<MessageScript[]>((resolve) => {
    setTimeout(() => {
      resolve(scriptTemplates);
    }, 500);
  });
};

// Function to fetch a script template by ID
export const fetchScriptById = async (id: number) => {
  return new Promise<MessageScript | undefined>((resolve, reject) => {
    setTimeout(() => {
      const script = scriptTemplates.find(s => s.id === id);
      if (script) {
        resolve(script);
      } else {
        reject(new Error(`Script with ID ${id} not found`));
      }
    }, 300);
  });
};

// Function to create a new script template
export const createScript = async (data: Omit<MessageScript, 'id' | 'usageCount' | 'responseRate' | 'lastUsed' | 'createdAt'>) => {
  return new Promise<MessageScript>((resolve) => {
    setTimeout(() => {
      const newScript: MessageScript = {
        ...data,
        id: Math.max(...scriptTemplates.map(s => s.id)) + 1,
        usageCount: 0,
        responseRate: 0,
        lastUsed: 'Never',
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      scriptTemplates.push(newScript);
      resolve(newScript);
    }, 300);
  });
};

// Function to update a script template
export const updateScript = async (id: number, data: Partial<MessageScript>) => {
  return new Promise<MessageScript>((resolve, reject) => {
    setTimeout(() => {
      const index = scriptTemplates.findIndex(s => s.id === id);
      if (index !== -1) {
        scriptTemplates[index] = { ...scriptTemplates[index], ...data };
        resolve(scriptTemplates[index]);
      } else {
        reject(new Error(`Script with ID ${id} not found`));
      }
    }, 300);
  });
};

// Function to delete a script template
export const deleteScript = async (id: number) => {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      const index = scriptTemplates.findIndex(s => s.id === id);
      if (index !== -1) {
        scriptTemplates.splice(index, 1);
        resolve(true);
      } else {
        reject(new Error(`Script with ID ${id} not found`));
      }
    }, 300);
  });
};

// Function to apply variables to a message template
export const applyVariables = (content: string, variables: Record<string, string>) => {
  let result = content;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(regex, value);
  });
  return result;
};
