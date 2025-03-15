
import React from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import { LeadData } from '../../types/campaignTypes';

interface LeadFormProps {
  currentLead: Partial<LeadData>;
  handleLeadInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  addLead: (andAnother: boolean) => void;
  contactPlatforms?: string[];
}

const LeadForm: React.FC<LeadFormProps> = ({ 
  currentLead, 
  handleLeadInputChange,
  addLead,
  contactPlatforms = []
}) => {
  // Determine which platform fields to show based on selected contact platforms
  const showEmail = !contactPlatforms.length || contactPlatforms.includes('email');
  const showPhone = !contactPlatforms.length || contactPlatforms.includes('phone');
  const showLinkedIn = !contactPlatforms.length || contactPlatforms.includes('linkedin');
  const showTwitter = !contactPlatforms.length || contactPlatforms.includes('twitter');
  const showInstagram = !contactPlatforms.length || contactPlatforms.includes('instagram');
  const showFacebook = !contactPlatforms.length || contactPlatforms.includes('facebook');
  const showWhatsApp = !contactPlatforms.length || contactPlatforms.includes('whatsapp');

  return (
    <div className="border border-border rounded-lg p-4">
      <h4 className="text-sm font-medium mb-4">Add Lead Manually</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Basic information */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="firstName"
              value={currentLead.firstName}
              onChange={handleLeadInputChange}
              placeholder="First Name"
              className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="text"
              name="lastName"
              value={currentLead.lastName}
              onChange={handleLeadInputChange}
              placeholder="Last Name"
              className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={currentLead.company || ''}
            onChange={handleLeadInputChange}
            placeholder="Company"
            className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        
        {/* Contact methods - conditionally render based on selected platforms */}
        <div className="col-span-2">
          <h5 className="text-sm font-medium mb-3">Contact Platforms</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showEmail && (
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <span className="mr-1">Email</span>
                  <span className="text-xs text-muted-foreground">(Primary contact)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={currentLead.email || ''}
                  onChange={handleLeadInputChange}
                  placeholder="Email address"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}
            
            {showPhone && (
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <span className="mr-1">Phone</span>
                  <span className="text-xs text-muted-foreground">(with country code)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={currentLead.phone || ''}
                  onChange={handleLeadInputChange}
                  pattern="[0-9+-\\s()]+"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Social profiles - conditionally render based on selected platforms */}
        <div className="col-span-2">
          <h5 className="text-sm font-medium mb-3">Social Profiles</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showLinkedIn && (
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <span className="mr-1">LinkedIn</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </label>
                <input
                  type="text"
                  name="social-linkedin"
                  value={currentLead.socialProfiles?.linkedin || ''}
                  onChange={handleLeadInputChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}
            
            {showTwitter && (
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <span className="mr-1">Twitter/X</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </label>
                <input
                  type="text"
                  name="social-twitter"
                  value={currentLead.socialProfiles?.twitter || ''}
                  onChange={handleLeadInputChange}
                  placeholder="https://twitter.com/username"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}
            
            {showFacebook && (
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <span className="mr-1">Facebook</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </label>
                <input
                  type="text"
                  name="social-facebook"
                  value={currentLead.socialProfiles?.facebook || ''}
                  onChange={handleLeadInputChange}
                  placeholder="https://facebook.com/username"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}
            
            {showInstagram && (
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <span className="mr-1">Instagram</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </label>
                <input
                  type="text"
                  name="social-instagram"
                  value={currentLead.socialProfiles?.instagram || ''}
                  onChange={handleLeadInputChange}
                  placeholder="https://instagram.com/username"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}
            
            {showWhatsApp && (
              <div>
                <label className="flex items-center text-sm font-medium mb-1">
                  <span className="mr-1">WhatsApp</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </label>
                <input
                  type="text"
                  name="social-whatsapp"
                  value={currentLead.socialProfiles?.whatsapp || ''}
                  onChange={handleLeadInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}
          </div>
          
          <div className="mt-3 text-xs text-muted-foreground">
            <p>Enter full URLs for social profiles (or usernames for some platforms)</p>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => addLead(true)}
          className="px-4 py-2 text-sm border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add & Create Another
        </button>
        <button
          onClick={() => addLead(false)}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Add Lead
        </button>
      </div>
    </div>
  );
};

export default LeadForm;
