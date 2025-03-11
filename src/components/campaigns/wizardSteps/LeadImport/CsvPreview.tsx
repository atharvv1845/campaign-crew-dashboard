
import React from 'react';

interface CsvPreviewProps {
  csvHeaders: string[];
  csvPreview: Record<string, string>[];
}

const CsvPreview: React.FC<CsvPreviewProps> = ({ csvHeaders, csvPreview }) => {
  return (
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
  );
};

export default CsvPreview;
