
// Mock campaign data (in a real app, this would come from an API/database)
export const campaignData = {
  id: 1,
  name: 'Q4 Product Launch',
  description: 'Reaching out to potential enterprise customers for our new analytics platform',
  status: 'Active',
  type: 'Email',
  channels: ['Email', 'LinkedIn', 'WhatsApp'],
  leads: 1243,
  contacted: 872,
  responses: 341,
  positive: 210,
  negative: 131,
  conversion: '27.4%',
  teamMembers: ['John Smith', 'Sarah Lee'],
  createdAt: '2023-09-15',
  stages: [
    { id: 1, name: 'Not Contacted', count: 371 },
    { id: 2, name: 'Contacted', count: 531 },
    { id: 3, name: 'Replied', count: 257 },
    { id: 4, name: 'Follow-Up Needed', count: 43 },
    { id: 5, name: 'Positive', count: 210 },
    { id: 6, name: 'Negative', count: 131 },
  ]
};

// Mock lead data
export const leadsData = [
  {
    id: 1,
    name: 'Alex Johnson',
    company: 'TechCorp Inc.',
    email: 'alex.johnson@techcorp.com',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    whatsapp: '+1234567890',
    twitter: '@alexj',
    lastContacted: '2023-10-02',
    currentStage: 'Replied',
    assignedTo: 'John Smith'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    company: 'InnovateSoft',
    email: 'maria.garcia@innovatesoft.com',
    linkedin: 'https://linkedin.com/in/mariagarcia',
    whatsapp: '+0987654321',
    twitter: '@mariag',
    lastContacted: '2023-10-01',
    currentStage: 'Positive',
    assignedTo: 'Sarah Lee'
  },
  {
    id: 3,
    name: 'James Wilson',
    company: 'DataAnalytics Ltd',
    email: 'james.wilson@dataanalytics.com',
    linkedin: 'https://linkedin.com/in/jameswilson',
    whatsapp: null,
    twitter: '@jwilson',
    lastContacted: '2023-09-29',
    currentStage: 'Not Contacted',
    assignedTo: 'John Smith'
  },
  {
    id: 4,
    name: 'Sofia Chen',
    company: 'CloudSolutions',
    email: 'sofia.chen@cloudsolutions.com',
    linkedin: 'https://linkedin.com/in/sofiachen',
    whatsapp: '+1122334455',
    twitter: null,
    lastContacted: '2023-09-28',
    currentStage: 'Contacted',
    assignedTo: 'Sarah Lee'
  },
  {
    id: 5,
    name: 'David Kim',
    company: 'SecurityTech',
    email: 'david.kim@securitytech.com',
    linkedin: 'https://linkedin.com/in/davidkim',
    whatsapp: '+5566778899',
    twitter: '@davidk',
    lastContacted: '2023-10-03',
    currentStage: 'Follow-Up Needed',
    assignedTo: 'John Smith'
  },
];
