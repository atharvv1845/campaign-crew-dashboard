import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, ChevronDown, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import CreateCampaign from './CreateCampaign';

// Mock campaign data
const campaignData = [
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

// Campaign status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case 'Completed':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case 'Draft':
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case 'Scheduled':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      getStatusStyles(status)
    )}>
      {status}
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

const CampaignList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  
  // Filter campaigns based on search term and status
  const filteredCampaigns = campaignData.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? campaign.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });
  
  // Handler for clicking on a campaign row
  const handleCampaignClick = (campaignId: number) => {
    navigate(`/campaigns/${campaignId}`);
  };

  // Statuses for filter dropdown
  const statuses = ["Active", "Completed", "Draft", "Scheduled"];
  
  return (
    <div className="space-y-6">
      {/* Header and actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input 
            type="text" 
            placeholder="Search campaigns..." 
            className="glass-input pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted/20 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter Status</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-card shadow-lg rounded-lg border border-border overflow-hidden z-50 hidden group-hover:block">
              <div className="py-1">
                <button 
                  onClick={() => setFilterStatus(null)} 
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted/20 ${filterStatus === null ? 'bg-muted/20' : ''}`}
                >
                  All Statuses
                </button>
                {statuses.map(status => (
                  <button 
                    key={status} 
                    onClick={() => setFilterStatus(status)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted/20 ${filterStatus === status ? 'bg-muted/20' : ''}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm shadow-sm hover:bg-primary/90 transition-colors"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="h-4 w-4" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>
      
      {/* Campaigns table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/20 border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Campaign Name
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Channels</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Leads</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Responses</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Team</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {filteredCampaigns.map((campaign) => (
                <tr 
                  key={campaign.id}
                  className="hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => handleCampaignClick(campaign.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={campaign.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {campaign.channels.map((channel, idx) => (
                        <ChannelBadge key={idx} channel={channel} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{campaign.leads.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{campaign.responses.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {campaign.teamMembers.length > 0 
                      ? campaign.teamMembers.length > 1 
                        ? `${campaign.teamMembers[0]} +${campaign.teamMembers.length - 1}`
                        : campaign.teamMembers[0]
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{campaign.createdAt}</td>
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
      
      {/* Create Campaign Modal */}
      {showCreateModal && <CreateCampaign />}
    </div>
  );
};

export default CampaignList;
