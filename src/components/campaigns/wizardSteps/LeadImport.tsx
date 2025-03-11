
import React, { useState, useRef } from 'react';
import { UserPlus, Upload, FileCheck, Plus, Trash2, Check, X, Download } from 'lucide-react';
import { CampaignFormData, LeadData } from '../CreateCampaign';
import { cn } from '@/lib/utils';

interface LeadImportProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onNext: () => void;
  onBack: () => void;
}

type ImportMethod = 'manual' | 'csv';

const LeadImport: React.FC<LeadImportProps> = ({ formData, setFormData, onNext, onBack }) => {
  const [importMethod, setImportMethod] = useState<ImportMethod>('manual');
  const [currentLead, setCurrentLead] = useState<Partial<LeadData>>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    status: formData.stages[0]?.id || '',
    assignedTo: '',
    notes: '',
    socialProfiles: {},
  });
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvMapping, setCsvMapping] = useState<Record<string, string>>({});
  const [csvPreview, setCsvPreview] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Generate a unique ID for new leads
  const generateId = () => `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
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
  
  // Add a new lead manually
  const addLead = (andAnother: boolean = false) => {
    if (!currentLead.firstName || !currentLead.lastName || !currentLead.email) {
      // Show validation error
      return;
    }
    
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
        socialProfiles: {},
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
        socialProfiles: {},
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
  
  // Trigger file input click
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  // Handle CSV file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setCsvFile(file);
    
    // Parse CSV file
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      
      setCsvHeaders(headers);
      
      // Initialize mapping with suggestions
      const initialMapping: Record<string, string> = {};
      headers.forEach(header => {
        const lowerHeader = header.toLowerCase();
        if (lowerHeader.includes('first') && lowerHeader.includes('name')) {
          initialMapping[header] = 'firstName';
        } else if (lowerHeader.includes('last') && lowerHeader.includes('name')) {
          initialMapping[header] = 'lastName';
        } else if (lowerHeader === 'name') {
          initialMapping[header] = 'fullName';
        } else if (lowerHeader.includes('email')) {
          initialMapping[header] = 'email';
        } else if (lowerHeader.includes('company')) {
          initialMapping[header] = 'company';
        } else if (lowerHeader.includes('phone')) {
          initialMapping[header] = 'phone';
        } else if (lowerHeader.includes('linkedin')) {
          initialMapping[header] = 'linkedin';
        } else if (lowerHeader.includes('twitter')) {
          initialMapping[header] = 'twitter';
        } else if (lowerHeader.includes('status')) {
          initialMapping[header] = 'status';
        } else if (lowerHeader.includes('assign') || lowerHeader.includes('rep')) {
          initialMapping[header] = 'assignedTo';
        } else if (lowerHeader.includes('note')) {
          initialMapping[header] = 'notes';
        }
      });
      
      setCsvMapping(initialMapping);
      
      // Create preview of first 5 rows
      const preview = [];
      for (let i = 1; i < Math.min(6, lines.length); i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',').map(val => val.trim());
          const row: Record<string, string> = {};
          
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          
          preview.push(row);
        }
      }
      
      setCsvPreview(preview);
    };
    
    reader.readAsText(file);
  };
  
  // Handle mapping changes
  const handleMappingChange = (header: string, value: string) => {
    setCsvMapping(prev => ({
      ...prev,
      [header]: value
    }));
  };
  
  // Import leads from CSV based on mapping
  const importCsvLeads = () => {
    if (!csvFile) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      
      const newLeads: LeadData[] = [];
      
      // Start from line 1 (skip headers)
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',').map(val => val.trim());
        const leadData: Partial<LeadData> = {
          id: generateId(),
          firstName: '',
          lastName: '',
          email: '',
          source: 'csv',
          status: formData.stages[0]?.id || '',
          socialProfiles: {}
        };
        
        // Process full name if mapping exists
        let fullName = '';
        
        headers.forEach((header, index) => {
          const mappingKey = csvMapping[header];
          const value = values[index] || '';
          
          if (mappingKey === 'fullName' && value) {
            fullName = value;
          } else if (mappingKey === 'firstName') {
            leadData.firstName = value;
          } else if (mappingKey === 'lastName') {
            leadData.lastName = value;
          } else if (mappingKey === 'email') {
            leadData.email = value;
          } else if (mappingKey === 'company') {
            leadData.company = value;
          } else if (mappingKey === 'phone') {
            leadData.phone = value;
          } else if (mappingKey === 'status') {
            // Find matching stage
            const stage = formData.stages.find(s => 
              s.name.toLowerCase() === value.toLowerCase()
            );
            if (stage) {
              leadData.status = stage.id;
            }
          } else if (mappingKey === 'assignedTo') {
            leadData.assignedTo = value;
          } else if (mappingKey === 'notes') {
            leadData.notes = value;
          } else if (['linkedin', 'twitter', 'facebook', 'instagram'].includes(mappingKey)) {
            leadData.socialProfiles = {
              ...leadData.socialProfiles,
              [mappingKey]: value
            };
          }
        });
        
        // Process full name if needed
        if (fullName && (!leadData.firstName || !leadData.lastName)) {
          const nameParts = fullName.split(' ');
          if (nameParts.length >= 2) {
            leadData.firstName = leadData.firstName || nameParts[0];
            leadData.lastName = leadData.lastName || nameParts.slice(1).join(' ');
          } else {
            leadData.firstName = leadData.firstName || fullName;
            leadData.lastName = leadData.lastName || '';
          }
        }
        
        // Only add if we have the minimum required fields
        if (leadData.firstName && leadData.lastName && leadData.email) {
          newLeads.push(leadData as LeadData);
        }
      }
      
      // Add imported leads to form data
      setFormData(prev => ({
        ...prev,
        leads: [...prev.leads, ...newLeads]
      }));
      
      // Reset CSV state
      setCsvFile(null);
      setCsvHeaders([]);
      setCsvMapping({});
      setCsvPreview([]);
      
      // Show the list of imported leads
      setImportMethod('manual');
    };
    
    reader.readAsText(csvFile);
  };
  
  // Download CSV template
  const downloadTemplate = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Company', 'Phone', 'LinkedIn', 'Twitter', 'Status', 'Assigned To', 'Notes'];
    const csvContent = headers.join(',') + '\n';
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'leads_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Check if form has required leads
  const hasLeads = formData.leads.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Import Leads</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Add leads to your campaign by entering them manually or importing a CSV file.
        </p>
        
        {/* Import method selection */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setImportMethod('manual')}
            className={cn(
              "flex-1 py-3 px-4 rounded-lg border border-border flex items-center justify-center gap-2",
              importMethod === 'manual' ? "bg-primary/10 border-primary" : "hover:bg-muted/20"
            )}
          >
            <UserPlus className="h-5 w-5" />
            <span>Manually Add Leads</span>
          </button>
          <button
            onClick={() => setImportMethod('csv')}
            className={cn(
              "flex-1 py-3 px-4 rounded-lg border border-border flex items-center justify-center gap-2",
              importMethod === 'csv' ? "bg-primary/10 border-primary" : "hover:bg-muted/20"
            )}
          >
            <Upload className="h-5 w-5" />
            <span>Import from CSV</span>
          </button>
        </div>
        
        {/* Manual lead input form */}
        {importMethod === 'manual' && (
          <div className="space-y-6">
            {/* Current leads list */}
            {formData.leads.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Added Leads ({formData.leads.length})</h4>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="max-h-[200px] overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/20">
                        <tr>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Email</th>
                          <th className="px-4 py-2 text-left">Company</th>
                          <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {formData.leads.map(lead => (
                          <tr key={lead.id} className="hover:bg-muted/10">
                            <td className="px-4 py-2">
                              {lead.firstName} {lead.lastName}
                            </td>
                            <td className="px-4 py-2">{lead.email}</td>
                            <td className="px-4 py-2">{lead.company || '-'}</td>
                            <td className="px-4 py-2 text-right">
                              <button 
                                onClick={() => removeLead(lead.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Manual entry form */}
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
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium">
                    Last Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={currentLead.lastName}
                    onChange={handleLeadInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={currentLead.email}
                    onChange={handleLeadInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium">
                    Company <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={currentLead.company}
                    onChange={handleLeadInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={currentLead.phone}
                    onChange={handleLeadInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
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
          </div>
        )}
        
        {/* CSV import */}
        {importMethod === 'csv' && (
          <div className="space-y-6">
            {!csvFile ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <h4 className="text-base font-medium">Upload CSV File</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Drag and drop your file or click to browse
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <button
                    onClick={handleFileButtonClick}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                  >
                    Select File
                  </button>
                  <button
                    onClick={downloadTemplate}
                    className="flex items-center gap-1 text-sm text-primary"
                  >
                    <Download className="h-4 w-4" />
                    Download Template
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-green-500" />
                    <span className="font-medium">{csvFile.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ({(csvFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    onClick={() => setCsvFile(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Mapping interface */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/20 px-4 py-3 border-b border-border">
                    <h4 className="font-medium">Map CSV Columns to Lead Fields</h4>
                  </div>
                  <div className="p-4 max-h-[300px] overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/10">
                          <th className="px-4 py-2 text-left">CSV Column</th>
                          <th className="px-4 py-2 text-left">Map to Lead Field</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {csvHeaders.map(header => (
                          <tr key={header}>
                            <td className="px-4 py-2 font-medium">{header}</td>
                            <td className="px-4 py-2">
                              <select
                                value={csvMapping[header] || ''}
                                onChange={(e) => handleMappingChange(header, e.target.value)}
                                className="w-full px-3 py-1 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                              >
                                <option value="">-- Select Field --</option>
                                <option value="firstName">First Name</option>
                                <option value="lastName">Last Name</option>
                                <option value="fullName">Full Name (will be split)</option>
                                <option value="email">Email</option>
                                <option value="company">Company</option>
                                <option value="phone">Phone</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="twitter">Twitter</option>
                                <option value="status">Status</option>
                                <option value="assignedTo">Assigned To</option>
                                <option value="notes">Notes</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Preview */}
                {csvPreview.length > 0 && (
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="bg-muted/20 px-4 py-3 border-b border-border">
                      <h4 className="font-medium">Preview (First {csvPreview.length} Rows)</h4>
                    </div>
                    <div className="max-h-[200px] overflow-x-auto overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/10">
                            {csvHeaders.map(header => (
                              <th key={header} className="px-4 py-2 text-left whitespace-nowrap">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {csvPreview.map((row, index) => (
                            <tr key={index}>
                              {csvHeaders.map(header => (
                                <td key={`${index}-${header}`} className="px-4 py-2 whitespace-nowrap">
                                  {row[header] || '-'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setCsvFile(null)}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={importCsvLeads}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                  >
                    Import Leads
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t border-border">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-border rounded-lg hover:bg-muted/20 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!hasLeads}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeadImport;
