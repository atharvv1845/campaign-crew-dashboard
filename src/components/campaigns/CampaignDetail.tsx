
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Filter, 
  Download, 
  Users, 
  Calendar, 
  Mail, 
  MessageSquare, 
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock campaign data (in a real app, this would come from an API/database)
const campaignData = {
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
const leadsData = [
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

// Channel badge component
const ChannelBadge: React.FC<{ channel: string }> = ({ channel }) => {
  const getChannelStyles = (channel: string) => {
    switch (channel) {
      case 'Email':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'LinkedIn':
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
      case 'WhatsApp':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'SMS':
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case 'Twitter':
        return "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400";
      case 'Instagram':
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-1",
      getChannelStyles(channel)
    )}>
      {channel}
    </span>
  );
};

// Stage badge component
const StageBadge: React.FC<{ stage: string }> = ({ stage }) => {
  const getStageStyles = (stage: string) => {
    switch (stage) {
      case 'Not Contacted':
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case 'Contacted':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'Replied':
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
      case 'Follow-Up Needed':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case 'Positive':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'Negative':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      getStageStyles(stage)
    )}>
      {stage}
    </span>
  );
};

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [view, setView] = useState<'table' | 'kanban'>('table');
  
  // In a real app, we'd fetch the campaign data based on the ID
  // For now, we'll just use our mock data
  const campaign = campaignData;
  
  return (
    <div className="space-y-6">
      {/* Campaign header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.history.back()}
            className="p-1 rounded-md hover:bg-muted/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{campaign.name}</h1>
            <p className="text-sm text-muted-foreground">
              Created on {campaign.createdAt} • {campaign.status}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
            <Download className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
            <Users className="h-4 w-4" />
            <span>Manage Team</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm shadow-sm hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Leads</span>
          </button>
        </div>
      </div>
      
      {/* Campaign description */}
      {campaign.description && (
        <p className="text-sm text-muted-foreground">{campaign.description}</p>
      )}
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Leads</p>
              <p className="text-2xl font-bold">{campaign.leads.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary"
                style={{ width: `${(campaign.contacted / campaign.leads) * 100}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {campaign.contacted.toLocaleString()} contacted ({Math.round((campaign.contacted / campaign.leads) * 100)}%)
            </p>
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Responses</p>
              <p className="text-2xl font-bold">{campaign.responses.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500"
                style={{ width: `${(campaign.responses / campaign.contacted) * 100}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {Math.round((campaign.responses / campaign.contacted) * 100)}% response rate
            </p>
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Positive</p>
              <p className="text-2xl font-bold">{campaign.positive.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500"
                style={{ width: `${(campaign.positive / campaign.responses) * 100}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {Math.round((campaign.positive / campaign.responses) * 100)}% of responses
            </p>
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <XCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Negative</p>
              <p className="text-2xl font-bold">{campaign.negative.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500"
                style={{ width: `${(campaign.negative / campaign.responses) * 100}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {Math.round((campaign.negative / campaign.responses) * 100)}% of responses
            </p>
          </div>
        </div>
      </div>
      
      {/* Channels and stages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channels */}
        <div className="glass-card p-4 rounded-xl">
          <h3 className="text-sm font-medium mb-3">Outreach Channels</h3>
          <div className="flex flex-wrap gap-2">
            {campaign.channels.map((channel, index) => (
              <ChannelBadge key={index} channel={channel} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-muted/10 rounded-lg">
              <div className="flex items-center justify-center h-8 w-8 mx-auto rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-2">
                <Mail className="h-4 w-4" />
              </div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">872 sent</p>
            </div>
            <div className="text-center p-3 bg-muted/10 rounded-lg">
              <div className="flex items-center justify-center h-8 w-8 mx-auto rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 mb-2">
                <MessageSquare className="h-4 w-4" />
              </div>
              <p className="text-xs text-muted-foreground">LinkedIn</p>
              <p className="text-sm font-medium">543 sent</p>
            </div>
            <div className="text-center p-3 bg-muted/10 rounded-lg">
              <div className="flex items-center justify-center h-8 w-8 mx-auto rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mb-2">
                <MessageSquare className="h-4 w-4" />
              </div>
              <p className="text-xs text-muted-foreground">WhatsApp</p>
              <p className="text-sm font-medium">321 sent</p>
            </div>
          </div>
        </div>
        
        {/* Stages */}
        <div className="glass-card p-4 rounded-xl">
          <h3 className="text-sm font-medium mb-3">Lead Stages</h3>
          <div className="space-y-3">
            {campaign.stages.map(stage => (
              <div key={stage.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StageBadge stage={stage.name} />
                  <span className="text-sm">{stage.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{stage.count.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((stage.count / campaign.leads) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Leads tracking */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Lead Tracking</h2>
          
          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="flex items-center bg-muted/10 rounded-lg p-1">
              <button
                onClick={() => setView('table')}
                className={cn(
                  "px-3 py-1 rounded-md text-sm transition-colors",
                  view === 'table' 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted/20"
                )}
              >
                Table
              </button>
              <button
                onClick={() => setView('kanban')}
                className={cn(
                  "px-3 py-1 rounded-md text-sm transition-colors",
                  view === 'kanban' 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted/20"
                )}
              >
                Kanban
              </button>
            </div>
            
            {/* Filters */}
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {/* Filter dropdown would go here */}
            </div>
          </div>
        </div>
        
        {/* Table view */}
        {view === 'table' && (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/20 border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Lead</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Contacted</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Stage</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {leadsData.map(lead => (
                    <tr key={lead.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">{lead.company}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {lead.email && (
                            <a href={`mailto:${lead.email}`} className="text-primary hover:text-primary/80">
                              <Mail className="h-4 w-4" />
                            </a>
                          )}
                          {lead.linkedin && (
                            <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-400">
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                            </a>
                          )}
                          {lead.whatsapp && (
                            <a href={`https://wa.me/${lead.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400">
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                            </a>
                          )}
                          {lead.twitter && (
                            <a href={`https://twitter.com/${lead.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">{lead.lastContacted}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StageBadge stage={lead.currentStage} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">{lead.assignedTo}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Kanban view */}
        {view === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
            {campaign.stages.map(stage => (
              <div key={stage.id} className="min-w-[250px] glass-card rounded-xl overflow-hidden">
                <div className="p-3 border-b border-border bg-muted/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{stage.name}</h3>
                    <span className="text-xs bg-muted/20 px-2 py-0.5 rounded-full">
                      {stage.count}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 space-y-2 max-h-[500px] overflow-y-auto">
                  {/* Filter leads by stage and map them here */}
                  {leadsData
                    .filter(lead => lead.currentStage === stage.name)
                    .map(lead => (
                      <div 
                        key={lead.id}
                        className="p-3 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium">{lead.name}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{lead.company}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{lead.assignedTo}</span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">{lead.lastContacted}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetail;
