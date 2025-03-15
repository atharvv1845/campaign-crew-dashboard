
import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Lead } from '../types';

interface LeadPlatformContactProps {
  lead: Lead;
  editable?: boolean;
  onUpdate?: (leadId: string | number, field: string, value: string) => void;
}

const LeadPlatformContact: React.FC<LeadPlatformContactProps> = ({ 
  lead, 
  editable = false, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValues, setEditValues] = useState({
    email: lead.email || '',
    phone: lead.phone || '',
    linkedin: lead.linkedin || '',
    twitter: lead.twitter || '',
    facebook: lead.facebook || '',
    instagram: lead.instagram || '',
    whatsapp: lead.whatsapp || ''
  });

  // Determine which contact methods are available
  const hasEmail = Boolean(lead.email);
  const hasPhone = Boolean(lead.phone);
  const hasLinkedin = Boolean(lead.linkedin);
  const hasTwitter = Boolean(lead.twitter);
  const hasFacebook = Boolean(lead.facebook);
  const hasInstagram = Boolean(lead.instagram);
  const hasWhatsapp = Boolean(lead.whatsapp);

  const availableMethodCount = [
    hasEmail, hasPhone, hasLinkedin, hasTwitter, 
    hasFacebook, hasInstagram, hasWhatsapp
  ].filter(Boolean).length;

  // Format URLs for external links
  const formatUrl = (url: string, platform: string) => {
    if (!url) return '';
    
    if (platform === 'email') {
      return url.includes('@') ? `mailto:${url}` : url;
    }
    
    if (platform === 'phone') {
      return `tel:${url.replace(/[^\d+]/g, '')}`;
    }
    
    // Check if it's already a valid URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Add https:// prefix for social media links
    return `https://${url}`;
  };

  const handleInputChange = (field: string, value: string) => {
    setEditValues({
      ...editValues,
      [field]: value
    });
  };

  const handleSave = () => {
    if (!onUpdate) return;

    // Update each field that has changed
    Object.entries(editValues).forEach(([field, value]) => {
      const currentValue = lead[field as keyof Lead] as string;
      if (value !== currentValue) {
        onUpdate(lead.id, field, value);
      }
    });

    setIsEditing(false);
  };

  const renderPlatformIcons = () => {
    return (
      <div className="flex space-x-2">
        {hasEmail && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={formatUrl(lead.email!, 'email')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{lead.email}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {hasPhone && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={formatUrl(lead.phone!, 'phone')} 
                  className="text-green-500 hover:text-green-700"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{lead.phone}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {hasLinkedin && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={formatUrl(lead.linkedin!, 'linkedin')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {hasTwitter && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href={formatUrl(lead.twitter!, 'twitter')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Twitter Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {availableMethodCount > 3 ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                <span className="text-xs font-medium">+{availableMethodCount - 3}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="flex flex-col space-y-2">
                {hasFacebook && (
                  <a 
                    href={formatUrl(lead.facebook!, 'facebook')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <Facebook className="h-4 w-4" />
                    <span className="text-sm">Facebook</span>
                  </a>
                )}
                
                {hasInstagram && (
                  <a 
                    href={formatUrl(lead.instagram!, 'instagram')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-pink-600 hover:text-pink-800"
                  >
                    <Instagram className="h-4 w-4" />
                    <span className="text-sm">Instagram</span>
                  </a>
                )}
                
                {hasWhatsapp && (
                  <a 
                    href={formatUrl(lead.whatsapp!, 'whatsapp')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-green-600 hover:text-green-800"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                )}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            {hasFacebook && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href={formatUrl(lead.facebook!, 'facebook')} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Facebook Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {hasInstagram && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href={formatUrl(lead.instagram!, 'instagram')} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-800"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Instagram Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {hasWhatsapp && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href={formatUrl(lead.whatsapp!, 'whatsapp')} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>WhatsApp Contact</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </>
        )}

        {editable && !isEditing && (
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setIsEditing(true)}>
            <ChevronDown className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  };

  const renderEditForm = () => {
    return (
      <div className="space-y-2 p-1 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-muted-foreground mb-1">Email</label>
            <input 
              type="email" 
              value={editValues.email} 
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-2 py-1 border border-border rounded text-xs"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-muted-foreground mb-1">Phone</label>
            <input 
              type="text" 
              value={editValues.phone} 
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-2 py-1 border border-border rounded text-xs"
              placeholder="Phone number"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-muted-foreground mb-1">LinkedIn</label>
          <input 
            type="text" 
            value={editValues.linkedin} 
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            className="w-full px-2 py-1 border border-border rounded text-xs"
            placeholder="LinkedIn URL or username"
          />
        </div>
        
        <div>
          <label className="block text-muted-foreground mb-1">Twitter</label>
          <input 
            type="text" 
            value={editValues.twitter} 
            onChange={(e) => handleInputChange('twitter', e.target.value)}
            className="w-full px-2 py-1 border border-border rounded text-xs"
            placeholder="Twitter URL or username"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-muted-foreground mb-1">Facebook</label>
            <input 
              type="text" 
              value={editValues.facebook} 
              onChange={(e) => handleInputChange('facebook', e.target.value)}
              className="w-full px-2 py-1 border border-border rounded text-xs"
              placeholder="Facebook URL"
            />
          </div>
          <div>
            <label className="block text-muted-foreground mb-1">Instagram</label>
            <input 
              type="text" 
              value={editValues.instagram} 
              onChange={(e) => handleInputChange('instagram', e.target.value)}
              className="w-full px-2 py-1 border border-border rounded text-xs"
              placeholder="Instagram username"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-muted-foreground mb-1">WhatsApp</label>
          <input 
            type="text" 
            value={editValues.whatsapp} 
            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
            className="w-full px-2 py-1 border border-border rounded text-xs"
            placeholder="WhatsApp number"
          />
        </div>
        
        <div className="flex justify-end space-x-2 pt-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 px-2 text-xs" 
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <Button 
            size="sm" 
            className="h-7 px-2 text-xs" 
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    );
  };

  // If there are no contact methods available
  if (availableMethodCount === 0 && !isEditing) {
    return (
      <div className="flex items-center">
        <span className="text-muted-foreground text-sm">No contacts</span>
        {editable && (
          <Button variant="ghost" size="icon" className="h-5 w-5 ml-2" onClick={() => setIsEditing(true)}>
            <ChevronDown className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {isEditing ? renderEditForm() : renderPlatformIcons()}
    </div>
  );
};

export default LeadPlatformContact;
