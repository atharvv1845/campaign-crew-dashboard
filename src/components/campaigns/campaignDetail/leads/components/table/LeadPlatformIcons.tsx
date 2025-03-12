
import React from 'react';
import { Mail, Linkedin, Twitter, Instagram, Facebook, MessageCircle, MessageSquare } from 'lucide-react';
import { Lead } from '../../types';

interface LeadPlatformIconsProps {
  lead: Lead;
}

const LeadPlatformIcons: React.FC<LeadPlatformIconsProps> = ({ lead }) => {
  const platforms = [];
  
  if (lead.email) platforms.push('Email');
  if (lead.linkedin) platforms.push('LinkedIn');
  if (lead.whatsapp) platforms.push('WhatsApp');
  if (lead.twitter) platforms.push('Twitter');
  if (lead.facebook) platforms.push('Facebook');
  if (lead.instagram) platforms.push('Instagram');
  
  if (platforms.length === 0) {
    return <span className="text-muted-foreground text-xs">No platforms</span>;
  }
  
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

export default LeadPlatformIcons;
