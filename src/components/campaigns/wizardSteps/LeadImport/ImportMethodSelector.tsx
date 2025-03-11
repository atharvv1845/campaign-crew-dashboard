
import React from 'react';
import { UserPlus, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImportMethodSelectorProps {
  importMethod: 'manual' | 'csv';
  setImportMethod: (method: 'manual' | 'csv') => void;
}

const ImportMethodSelector: React.FC<ImportMethodSelectorProps> = ({ 
  importMethod, 
  setImportMethod 
}) => {
  return (
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
  );
};

export default ImportMethodSelector;
