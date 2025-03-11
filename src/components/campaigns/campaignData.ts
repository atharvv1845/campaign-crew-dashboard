
export interface CampaignData {
  id: number;
  name: string;
  status: string;
  type: string;
  channels: string[];
  leads: number;
  responses: number;
  positive: number;
  negative: number;
  conversion: string;
  teamMembers: string[];
  createdAt: string;
  description?: string; // Added description field
}

// Update available channels for outreach
export const availableChannels = [
  { id: 'email', name: 'Email', icon: 'Mail' },
  { id: 'phone', name: 'Call', icon: 'Phone' },
  { id: 'sms', name: 'SMS', icon: 'MessageSquare' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin' },
  { id: 'twitter', name: 'Twitter', icon: 'Twitter' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle' },
  { id: 'instagram', name: 'Instagram', icon: 'Instagram' },
];

// Mock campaign data
export const campaignData: CampaignData[] = [
  {
    id: 1,
    name: 'Q4 Product Launch',
    status: 'Active',
    type: 'Email',
    channels: ['Email', 'LinkedIn'],
    leads: 1243,
    responses: 341,
    positive: 210,
    negative: 131,
    conversion: '27.4%',
    teamMembers: ['John Smith', 'Sarah Lee'],
    createdAt: '2023-09-15',
  },
  {
    id: 2,
    name: 'Summer Sale Outreach',
    status: 'Active',
    type: 'Email',
    channels: ['Email', 'WhatsApp'],
    leads: 2540,
    responses: 764,
    positive: 521,
    negative: 243,
    conversion: '30.1%',
    teamMembers: ['Alex Chen'],
    createdAt: '2023-06-01',
  },
  {
    id: 3,
    name: 'Customer Feedback Survey',
    status: 'Completed',
    type: 'Email',
    channels: ['Email', 'SMS'],
    leads: 864,
    responses: 342,
    positive: 289,
    negative: 53,
    conversion: '39.6%',
    teamMembers: ['John Smith', 'Mia Johnson'],
    createdAt: '2023-08-10',
  },
  {
    id: 4,
    name: 'New Feature Announcement',
    status: 'Draft',
    type: 'Email',
    channels: ['Email'],
    leads: 0,
    responses: 0,
    positive: 0,
    negative: 0,
    conversion: '0%',
    teamMembers: [],
    createdAt: '2023-10-05',
  },
  {
    id: 5,
    name: 'Webinar Invitation',
    status: 'Scheduled',
    type: 'Email',
    channels: ['Email', 'LinkedIn'],
    leads: 2100,
    responses: 0,
    positive: 0,
    negative: 0,
    conversion: '0%',
    teamMembers: ['Alex Chen', 'Sarah Lee'],
    createdAt: '2023-10-01',
  },
  {
    id: 6,
    name: 'Customer Re-engagement',
    status: 'Active',
    type: 'Email',
    channels: ['Email', 'LinkedIn', 'WhatsApp'],
    leads: 3654,
    responses: 872,
    positive: 512,
    negative: 360,
    conversion: '23.9%',
    teamMembers: ['Mia Johnson'],
    createdAt: '2023-07-22',
  },
];
