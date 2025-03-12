
import { Lead } from "@/components/campaigns/campaignDetail/leads/types";

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
  description?: string;
  contacted?: number;
  leadsData?: Lead[];
  messageFlow?: {
    nodes: any[];
    edges: any[];
  };
  stages?: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

// Example lead data format
export const sampleLeadData: Lead[] = [
  {
    id: 1,
    name: "Rabaily",
    socialProfiles: {
      instagram: "rabaily"
    },
    status: "Pending",
    campaignId: 1
  },
  {
    id: 2,
    name: "JJ Buckner",
    socialProfiles: {
      instagram: "jjbuckner"
    },
    status: "Contacted",
    campaignId: 1
  },
  {
    id: 3,
    name: "Kristi Sauter",
    socialProfiles: {
      instagram: "kristisauter_trilogymortgage"
    },
    status: "Interested",
    campaignId: 1
  },
  {
    id: 4,
    name: "Rob Livingston",
    socialProfiles: {
      instagram: "robdlivingston"
    },
    status: "Contacted",
    campaignId: 1
  },
  {
    id: 5,
    name: "Patrick O'Shea",
    socialProfiles: {
      instagram: "patrick.j.oshea"
    },
    status: "Pending",
    campaignId: 2
  },
  {
    id: 6,
    name: "Bailey Smith",
    socialProfiles: {
      instagram: "baileysmith2"
    },
    status: "Not Interested",
    campaignId: 2
  },
  {
    id: 7,
    name: "Shay Giff",
    socialProfiles: {
      instagram: "shaygiff"
    },
    status: "Interested",
    campaignId: 2
  },
  {
    id: 8,
    name: "Angie Baughman",
    socialProfiles: {
      instagram: "angiebaughman.homeloans"
    },
    status: "Converted",
    campaignId: 3
  },
  {
    id: 9,
    name: "E Mortgage Capital",
    socialProfiles: {
      instagram: "emortgagecapital.irvine"
    },
    status: "Interested",
    campaignId: 3
  }
];

// Initial campaign data with the sample leads
export const campaignData: CampaignData[] = [
  {
    id: 1,
    name: "Instagram Influencer Outreach",
    status: "Active",
    type: "Outreach",
    channels: ["Instagram"],
    leads: 4,
    responses: 2,
    positive: 1,
    negative: 0,
    conversion: "25%",
    teamMembers: ["JS", "MK"],
    createdAt: "2023-10-15",
    description: "Campaign targeting Instagram influencers in the finance space",
    leadsData: sampleLeadData.filter(lead => lead.campaignId === 1)
  },
  {
    id: 2,
    name: "Real Estate Professionals",
    status: "Active",
    type: "Lead Generation",
    channels: ["Instagram", "Email"],
    leads: 3,
    responses: 2,
    positive: 1,
    negative: 1,
    conversion: "33%",
    teamMembers: ["AL", "RJ"],
    createdAt: "2023-11-02",
    description: "Targeting real estate professionals for mortgage partnerships",
    leadsData: sampleLeadData.filter(lead => lead.campaignId === 2)
  },
  {
    id: 3,
    name: "Mortgage Broker Partnerships",
    status: "Draft",
    type: "Partnership",
    channels: ["Instagram", "LinkedIn"],
    leads: 2,
    responses: 1,
    positive: 1,
    negative: 0,
    conversion: "50%",
    teamMembers: ["TS"],
    createdAt: "2023-12-05",
    description: "Building partnerships with mortgage brokers",
    leadsData: sampleLeadData.filter(lead => lead.campaignId === 3)
  }
];
