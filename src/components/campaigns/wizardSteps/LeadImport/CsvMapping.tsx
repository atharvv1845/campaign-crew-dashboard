
import React from 'react';

interface CsvMappingProps {
  csvHeaders: string[];
  csvMapping: Record<string, string>;
  onMappingChange: (header: string, value: string) => void;
  contactPlatforms?: string[];
  customPlatforms?: Array<{ id: string; name: string }>;
}

const CsvMapping: React.FC<CsvMappingProps> = ({ 
  csvHeaders, 
  csvMapping, 
  onMappingChange,
  contactPlatforms = [],
  customPlatforms = []
}) => {
  // Mapping options for CSV columns
  const defaultMappingOptions = [
    { value: 'name', label: 'Full Name' },
    { value: 'firstName', label: 'First Name' },
    { value: 'lastName', label: 'Last Name' },
    { value: 'email', label: 'Email' },
    { value: 'company', label: 'Company' },
    { value: 'title', label: 'Job Title' },
    { value: 'phone', label: 'Phone' },
    { value: 'currentStage', label: 'Stage' },
    { value: 'assignedTo', label: 'Assigned To' },
    { value: 'notes', label: 'Notes' },
    { value: 'lastContact', label: 'Last Contact Date' },
    { value: 'firstContactDate', label: 'First Contact Date' },
    { value: 'nextFollowUpDate', label: 'Next Follow Up Date' },
    { value: 'source', label: 'Lead Source' },
  ];

  // Add platform-specific options based on selected contact platforms
  const platformMappingOptions = [
    { value: 'linkedin', label: 'LinkedIn', platform: 'linkedin' },
    { value: 'twitter', label: 'Twitter', platform: 'twitter' },
    { value: 'facebook', label: 'Facebook', platform: 'facebook' },
    { value: 'instagram', label: 'Instagram', platform: 'instagram' },
    { value: 'whatsapp', label: 'WhatsApp', platform: 'whatsapp' },
  ];

  // Add custom platform options
  const customPlatformOptions = customPlatforms.map(platform => ({
    value: platform.id,
    label: platform.name,
    platform: platform.id
  }));

  // Combine all platform options regardless of selected contact platforms
  const allPlatformOptions = [...platformMappingOptions, ...customPlatformOptions];

  // Combine default options with all platform options
  const mappingOptions = [...defaultMappingOptions, ...allPlatformOptions];

  return (
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
                    onChange={(e) => onMappingChange(header, e.target.value)}
                    className="w-full px-3 py-1 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">-- Select Field --</option>
                    {/* Basic fields group */}
                    <optgroup label="Basic Information">
                      {defaultMappingOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                    
                    {/* Platform fields group */}
                    <optgroup label="Contact Platforms">
                      {platformMappingOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                    
                    {/* Custom platform fields, if any */}
                    {customPlatformOptions.length > 0 && (
                      <optgroup label="Custom Platforms">
                        {customPlatformOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CsvMapping;
