
import React from 'react';

interface CsvMappingProps {
  csvHeaders: string[];
  csvMapping: Record<string, string>;
  onMappingChange: (header: string, value: string) => void;
}

const CsvMapping: React.FC<CsvMappingProps> = ({ 
  csvHeaders, 
  csvMapping, 
  onMappingChange 
}) => {
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
                    <option value="name">Name</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="email">Email</option>
                    <option value="company">Company</option>
                    <option value="title">Title</option>
                    <option value="currentStage">Status</option>
                    <option value="assignedTo">Assigned To</option>
                    <option value="notes">Notes</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="lastContacted">Last Contact</option>
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
