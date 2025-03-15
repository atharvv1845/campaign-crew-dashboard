
import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Twitter, Facebook, Instagram, MessageCircle, ExternalLink, Check, X } from 'lucide-react';
import { Lead } from '../types';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface PlatformColumnProps {
  lead: Lead;
  onUpdateLead?: (lead: Lead) => void;
}

const PlatformColumn: React.FC<PlatformColumnProps> = ({ lead, onUpdateLead }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    email: lead.email || '',
    phone: lead.phone || '',
    linkedin: lead.linkedin || lead.socialProfiles?.linkedin || '',
    twitter: lead.twitter || lead.socialProfiles?.twitter || '',
    facebook: lead.facebook || lead.socialProfiles?.facebook || '',
    instagram: lead.instagram || lead.socialProfiles?.instagram || '',
    whatsapp: lead.whatsapp || lead.socialProfiles?.whatsapp || '',
  });

  // Helper to sanitize URLs for safe opening
  const getSafeUrl = (url: string, platform: string): string => {
    if (!url) return '';
    
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    switch (platform) {
      case 'linkedin':
        return url.includes('linkedin.com') ? url : `https://linkedin.com/in/${url}`;
      case 'twitter':
        return url.includes('twitter.com') || url.includes('x.com') 
          ? url 
          : `https://twitter.com/${url.replace('@', '')}`;
      case 'facebook':
        return url.includes('facebook.com') ? url : `https://facebook.com/${url}`;
      case 'instagram':
        return url.includes('instagram.com') ? url : `https://instagram.com/${url.replace('@', '')}`;
      default:
        return `https://${url}`;
    }
  };

  // Handle opening a platform link
  const handleOpenLink = (platform: string, value: string) => {
    if (!value) return;
    
    let url = '';
    
    switch (platform) {
      case 'email':
        url = `mailto:${value}`;
        break;
      case 'phone':
        url = `tel:${value}`;
        break;
      case 'whatsapp':
        url = value.startsWith('http') ? value : `https://wa.me/${value.replace(/\D/g, '')}`;
        break;
      default:
        url = getSafeUrl(value, platform);
    }
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle saving edited values
  const handleSaveChanges = () => {
    if (!onUpdateLead) return;
    
    // Create updated socialProfiles object
    const socialProfiles = {
      linkedin: editValues.linkedin,
      twitter: editValues.twitter,
      facebook: editValues.facebook,
      instagram: editValues.instagram,
      whatsapp: editValues.whatsapp,
    };
    
    // Create array of contact platforms based on the presence of values
    const contactPlatforms: string[] = [];
    if (editValues.email) contactPlatforms.push('email');
    if (editValues.phone) contactPlatforms.push('phone');
    if (editValues.linkedin) contactPlatforms.push('linkedin');
    if (editValues.twitter) contactPlatforms.push('twitter');
    if (editValues.facebook) contactPlatforms.push('facebook');
    if (editValues.instagram) contactPlatforms.push('instagram');
    if (editValues.whatsapp) contactPlatforms.push('whatsapp');
    
    // Create updated lead object
    const updatedLead: Lead = {
      ...lead,
      email: editValues.email,
      phone: editValues.phone,
      linkedin: editValues.linkedin,
      twitter: editValues.twitter,
      facebook: editValues.facebook,
      instagram: editValues.instagram,
      whatsapp: editValues.whatsapp,
      socialProfiles,
      contactPlatforms,
    };
    
    onUpdateLead(updatedLead);
    setIsEditing(false);
    
    toast({
      title: "Contact Details Updated",
      description: "Lead contact information has been updated successfully.",
    });
  };

  // Handle canceling edit mode
  const handleCancelEdit = () => {
    setEditValues({
      email: lead.email || '',
      phone: lead.phone || '',
      linkedin: lead.linkedin || lead.socialProfiles?.linkedin || '',
      twitter: lead.twitter || lead.socialProfiles?.twitter || '',
      facebook: lead.facebook || lead.socialProfiles?.facebook || '',
      instagram: lead.instagram || lead.socialProfiles?.instagram || '',
      whatsapp: lead.whatsapp || lead.socialProfiles?.whatsapp || '',
    });
    setIsEditing(false);
  };

  // Helper to get platform data
  const getPlatformData = () => {
    const platforms = [];
    
    if (lead.email) 
      platforms.push({ id: 'email', icon: Mail, value: lead.email });
    
    if (lead.phone) 
      platforms.push({ id: 'phone', icon: Phone, value: lead.phone });
    
    if (lead.linkedin || lead.socialProfiles?.linkedin) 
      platforms.push({ id: 'linkedin', icon: Linkedin, value: lead.linkedin || lead.socialProfiles?.linkedin });
    
    if (lead.twitter || lead.socialProfiles?.twitter) 
      platforms.push({ id: 'twitter', icon: Twitter, value: lead.twitter || lead.socialProfiles?.twitter });
    
    if (lead.facebook || lead.socialProfiles?.facebook) 
      platforms.push({ id: 'facebook', icon: Facebook, value: lead.facebook || lead.socialProfiles?.facebook });
    
    if (lead.instagram || lead.socialProfiles?.instagram) 
      platforms.push({ id: 'instagram', icon: Instagram, value: lead.instagram || lead.socialProfiles?.instagram });
    
    if (lead.whatsapp || lead.socialProfiles?.whatsapp) 
      platforms.push({ id: 'whatsapp', icon: MessageCircle, value: lead.whatsapp || lead.socialProfiles?.whatsapp });
    
    return platforms;
  };

  const platforms = getPlatformData();
  
  if (platforms.length === 0) {
    return <span className="text-muted-foreground text-sm">No contact methods</span>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center space-x-1 cursor-pointer">
          {platforms.slice(0, 3).map(platform => {
            const Icon = platform.icon;
            return <Icon key={platform.id} className="h-4 w-4 text-muted-foreground hover:text-primary" />;
          })}
          {platforms.length > 3 && <span className="text-xs text-muted-foreground">+{platforms.length - 3}</span>}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Contact Platforms</h4>
            {onUpdateLead && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
                className="h-8 px-2"
              >
                {!isEditing ? "Edit" : "Cancel"}
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-xs font-medium">Email</label>
                <Input 
                  size={1}
                  value={editValues.email}
                  onChange={(e) => setEditValues({...editValues, email: e.target.value})}
                  placeholder="Email address"
                  className="h-8 text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium">Phone</label>
                <Input 
                  size={1}
                  value={editValues.phone}
                  onChange={(e) => setEditValues({...editValues, phone: e.target.value})}
                  placeholder="Phone number"
                  className="h-8 text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium">LinkedIn</label>
                <Input 
                  size={1}
                  value={editValues.linkedin}
                  onChange={(e) => setEditValues({...editValues, linkedin: e.target.value})}
                  placeholder="LinkedIn profile"
                  className="h-8 text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium">Twitter/X</label>
                <Input 
                  size={1}
                  value={editValues.twitter}
                  onChange={(e) => setEditValues({...editValues, twitter: e.target.value})}
                  placeholder="Twitter handle"
                  className="h-8 text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium">Facebook</label>
                <Input 
                  size={1}
                  value={editValues.facebook}
                  onChange={(e) => setEditValues({...editValues, facebook: e.target.value})}
                  placeholder="Facebook profile"
                  className="h-8 text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium">Instagram</label>
                <Input 
                  size={1}
                  value={editValues.instagram}
                  onChange={(e) => setEditValues({...editValues, instagram: e.target.value})}
                  placeholder="Instagram handle"
                  className="h-8 text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium">WhatsApp</label>
                <Input 
                  size={1}
                  value={editValues.whatsapp}
                  onChange={(e) => setEditValues({...editValues, whatsapp: e.target.value})}
                  placeholder="WhatsApp number"
                  className="h-8 text-sm"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="h-8"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveChanges}
                  className="h-8"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {platforms.map(platform => {
                const Icon = platform.icon;
                const displayValue = 
                  platform.id === 'email' ? platform.value :
                  platform.id === 'phone' ? platform.value :
                  platform.value.length > 25 ? `${platform.value.substring(0, 22)}...` : platform.value;
                
                return (
                  <div key={platform.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{displayValue}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenLink(platform.id, platform.value)}
                      className="h-7 w-7 p-0"
                      title={`Open ${platform.id}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PlatformColumn;
