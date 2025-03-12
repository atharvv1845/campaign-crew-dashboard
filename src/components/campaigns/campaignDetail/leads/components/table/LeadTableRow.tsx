
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal, Calendar, Edit2, Mail, Phone, MessageSquare, Linkedin, Twitter, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StageBadge from '../../../badges/StageBadge';
import { Lead, Campaign } from '../../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LeadTableRowProps {
  lead: Lead;
  campaign?: Campaign;
  onSelectLead?: (leadId: number, selected: boolean) => void;
  isSelected?: boolean;
  onLeadClick?: (lead: Lead) => void;
  onUpdateLead?: (lead: Lead) => void;
  onOpen: (lead: Lead) => void;
}

const LeadTableRow: React.FC<LeadTableRowProps> = ({ 
  lead, 
  campaign,
  onSelectLead,
  isSelected,
  onLeadClick,
  onUpdateLead,
  onOpen
}) => {
  const [date, setDate] = useState<Date | undefined>(
    lead.lastContacted ? new Date(lead.lastContacted) : undefined
  );
  const [followUpDate, setFollowUpDate] = useState<Date | undefined>(
    lead.followUpDate ? new Date(lead.followUpDate) : undefined
  );

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (onUpdateLead && newDate) {
      onUpdateLead({
        ...lead,
        lastContacted: format(newDate, 'yyyy-MM-dd')
      });
    }
  };

  const handleFollowUpSelect = (newDate: Date | undefined) => {
    setFollowUpDate(newDate);
    if (onUpdateLead && newDate) {
      onUpdateLead({
        ...lead,
        followUpDate: format(newDate, 'yyyy-MM-dd')
      });
    }
  };

  const handleStageChange = (stage: string) => {
    if (onUpdateLead) {
      onUpdateLead({
        ...lead,
        currentStage: stage
      });
    }
  };

  // Get platform icons
  const renderPlatformIcons = () => {
    const platforms = [];
    
    if (lead.email) platforms.push('Email');
    if (lead.linkedin) platforms.push('LinkedIn');
    if (lead.whatsapp) platforms.push('WhatsApp');
    if (lead.twitter) platforms.push('Twitter');
    if (lead.facebook) platforms.push('Facebook');
    if (lead.instagram) platforms.push('Instagram');
    
    if (platforms.length === 0) return <span className="text-muted-foreground text-xs">No platforms</span>;
    
    return (
      <div className="flex flex-wrap gap-1">
        {platforms.map(platform => {
          let Icon;
          switch (platform) {
            case 'Email': Icon = Mail; break;
            case 'LinkedIn': Icon = Linkedin; break;
            case 'WhatsApp': Icon = MessageCircle; break;
            case 'Twitter': Icon = Twitter; break;
            case 'Facebook': Icon = Facebook; break;
            case 'Instagram': Icon = Instagram; break;
            default: Icon = MessageSquare;
          }
          
          return (
            <div 
              key={platform} 
              className="p-1.5 bg-muted/30 rounded-md" 
              title={platform}
            >
              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          );
        })}
      </div>
    );
  };

  // Available stages for the dropdown
  const stages = campaign?.stages?.map(stage => stage.name) || [
    'Not Contacted',
    'Contacted',
    'Replied',
    'Follow-Up Needed',
    'Positive',
    'Negative'
  ];

  return (
    <tr className="hover:bg-muted/10">
      {onSelectLead && (
        <td className="py-3 px-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => {
              if (onSelectLead) {
                onSelectLead(lead.id, !!checked);
              }
            }}
          />
        </td>
      )}
      <td className="py-3 px-6">{lead.name}</td>
      <td className="py-3 px-6">{renderPlatformIcons()}</td>
      <td className="py-3 px-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              className="p-0 h-auto font-normal text-left flex items-center gap-2"
            >
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{lead.lastContacted || 'Set date'}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </td>
      <td className="py-3 px-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              className="p-0 h-auto font-normal text-left flex items-center gap-2"
            >
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{lead.followUpDate || 'Set follow-up'}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={followUpDate}
              onSelect={handleFollowUpSelect}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </td>
      <td className="py-3 px-6">
        <Select defaultValue={lead.currentStage} onValueChange={handleStageChange}>
          <SelectTrigger className="w-[160px] h-8 border-none bg-transparent p-0">
            <SelectValue>
              <StageBadge stage={lead.currentStage} />
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {stages.map(stage => (
              <SelectItem key={stage} value={stage}>
                <div className="flex items-center gap-2">
                  <StageBadge stage={stage} />
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </td>
      <td className="py-3 px-6">{lead.assignedTo || 'N/A'}</td>
      <td className="py-3 px-6">
        <span className="line-clamp-1 max-w-[150px]">{lead.notes || 'No notes'}</span>
      </td>
      <td className="py-3 px-3">
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="sm" onClick={() => onOpen(lead)}>
            View
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="h-4 w-4 mr-2" />
                Call
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Notes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};

export default LeadTableRow;
