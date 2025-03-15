
import React, { useState, useMemo } from 'react';
import { Lead, Campaign } from './types';
import { PlusCircle, ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '../../../leads/StatusBadge';
import LeadPlatformIcons from './components/table/LeadPlatformIcons';
import PlatformColumn from './components/PlatformColumn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LeadTableProps {
  leads: Lead[];
  campaign?: Campaign;
  onStatusChange: (leadId: number | string, value: string) => void;
  onLeadClick?: (lead: Lead) => void;
  onSelectLead?: (leadId: number | string, selected: boolean) => void;
  selectedLeads?: (number | string)[];
  onUpdateLead?: (lead: Lead) => void;
}

const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  campaign,
  onStatusChange,
  onLeadClick,
  onSelectLead,
  selectedLeads = [],
  onUpdateLead
}) => {
  const [filterPlatform, setFilterPlatform] = useState<string | null>(null);
  
  // Filter leads by selected platform
  const filteredLeads = useMemo(() => {
    if (!filterPlatform) return leads;
    
    return leads.filter(lead => {
      if (lead.contactPlatforms?.includes(filterPlatform)) return true;
      
      // Check individual platform properties
      switch (filterPlatform) {
        case 'email':
          return !!lead.email;
        case 'phone':
          return !!lead.phone;
        case 'linkedin':
          return !!(lead.linkedin || lead.socialProfiles?.linkedin);
        case 'twitter':
          return !!(lead.twitter || lead.socialProfiles?.twitter);
        case 'facebook':
          return !!(lead.facebook || lead.socialProfiles?.facebook);
        case 'instagram':
          return !!(lead.instagram || lead.socialProfiles?.instagram);
        case 'whatsapp':
          return !!(lead.whatsapp || lead.socialProfiles?.whatsapp);
        default:
          return true;
      }
    });
  }, [leads, filterPlatform]);

  // Handle status change for a lead
  const handleStatusChange = (leadId: number | string, status: string) => {
    onStatusChange(leadId, `currentStage:::${status}`);
  };

  // Handle row click
  const handleRowClick = (lead: Lead) => {
    if (onLeadClick) {
      onLeadClick(lead);
    }
  };

  // Handle platform filter change
  const handlePlatformFilter = (platform: string | null) => {
    setFilterPlatform(platform);
  };

  return (
    <div>
      {/* Table toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          {filterPlatform ? (
            <div className="flex items-center gap-2">
              <span>Filtered by: {filterPlatform}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setFilterPlatform(null)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            `Showing ${filteredLeads.length} leads`
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Platform filter dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter by Platform
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handlePlatformFilter(null)}>
                  All Platforms
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handlePlatformFilter('email')}>
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlatformFilter('phone')}>
                  Phone
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlatformFilter('linkedin')}>
                  LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlatformFilter('twitter')}>
                  Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlatformFilter('facebook')}>
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlatformFilter('instagram')}>
                  Instagram
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlatformFilter('whatsapp')}>
                  WhatsApp
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Lead
          </Button>
        </div>
      </div>
      
      {/* Lead table */}
      <div className="border rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr className="bg-muted/50">
                {onSelectLead && (
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Platforms
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Stage/Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredLeads.map(lead => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-muted/20 cursor-pointer"
                  onClick={() => handleRowClick(lead)}
                >
                  {onSelectLead && (
                    <td className="px-4 py-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={(e) => onSelectLead(lead.id, e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                    </td>
                  )}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium">{lead.name}</div>
                    {lead.title && <div className="text-xs text-muted-foreground">{lead.title}</div>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <PlatformColumn lead={lead} onUpdateLead={onUpdateLead} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {lead.email || '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {lead.company || '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer">
                          <StatusBadge status={lead.currentStage || lead.status} />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {campaign?.stages?.map(stage => (
                          <DropdownMenuItem 
                            key={stage.id}
                            onClick={() => handleStatusChange(lead.id, stage.name)}
                          >
                            {stage.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {lead.assignedTo || lead.assignedTeamMember || '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;
