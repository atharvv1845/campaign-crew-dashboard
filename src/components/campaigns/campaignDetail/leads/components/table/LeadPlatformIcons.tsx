
import React from 'react';
import { Mail, Linkedin, Twitter, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lead } from '../../types';

interface LeadPlatformIconsProps {
  lead: Lead;
}

const LeadPlatformIcons: React.FC<LeadPlatformIconsProps> = ({ lead }) => {
  // Helper function to properly format the URL
  const formatUrl = (url: string | undefined | null) => {
    if (!url) return '';
    
    // Check if it's a valid URL
    try {
      new URL(url);
      return url;
    } catch (e) {
      // If it's not a valid URL, try to make it one
      if (url.includes('@') && !url.includes('mailto:')) {
        return `mailto:${url}`;
      }
      
      // For platform-specific checks
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // Check for specific domains or handles
        if (url.includes('linkedin.com') || url.includes('/in/')) {
          return `https://linkedin.com/in/${url.replace(/.*\/in\//, '')}`;
        } else if (url.includes('twitter.com') || url.includes('@')) {
          return `https://twitter.com/${url.replace(/.*@/, '')}`;
        } else if (url.includes('facebook.com')) {
          return `https://facebook.com/${url.replace(/.*facebook.com\//, '')}`;
        } else if (url.includes('instagram.com')) {
          return `https://instagram.com/${url.replace(/.*instagram.com\//, '')}`;
        } else {
          return `https://${url}`;
        }
      }
      
      return url;
    }
  };

  // Log the lead's social profiles for debugging
  console.log('Lead platform data:', {
    email: lead.email,
    linkedin: lead.linkedin,
    twitter: lead.twitter,
    facebook: lead.facebook,
    instagram: lead.instagram,
    whatsapp: lead.whatsapp
  });

  const platforms = [
    {
      name: 'Email',
      icon: Mail,
      url: lead.email ? formatUrl(lead.email) : undefined,
      color: 'text-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: formatUrl(lead.linkedin),
      color: 'text-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: formatUrl(lead.twitter),
      color: 'text-blue-400'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: formatUrl(lead.facebook),
      color: 'text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: formatUrl(lead.instagram),
      color: 'text-pink-600'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: formatUrl(lead.whatsapp),
      color: 'text-green-600'
    }
  ];

  const availablePlatforms = platforms.filter(platform => platform.url);

  if (availablePlatforms.length === 0) {
    return <span className="text-muted-foreground text-sm">No platforms</span>;
  }

  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        {availablePlatforms.map((platform) => (
          <Tooltip key={platform.name}>
            <TooltipTrigger asChild>
              <a 
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block hover:opacity-80 ${platform.color}`}
              >
                <platform.icon className="h-4 w-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{platform.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default LeadPlatformIcons;
