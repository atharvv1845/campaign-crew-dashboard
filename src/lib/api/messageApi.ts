
import { MessageScript } from '@/components/messaging/MessageTemplates';

// Function to fetch all script templates
export const fetchScriptTemplates = async () => {
  // In a real application, this would be an API call
  // Instead of hardcoded values, we'll get from localStorage
  return new Promise<MessageScript[]>((resolve) => {
    setTimeout(() => {
      try {
        const savedTemplates = localStorage.getItem('messageTemplates');
        const templates = savedTemplates ? JSON.parse(savedTemplates) : [];
        resolve(templates);
      } catch (error) {
        console.error("Error fetching templates:", error);
        resolve([]);
      }
    }, 300);
  });
};

// Function to fetch a script template by ID
export const fetchScriptById = async (id: number) => {
  return new Promise<MessageScript | undefined>((resolve, reject) => {
    setTimeout(() => {
      try {
        const savedTemplates = localStorage.getItem('messageTemplates');
        const templates = savedTemplates ? JSON.parse(savedTemplates) : [];
        const script = templates.find((s: MessageScript) => s.id === id);
        
        if (script) {
          resolve(script);
        } else {
          reject(new Error(`Script with ID ${id} not found`));
        }
      } catch (error) {
        reject(error);
      }
    }, 300);
  });
};

// Function to create a new script template
export const createScript = async (data: Omit<MessageScript, 'id' | 'usageCount' | 'responseRate' | 'lastUsed' | 'createdAt'>) => {
  return new Promise<MessageScript>((resolve) => {
    setTimeout(() => {
      try {
        const savedTemplates = localStorage.getItem('messageTemplates');
        const templates = savedTemplates ? JSON.parse(savedTemplates) : [];
        
        const newId = templates.length > 0 
          ? Math.max(...templates.map((s: MessageScript) => s.id)) + 1 
          : 1;
        
        const newScript: MessageScript = {
          ...data,
          id: newId,
          usageCount: 0,
          responseRate: 0,
          lastUsed: 'Never',
          createdAt: new Date().toISOString().split('T')[0],
        };
        
        templates.push(newScript);
        localStorage.setItem('messageTemplates', JSON.stringify(templates));
        
        resolve(newScript);
      } catch (error) {
        console.error("Error creating script:", error);
        resolve({
          ...data,
          id: 1,
          usageCount: 0,
          responseRate: 0,
          lastUsed: 'Never',
          createdAt: new Date().toISOString().split('T')[0],
        });
      }
    }, 300);
  });
};

// Function to update a script template
export const updateScript = async (id: number, data: Partial<MessageScript>) => {
  return new Promise<MessageScript>((resolve, reject) => {
    setTimeout(() => {
      try {
        const savedTemplates = localStorage.getItem('messageTemplates');
        const templates = savedTemplates ? JSON.parse(savedTemplates) : [];
        
        const index = templates.findIndex((s: MessageScript) => s.id === id);
        if (index !== -1) {
          templates[index] = { ...templates[index], ...data };
          localStorage.setItem('messageTemplates', JSON.stringify(templates));
          resolve(templates[index]);
        } else {
          reject(new Error(`Script with ID ${id} not found`));
        }
      } catch (error) {
        reject(error);
      }
    }, 300);
  });
};

// Function to delete a script template
export const deleteScript = async (id: number) => {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      try {
        const savedTemplates = localStorage.getItem('messageTemplates');
        const templates = savedTemplates ? JSON.parse(savedTemplates) : [];
        
        const index = templates.findIndex((s: MessageScript) => s.id === id);
        if (index !== -1) {
          templates.splice(index, 1);
          localStorage.setItem('messageTemplates', JSON.stringify(templates));
          resolve(true);
        } else {
          reject(new Error(`Script with ID ${id} not found`));
        }
      } catch (error) {
        reject(error);
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
