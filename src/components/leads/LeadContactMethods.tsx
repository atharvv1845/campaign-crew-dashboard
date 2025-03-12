
import React from 'react';
import { Phone, Mail, MessageSquare, Linkedin, Twitter, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LeadContactMethodsProps {
  methods: string[];
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
  methods,
  onMethodsChange,
  readOnly = false,
}) => {
  const handleMethodToggle = (method: string) => {
    if (readOnly || !onMethodsChange) return;
    
    const newMethods = methods.includes(method)
      ? methods.filter(m => m !== method)
      : [...methods, method];
    
    onMethodsChange(newMethods);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(icons).map(([method, Icon]) => {
        const isActive = methods.includes(method);
        
        return (
          <button
            key={method}
            onClick={() => handleMethodToggle(method)}
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
            <span className="capitalize">{method}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LeadContactMethods;
