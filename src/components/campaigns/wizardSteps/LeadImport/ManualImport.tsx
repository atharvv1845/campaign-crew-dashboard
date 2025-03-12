
import React, { useState } from 'react';
import { CampaignFormData, LeadData } from '../../types/campaignTypes';
import { useToast } from "@/hooks/use-toast";
import { useLeadImport } from './hooks/useLeadImport';
import LeadList from './LeadList';
import LeadForm from './LeadForm';

interface ManualImportProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
}

const ManualImport: React.FC<ManualImportProps> = ({ formData, setFormData }) => {
  const [saveListMode, setSaveListMode] = useState(false);
  const [listName, setListName] = useState('');
  const { toast } = useToast();
  const { generateId, saveLeadList } = useLeadImport();
  
  const [currentLead, setCurrentLead] = useState<Partial<LeadData>>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    status: formData.stages[0]?.id || '',
    assignedTo: '',
    notes: '',
    socialProfiles: {
      twitter: '',
      linkedin: '',
      instagram: '',
      facebook: '',
      whatsapp: ''
    },
  });
  
  // Handle form input changes for manual lead entry
  const handleLeadInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social-')) {
      const platform = name.replace('social-', '');
      setCurrentLead(prev => ({
        ...prev,
        socialProfiles: {
          ...prev.socialProfiles,
          [platform]: value
        }
      }));
    } else {
      setCurrentLead(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Add a new lead manually - no required fields
  const addLead = (andAnother: boolean = false) => {
    // Remove validation that requires email
    
    const newLead: LeadData = {
      id: generateId(),
      firstName: currentLead.firstName || '',
      lastName: currentLead.lastName || '',
      company: currentLead.company,
      email: currentLead.email || '',
      phone: currentLead.phone,
      status: currentLead.status || formData.stages[0]?.id || '',
      assignedTo: currentLead.assignedTo,
      notes: currentLead.notes,
      socialProfiles: currentLead.socialProfiles,
      source: 'manual'
    };
    
    setFormData(prev => ({
      ...prev,
      leads: [...prev.leads, newLead]
    }));
    
    if (andAnother) {
      // Clear form for another entry
      setCurrentLead({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        status: formData.stages[0]?.id || '',
        assignedTo: '',
        notes: '',
        socialProfiles: {
          twitter: '',
          linkedin: '',
          instagram: '',
          facebook: '',
          whatsapp: ''
        },
      });
    } else {
      // Show the list of added leads
      setCurrentLead({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        status: formData.stages[0]?.id || '',
        assignedTo: '',
        notes: '',
        socialProfiles: {
          twitter: '',
          linkedin: '',
          instagram: '',
          facebook: '',
          whatsapp: ''
        },
      });
    }
  };
  
  // Remove a lead from the list
  const removeLead = (id: string) => {
    setFormData(prev => ({
      ...prev,
      leads: prev.leads.filter(lead => lead.id !== id)
    }));
  };
  
  // Save the current lead list
  const handleSaveLeadList = () => {
    if (saveLeadList(listName, formData.leads)) {
      setSaveListMode(false);
      setListName('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Current leads list with save option */}
      {formData.leads.length > 0 && (
        <LeadList 
          leads={formData.leads}
          removeLead={removeLead}
          saveListMode={saveListMode}
          setSaveListMode={setSaveListMode}
          listName={listName}
          setListName={setListName}
          onSaveList={handleSaveLeadList}
        />
      )}
      
      {/* Manual entry form */}
      <LeadForm 
        currentLead={currentLead}
        handleLeadInputChange={handleLeadInputChange}
        addLead={addLead}
      />
    </div>
  );
};

export default ManualImport;
