
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
}

// Sample campaign data for development
export const campaignData: CampaignData[] = [
  {
    id: 1,
    name: "Q2 Marketing Campaign",
    status: "Active",
    type: "Outreach",
    channels: ["Email", "LinkedIn"],
    leads: 24,
    responses: 8,
    positive: 5,
    negative: 3,
    conversion: "20.8%",
    teamMembers: ["Alex", "Jamie"],
    createdAt: "2023-04-01"
  },
  {
    id: 2,
    name: "Product Launch",
    status: "Draft",
    type: "Marketing",
    channels: ["Email", "SMS", "LinkedIn"],
    leads: 50,
    responses: 0,
    positive: 0,
    negative: 0,
    conversion: "0%",
    teamMembers: ["Sam", "Jordan"],
    createdAt: "2023-04-10"
  },
  {
    id: 3,
    name: "Event Follow-up",
    status: "Completed",
    type: "Follow-up",
    channels: ["Email", "Call"],
    leads: 15,
    responses: 12,
    positive: 9,
    negative: 3,
    conversion: "60%",
    teamMembers: ["Taylor"],
    createdAt: "2023-03-15"
  }
];
