
import React from 'react';

interface CsvMappingProps {
  csvHeaders: string[];
  csvMapping: Record<string, string>;
  onMappingChange: (header: string, value: string) => void;
  contactPlatforms?: string[];
}

const CsvMapping: React.FC<CsvMappingProps> = ({ 
  csvHeaders, 
  csvMapping, 
  onMappingChange,
  contactPlatforms = []
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

  // Filter platform options based on selected contact platforms
  const filteredPlatformOptions = contactPlatforms.length > 0
    ? platformMappingOptions.filter(option => contactPlatforms.includes(option.platform))
    : platformMappingOptions;

  // Combine default options with filtered platform options
  const mappingOptions = [...defaultMappingOptions, ...filteredPlatformOptions];

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
                    {mappingOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
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
