
import React from 'react';
import { Mail, Linkedin, Twitter, Instagram, Facebook, MessageCircle, MessageSquare } from 'lucide-react';
import { Lead } from '../../types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LeadPlatformIconsProps {
  lead: Lead;
}

const LeadPlatformIcons: React.FC<LeadPlatformIconsProps> = ({ lead }) => {
  const platforms = [
    { id: 'email', name: 'Email', value: lead.email, Icon: Mail },
    { id: 'linkedin', name: 'LinkedIn', value: lead.linkedin, Icon: Linkedin },
    { id: 'whatsapp', name: 'WhatsApp', value: lead.whatsapp, Icon: MessageCircle },
    { id: 'twitter', name: 'Twitter', value: lead.twitter, Icon: Twitter },
    { id: 'facebook', name: 'Facebook', value: lead.facebook, Icon: Facebook },
    { id: 'instagram', name: 'Instagram', value: lead.instagram, Icon: Instagram }
  ].filter(platform => platform.value);
  
  if (platforms.length === 0) {
    return <span className="text-muted-foreground text-xs">No platforms</span>;
  }
  
  const handlePlatformClick = (url: string, platform: string) => {
    if (platform === 'Email') {
      window.open(`mailto:${url}`, '_blank');
      return;
    }
    
    if (platform === 'WhatsApp') {
      // Convert phone number for WhatsApp
      const phoneNumber = url.replace(/\D/g, '');
      if (phoneNumber) {
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
        return;
      }
    }
    
    // For social media URLs
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      window.open(`https://${url}`, '_blank');
    } else {
      window.open(url, '_blank');
    }
  };
  
  return (
    <div className="flex flex-wrap gap-1">
      <TooltipProvider>
        {platforms.map(({ id, name, value, Icon }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <button 
                className="p-1.5 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlatformClick(value, name);
                }}
                aria-label={`Open ${name}: ${value}`}
              >
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}: {value}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default LeadPlatformIcons;
