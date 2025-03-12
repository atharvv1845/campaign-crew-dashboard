
export interface CampaignData {
  id: number;
  name: string;
  status: string;
  type: string;
  channels: string[];
  leads: number | any[];
  responses: number;
  positive: number;
  negative: number;
  conversion: string;
  teamMembers: string[];
  createdAt: string;
  description?: string;
  contacted?: number;
  stages?: any[];
  messageFlow?: {
    nodes: any[];
    edges: any[];
  };
  leadsData?: any[]; // Detailed lead objects
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

// Empty campaign data - we'll only store created campaigns
export const campaignData: CampaignData[] = [];
