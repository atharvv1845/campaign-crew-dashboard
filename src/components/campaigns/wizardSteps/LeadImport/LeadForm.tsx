
import React from 'react';
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
      <h4 className="text-sm font-medium mb-4">Add New Lead</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium">
            First Name <span className="text-destructive">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={currentLead.firstName}
            onChange={handleLeadInputChange}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>
        
        {/* Social profiles */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Social Profiles <span className="text-muted-foreground">(Optional)</span>
          </label>
          <div className="space-y-2">
            <input
              id="social-linkedin"
              name="social-linkedin"
              type="text"
              placeholder="LinkedIn URL"
              value={currentLead.socialProfiles?.linkedin || ''}
              onChange={handleLeadInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              id="social-twitter"
              name="social-twitter"
              type="text"
              placeholder="Twitter/X Handle"
              value={currentLead.socialProfiles?.twitter || ''}
              onChange={handleLeadInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="notes" className="block text-sm font-medium">
            Notes <span className="text-muted-foreground">(Optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            value={currentLead.notes}
            onChange={handleLeadInputChange}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]"
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={() => addLead(true)}
          className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
        >
          Save & Add Another
        </button>
        <button
          onClick={() => addLead(false)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Add Lead
        </button>
      </div>
    </div>
  );
};

export default LeadForm;
