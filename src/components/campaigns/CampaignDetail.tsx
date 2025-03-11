
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Linkedin, 
  MessageCircle, 
  Phone, 
  Twitter, 
  Instagram, 
  Share2, 
  Filter, 
  ChevronDown, 
  Download, 
  MessageSquare, 
  UserPlus,
  MoreHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock campaign data (would be fetched based on ID in a real app)
const campaignData = {
  id: 1,
  name: 'Q4 Product Launch',
  description: 'Targeting decision makers at SaaS companies with 50+ employees',
  status: 'Active',
  channels: ['Email', 'LinkedIn', 'WhatsApp'],
  leads: {
    total: 1243,
    contacted: 932,
    replied: 341,
    positive: 210,
    negative: 131,
    followUp: 87
  },
  teamMembers: ['John Smith', 'Sarah Lee'],
  createdAt: '2023-09-15',
  stages: [
    { id: 1, name: 'Not Contacted', color: 'gray' },
    { id: 2, name: 'Contacted', color: 'blue' },
    { id: 3, name: 'Replied - Positive', color: 'green' },
    { id: 4, name: 'Replied - Negative', color: 'red' },
    { id: 5, name: 'Follow-up Needed', color: 'yellow' },
    { id: 6, name: 'Not Interested', color: 'purple' }
  ]
};

// Mock lead data
const leadData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'Acme Inc.',
    title: 'Marketing Director',
    email: 'sarah.johnson@example.com',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    whatsapp: '+15551234567',
    twitter: '@sarahjohnson',
    stage: 'Replied - Positive',
    lastContacted: '2023-10-14',
    assignedTo: 'Sarah Lee'
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'Tech Solutions Ltd.',
    title: 'CTO',
    email: 'michael.chen@example.com',
    linkedin: 'https://linkedin.com/in/michaelchen',
    whatsapp: '+15559876543',
    twitter: '@mchen',
    stage: 'Contacted',
    lastContacted: '2023-10-12',
    assignedTo: 'John Smith'
  },
  {
    id: 3,
    name: 'Jessica Williams',
    company: 'Global Enterprises',
    title: 'CEO',
    email: 'jessica.williams@example.com',
    linkedin: 'https://linkedin.com/in/jessicawilliams',
    whatsapp: '+15552223333',
    twitter: '@jwilliams',
    stage: 'Not Interested',
    lastContacted: '2023-10-10',
    assignedTo: 'Sarah Lee'
  },
  {
    id: 4,
    name: 'David Miller',
    company: 'Miller Consulting',
    title: 'Principal Consultant',
    email: 'david.miller@example.com',
    linkedin: 'https://linkedin.com/in/davidmiller',
    whatsapp: '+15554445555',
    twitter: '@dmiller',
    stage: 'Follow-up Needed',
    lastContacted: '2023-10-09',
    assignedTo: 'John Smith'
  },
  {
    id: 5,
    name: 'Amanda Rodriguez',
    company: 'InnoTech',
    title: 'Product Manager',
    email: 'amanda.r@example.com',
    linkedin: 'https://linkedin.com/in/amandarodriguez',
    whatsapp: '+15556667777',
    twitter: '@arodriguez',
    stage: 'Not Contacted',
    lastContacted: '',
    assignedTo: 'Sarah Lee'
  },
];

