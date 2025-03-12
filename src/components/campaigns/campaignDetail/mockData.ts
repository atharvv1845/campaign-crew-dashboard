
import { Lead } from '@/components/leads/LeadTableComponent';
import { CampaignData } from '../campaignData';

// Enhanced mock data for detailed campaign view
export const campaignData: CampaignData & { 
  description?: string;
  stages?: Array<{
    id: number;
    name: string;
    count: number;
  }>;
} = {
  id: 1,
  name: "Q1 Tech Companies Outreach",
  status: "Active",
  type: "Sales",
  channels: ["email", "linkedin", "call", "whatsapp"],
  leads: 1250,
  responses: 375,
  positive: 125,
  negative: 75,
  conversion: "10%",
  createdAt: "Jan 15, 2023",
  teamMembers: ['John Smith', 'Sarah Lee', 'Alex Chen', 'Mia Johnson'],
  description: "This campaign targets SaaS companies with 50-200 employees in the North American market. The primary goal is to schedule demos with decision-makers in the marketing and sales departments."
};

// Mock leads data for the campaign
export const leadsData: Array<{
  id: number;
  name: string;
  email: string;
  company: string;
  title: string;
  status: string;
  campaign: string;
  lastContact: string;
  contactMethods?: string[];
}> = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    company: "TechCorp",
    title: "Marketing Director",
    status: "Contacted",
    campaign: "Q1 Tech Companies",
    lastContact: "Mar 5, 2023",
    contactMethods: ["email", "linkedin"]
  },
  {
    id: 2,
    name: "Alice Johnson",
    email: "alice.johnson@innovate.ai",
    company: "Innovate AI",
    title: "CEO",
    status: "Replied",
    campaign: "Q1 Tech Companies",
    lastContact: "Mar 8, 2023",
    contactMethods: ["email", "call"]
  },
  {
    id: 3,
    name: "Bob Williams",
    email: "bob.williams@cloudsolutions.net",
    company: "Cloud Solutions",
    title: "CTO",
    status: "Not Contacted",
    campaign: "Q1 Tech Companies",
    lastContact: "Never",
    contactMethods: ["linkedin"]
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@datawise.io",
    company: "DataWise",
    title: "Data Scientist",
    status: "Contacted",
    campaign: "Q1 Tech Companies",
    lastContact: "Mar 10, 2023",
    contactMethods: ["email"]
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@softwaresolutions.com",
    company: "Software Solutions",
    title: "VP of Engineering",
    status: "Replied",
    campaign: "Q1 Tech Companies",
    lastContact: "Mar 12, 2023",
    contactMethods: ["email", "call"]
  },
  {
    id: 6,
    name: "Olivia Green",
    email: "olivia.green@globaltech.org",
    company: "Global Tech",
    title: "Project Manager",
    status: "Positive",
    campaign: "Q1 Tech Companies",
    lastContact: "Mar 15, 2023",
    contactMethods: ["email", "linkedin", "whatsapp"]
  },
  {
    id: 7,
    name: "James Miller",
    email: "james.miller@cybersecurity.com",
    company: "Cybersecurity Inc.",
    title: "Security Analyst",
    status: "Negative",
    campaign: "Q1 Tech Companies",
    lastContact: "Mar 18, 2023",
    contactMethods: ["email"]
  },
  {
    id: 8,
    name: "Linda Wilson",
    email: "linda.wilson@mobileapps.dev",
    company: "Mobile Apps Dev",
    title: "Mobile Developer",
    status: "Not Contacted",
    campaign: "Q1 Tech Companies",
    lastContact: "Never",
    contactMethods: ["linkedin"]
  },
  {
    id: 9,
    name: "Thomas Taylor",
    email: "thomas.taylor@aiinnovations.net",
    company: "AI Innovations",
    title: "AI Researcher",
    status: "Contacted",
    campaign: "Q1 Tech Companies",
    lastContact: "Mar 20, 2023",
    contactMethods: ["email", "call"]
  },
  {
    id: 10,
    name: "Sophia Anderson",
    email: "sophia.anderson@biotech.org",
    company: "BioTech Solutions",
    title: "Biologist",
    status: "Replied",
    campaign: "Q1 Tech Companies",
    lastContact: "Mar 22, 2023",
    contactMethods: ["email"]
  }
];
