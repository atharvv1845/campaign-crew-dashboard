
import React from 'react';
import { Phone, Mail, MessageSquare, Linkedin, Twitter, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Lead } from '@/components/campaigns/campaignDetail/leads/types';

interface LeadContactMethodsProps {
  lead: Lead;
  onMethodsChange?: (methods: string[]) => void;
  readOnly?: boolean;
}

const icons = {
  phone: Phone,
  email: Mail,
  sms: MessageSquare,
  linkedin: Linkedin,
  twitter: Twitter,
  whatsapp: MessageCircle,
  instagram: Instagram,
  facebook: Facebook,
};

export const LeadContactMethods: React.FC<LeadContactMethodsProps> = ({
  lead,
  onMethodsChange,
  readOnly = false,
}) => {
  const getActiveMethods = () => {
    const methods: string[] = [];
    if (lead.phone) methods.push('phone');
    if (lead.email) methods.push('email');
    if (lead.socialProfiles?.linkedin) methods.push('linkedin');
    if (lead.socialProfiles?.twitter) methods.push('twitter');
    if (lead.socialProfiles?.instagram) methods.push('instagram');
    if (lead.socialProfiles?.facebook) methods.push('facebook');
    if (lead.socialProfiles?.whatsapp) methods.push('whatsapp');
    return methods;
  };

  const activeMethods = getActiveMethods();

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(icons).map(([method, Icon]) => {
        const isActive = activeMethods.includes(method);
        const socialUrl = lead.socialProfiles?.[method as keyof typeof lead.socialProfiles];
        
        const button = (
          <button
            key={method}
            onClick={() => onMethodsChange?.(
              activeMethods.includes(method) 
                ? activeMethods.filter(m => m !== method)
                : [...activeMethods, method]
            )}
            disabled={readOnly}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted/20 text-muted-foreground hover:bg-muted/30",
              readOnly && "cursor-default"
            )}
          >
            <Icon className="h-4 w-4" />
            {socialUrl ? socialUrl : <span className="capitalize">{method}</span>}
          </button>
        );

        return socialUrl ? (
          <a 
            key={method} 
            href={`https://${method}.com/${socialUrl}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {button}
          </a>
        ) : button;
      })}
    </div>
  );
};

export default LeadContactMethods;
