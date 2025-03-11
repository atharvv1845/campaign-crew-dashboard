
import React from 'react';
import { Plus } from 'lucide-react';
import { LeadData } from '../../types/campaignTypes';

interface LeadFormProps {
  currentLead: Partial<LeadData>;
  handleLeadInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  addLead: (andAnother: boolean) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ 
  currentLead, 
  handleLeadInputChange,
  addLead
}) => {
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
        
        {/* Contact methods */}
        <div>
          <label className="block text-sm font-medium mb-1">Email <span className="text-primary">*</span></label>
          <input
            type="email"
            name="email"
            value={currentLead.email || ''}
            onChange={handleLeadInputChange}
            placeholder="Email"
            className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={currentLead.phone || ''}
            onChange={handleLeadInputChange}
            placeholder="Phone"
            className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        
        {/* Social profiles */}
        <div>
          <label className="block text-sm font-medium mb-1">Twitter</label>
          <input
            type="text"
            name="social-twitter"
            value={currentLead.socialProfiles?.twitter || ''}
            onChange={handleLeadInputChange}
            placeholder="Twitter handle"
            className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn</label>
          <input
            type="text"
            name="social-linkedin"
            value={currentLead.socialProfiles?.linkedin || ''}
            onChange={handleLeadInputChange}
            placeholder="LinkedIn profile"
            className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
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
