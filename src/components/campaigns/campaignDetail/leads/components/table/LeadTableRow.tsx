
import React from 'react';
import { MoreHorizontal, Calendar, Mail, MessageCircle, Phone } from 'lucide-react';
import { Lead, Campaign } from '../../types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import LeadPlatformIcons from './LeadPlatformIcons';
import LeadStageSelector from './LeadStageSelector';
import LeadDatePicker from './LeadDatePicker';
import { StageBadge } from '@/components/campaigns/campaignDetail/badges/StageBadge';

interface LeadTableRowProps {
  lead: Lead;
  campaign?: Campaign;
  onSelectLead?: (leadId: number, selected: boolean) => void;
  isSelected?: boolean;
  onLeadClick?: (lead: Lead) => void;
  onUpdateLead?: (lead: Lead) => void;
  onOpen: (lead: Lead) => void;
  displayFields?: string[];
  populatedFields?: string[]; // Keep for backward compatibility
}

const LeadTableRow: React.FC<LeadTableRowProps> = ({
  lead,
  campaign,
  onSelectLead,
  isSelected = false,
  onLeadClick,
  onUpdateLead,
  onOpen,
  displayFields = [],
  populatedFields = []
}) => {
  // Use displayFields if provided, otherwise fall back to populatedFields
  const fields = displayFields.length > 0 ? displayFields : populatedFields;

  // Handle selection change
  const handleSelectionChange = (checked: boolean) => {
    if (onSelectLead) {
      onSelectLead(lead.id, checked);
    }
  };

  // Handle stage change
  const handleStageChange = (newStage: string) => {
    if (onUpdateLead) {
      onUpdateLead({
        ...lead,
        currentStage: newStage
      });
    }
  };

  // Handle date change
  const handleDateChange = (field: string, date: string) => {
    if (onUpdateLead) {
      onUpdateLead({
        ...lead,
        [field]: date
      });
    }
  };

  // Render cell based on field type
  const renderCell = (field: string) => {
    switch (field) {
      case 'name':
        return (
          <td className="px-6 py-4" onClick={() => onOpen(lead)}>
            <div className="cursor-pointer">
              <div className="font-medium">{lead.name || `${lead.firstName || ''} ${lead.lastName || ''}`}</div>
              {lead.title && <div className="text-sm text-muted-foreground">{lead.title}</div>}
            </div>
          </td>
        );
      
      case 'socialProfiles':
        return (
          <td className="px-6 py-4">
            <LeadPlatformIcons lead={lead} />
          </td>
        );
      
      case 'company':
        return (
          <td className="px-6 py-4">
            <div className="font-medium">{lead.company || '-'}</div>
          </td>
        );
      
      case 'currentStage':
      case 'status':
        return (
          <td className="px-6 py-4">
            {campaign?.stages ? (
              <LeadStageSelector
                currentStage={lead.currentStage || lead.status || ''}
                stages={campaign.stages}
                onChange={handleStageChange}
              />
            ) : (
              <StageBadge stage={lead.currentStage || lead.status || ''} />
            )}
          </td>
        );
      
      case 'assignedTo':
        return (
          <td className="px-6 py-4">
            <div className="text-sm">
              {lead.assignedTo || '-'}
            </div>
          </td>
        );
      
      case 'lastContacted':
        return (
          <td className="px-6 py-4">
            <LeadDatePicker
              date={lead.lastContacted}
              onChange={(date) => handleDateChange('lastContacted', date)}
              icon={<Calendar className="h-4 w-4" />}
              readOnly
            />
          </td>
        );
      
      case 'followUpDate':
        return (
          <td className="px-6 py-4">
            <LeadDatePicker
              date={lead.followUpDate}
              onChange={(date) => handleDateChange('followUpDate', date)}
              icon={<Calendar className="h-4 w-4" />}
            />
          </td>
        );
      
      case 'firstContacted':
        return (
          <td className="px-6 py-4">
            <LeadDatePicker
              date={lead.firstContacted}
              onChange={(date) => handleDateChange('firstContacted', date)}
              icon={<Calendar className="h-4 w-4" />}
              readOnly
            />
          </td>
        );
      
      case 'email':
        return (
          <td className="px-6 py-4">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{lead.email || '-'}</span>
            </div>
          </td>
        );
      
      case 'phone':
        return (
          <td className="px-6 py-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{lead.phone || '-'}</span>
            </div>
          </td>
        );
      
      case 'notes':
        return (
          <td className="px-6 py-4">
            <div className="text-sm max-w-[200px] truncate">
              {lead.notes || '-'}
            </div>
          </td>
        );
      
      // Social profiles
      case 'linkedin':
      case 'twitter':
      case 'facebook':
      case 'instagram':
      case 'whatsapp':
        return (
          <td className="px-6 py-4">
            <div className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{lead[field] || '-'}</span>
            </div>
          </td>
        );
      
      default:
        // Generic field display
        return (
          <td className="px-6 py-4">
            <div className="text-sm">
              {(lead as any)[field] || '-'}
            </div>
          </td>
        );
    }
  };

  return (
    <tr className="hover:bg-muted/10">
      {onSelectLead && (
        <td className="px-3 py-4">
          <Checkbox 
            checked={isSelected} 
            onCheckedChange={handleSelectionChange}
          />
        </td>
      )}
      
      {/* Render fields based on determined display fields */}
      {fields.map(field => renderCell(field))}
      
      {/* Actions */}
      <td className="px-3 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onOpen(lead)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open(`mailto:${lead.email}`)}>
              Send email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default LeadTableRow;