// Lead stage badge component
const StageBadge: React.FC<{ stage: string }> = ({ stage }) => {
  const getStageStyles = (stage: string) => {
    switch (stage) {
      case 'Not Contacted':
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case 'Contacted':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'Replied - Positive':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'Replied - Negative':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case 'Follow-up Needed':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case 'Not Interested':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
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

// Channel icon component
const ChannelIcon: React.FC<{ channel: string }> = ({ channel }) => {
  const getIcon = () => {
    switch (channel) {
      case 'Email':
        return <Mail className="h-5 w-5" />;
      case 'LinkedIn':
        return <Linkedin className="h-5 w-5" />;
      case 'WhatsApp':
        return <MessageCircle className="h-5 w-5" />;
      case 'SMS':
        return <MessageSquare className="h-5 w-5" />;
      case 'Phone':
        return <Phone className="h-5 w-5" />;
      case 'Twitter':
        return <Twitter className="h-5 w-5" />;
      case 'Instagram':
        return <Instagram className="h-5 w-5" />;
      default:
        return <Share2 className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted/20">
      {getIcon()}
    </div>
  );
};

// Progress bar component
const ProgressBar: React.FC<{ percent: number, color: string }> = ({ percent, color }) => {
  const getColorClass = () => {
    switch (color) {
      case 'green':
        return 'bg-green-500';
      case 'blue':
        return 'bg-blue-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
      <div 
        className={`h-full ${getColorClass()}`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string | null>(null);
  const [teamFilter, setTeamFilter] = useState<string | null>(null);
  const [view, setView] = useState<'table' | 'kanban'>('table');
  
  // Calculate progress percentages
  const contactedPercent = Math.round((campaignData.leads.contacted / campaignData.leads.total) * 100);
  const repliedPercent = Math.round((campaignData.leads.replied / campaignData.leads.contacted) * 100) || 0;
  const positivePercent = Math.round((campaignData.leads.positive / campaignData.leads.replied) * 100) || 0;
  const negativePercent = Math.round((campaignData.leads.negative / campaignData.leads.replied) * 100) || 0;
  
  // Filter leads based on search term and filters
  const filteredLeads = leadData.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter ? lead.stage === stageFilter : true;
    const matchesTeam = teamFilter ? lead.assignedTo === teamFilter : true;
    
    return matchesSearch && matchesStage && matchesTeam;
  });
  
  // Group leads by stage for Kanban view
  const leadsByStage = campaignData.stages.reduce((acc, stage) => {
    acc[stage.name] = filteredLeads.filter(lead => lead.stage === stage.name);
    return acc;
  }, {} as Record<string, typeof leadData>);
  
  return (
    <div className="space-y-6">
      {/* Back button and title */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <button 
            onClick={() => navigate('/campaigns')}
            className="flex items-center text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Campaigns</span>
          </button>
          <h1 className="text-2xl font-semibold">{campaignData.name}</h1>
          <p className="text-muted-foreground">{campaignData.description}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className={`px-3 py-1 text-sm rounded-md transition-colors ${view === 'table' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/20'}`}
            onClick={() => setView('table')}
          >
            Table View
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md transition-colors ${view === 'kanban' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/20'}`}
            onClick={() => setView('kanban')}
          >
            Kanban View
          </button>
        </div>
      </div>
      
      {/* Campaign stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-xl">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Contacted</h3>
              <p className="text-2xl font-semibold">{campaignData.leads.contacted}/{campaignData.leads.total}</p>
            </div>
            <div className="flex space-x-1">
              {campaignData.channels.map((channel, idx) => (
                <ChannelIcon key={idx} channel={channel} />
              ))}
            </div>
          </div>
          <ProgressBar percent={contactedPercent} color="blue" />
          <p className="text-sm mt-2">{contactedPercent}% of leads contacted</p>
        </div>
        
        <div className="glass-card p-5 rounded-xl">
          <div className="mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">Replied</h3>
            <p className="text-2xl font-semibold">{campaignData.leads.replied}/{campaignData.leads.contacted}</p>
          </div>
          <ProgressBar percent={repliedPercent} color="green" />
          <p className="text-sm mt-2">{repliedPercent}% response rate</p>
        </div>
        
        <div className="glass-card p-5 rounded-xl">
          <div className="mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">Positive Replies</h3>
            <p className="text-2xl font-semibold">{campaignData.leads.positive}/{campaignData.leads.replied}</p>
          </div>
          <ProgressBar percent={positivePercent} color="green" />
          <p className="text-sm mt-2">{positivePercent}% positive response</p>
        </div>
        
        <div className="glass-card p-5 rounded-xl">
          <div className="mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">Negative Replies</h3>
            <p className="text-2xl font-semibold">{campaignData.leads.negative}/{campaignData.leads.replied}</p>
          </div>
          <ProgressBar percent={negativePercent} color="red" />
          <p className="text-sm mt-2">{negativePercent}% negative response</p>
        </div>
      </div>
      
      {/* Lead tracking section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="glass-input pl-4 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Stage filter */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Stage</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-card shadow-lg rounded-lg border border-border overflow-hidden z-50 hidden group-hover:block">
                <div className="py-1">
                  <button 
                    onClick={() => setStageFilter(null)} 
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted/20 ${stageFilter === null ? 'bg-muted/20' : ''}`}
                  >
                    All Stages
                  </button>
                  {campaignData.stages.map(stage => (
                    <button 
                      key={stage.id} 
                      onClick={() => setStageFilter(stage.name)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted/20 ${stageFilter === stage.name ? 'bg-muted/20' : ''}`}
                    >
                      {stage.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Team filter */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Team</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-card shadow-lg rounded-lg border border-border overflow-hidden z-50 hidden group-hover:block">
                <div className="py-1">
                  <button 
                    onClick={() => setTeamFilter(null)} 
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted/20 ${teamFilter === null ? 'bg-muted/20' : ''}`}
                  >
                    All Team Members
                  </button>
                  {campaignData.teamMembers.map((member, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setTeamFilter(member)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted/20 ${teamFilter === member ? 'bg-muted/20' : ''}`}
                    >
                      {member}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm shadow-sm hover:bg-primary/90 transition-colors">
              <UserPlus className="h-4 w-4" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>
        
        {/* Table View */}
        {view === 'table' && (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/20 border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        Lead Name
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact Channels</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Stage</th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Contacted</th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned To</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id}
                      className="hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => navigate(`/campaigns/${id}/leads/${lead.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">{lead.name}</div>
                        <div className="text-xs text-muted-foreground">{lead.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{lead.company}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {lead.email && (
                            <a 
                              href={`mailto:${lead.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-muted-foreground hover:text-primary transition-colors"
                              title="Send Email"
                            >
                              <Mail className="h-4 w-4" />
                            </a>
                          )}
                          {lead.linkedin && (
                            <a 
                              href={lead.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-muted-foreground hover:text-primary transition-colors"
                              title="View LinkedIn Profile"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                          {lead.whatsapp && (
                            <a 
                              href={`https://wa.me/${lead.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-muted-foreground hover:text-primary transition-colors"
                              title="Send WhatsApp Message"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </a>
                          )}
                          {lead.twitter && (
                            <a 
                              href={`https://twitter.com/${lead.twitter.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-muted-foreground hover:text-primary transition-colors"
                              title="View Twitter Profile"
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StageBadge stage={lead.stage} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        {lead.lastContacted || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        {lead.assignedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button 
                          className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/20 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Open options menu
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Kanban View */}
        {view === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
            {campaignData.stages.map((stage) => (
              <div key={stage.id} className="glass-card rounded-xl p-4">
                <h3 className="font-medium text-sm mb-3 flex justify-between items-center">
                  <span>{stage.name}</span>
                  <span className="bg-muted/20 px-2 py-1 rounded text-xs">
                    {leadsByStage[stage.name]?.length || 0}
                  </span>
                </h3>
                
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {leadsByStage[stage.name]?.map((lead) => (
                    <div 
                      key={lead.id}
                      className="bg-card border border-border p-3 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/campaigns/${id}/leads/${lead.id}`)}
                    >
                      <div className="font-medium text-sm">{lead.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">{lead.company} • {lead.title}</div>
                      
                      <div className="flex space-x-2">
                        {lead.email && (
                          <a 
                            href={`mailto:${lead.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Mail className="h-3 w-3" />
                          </a>
                        )}
                        {lead.linkedin && (
                          <a 
                            href={lead.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Linkedin className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>{lead.lastContacted || 'Not contacted'}</span>
                        <span>{lead.assignedTo}</span>
                      </div>
                    </div>
                  ))}
                  
                  {(!leadsByStage[stage.name] || leadsByStage[stage.name].length === 0) && (
                    <div className="text-center py-8 text-muted-foreground text-sm border border-dashed border-border rounded-lg">
                      No leads in this stage
                    </div>
                  )}
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
