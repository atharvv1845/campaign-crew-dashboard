
import React from 'react';
import { Linkedin, Twitter, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LeadContactMethodsProps {
  methods: string[];
  readOnly?: boolean;
  onToggle?: (method: string, enabled: boolean) => void;
}

const LeadContactMethods: React.FC<LeadContactMethodsProps> = ({
  methods,
  readOnly = false,
  onToggle
}) => {
  // Skip rendering if no methods
  if (!methods.length) return null;

  // Helper to render icons
  const renderIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="h-3 w-3" />;
      case 'twitter':
        return <Twitter className="h-3 w-3" />;
      case 'facebook':
        return <Facebook className="h-3 w-3" />;
      case 'instagram':
        return <Instagram className="h-3 w-3" />;
      case 'whatsapp':
        return <MessageCircle className="h-3 w-3" />;
      default:
        // For custom platforms or other methods
        return null;
    }
  };

  // Helper to get display name
  const getDisplayName = (method: string) => {
    switch (method.toLowerCase()) {
      case 'linkedin':
        return 'LinkedIn';
      case 'twitter':
        return 'Twitter';
      case 'facebook':
        return 'Facebook';
      case 'instagram':
        return 'Instagram';
      case 'whatsapp':
        return 'WhatsApp';
      case 'email':
        return 'Email';
      case 'phone':
        return 'Phone';
      default:
        // Capitalize first letter for custom platforms
        return method.charAt(0).toUpperCase() + method.slice(1);
    }
  };

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      <TooltipProvider>
        {methods.map(method => (
          <Tooltip key={method}>
            <TooltipTrigger asChild>
              <Badge 
                variant={readOnly ? "outline" : "default"} 
                className={`
                  text-xs py-0 h-5 
                  ${readOnly ? 'cursor-default' : 'cursor-pointer hover:bg-primary/90'}
                `}
                onClick={onToggle ? () => onToggle(method, !methods.includes(method)) : undefined}
              >
                {renderIcon(method)}
                <span className="ml-1">{getDisplayName(method)}</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Contact via {getDisplayName(method)}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default LeadContactMethods;
