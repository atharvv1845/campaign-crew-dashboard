
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUp, UserPlus, SaveAll } from 'lucide-react';

interface ImportMethodSelectorProps {
  importMethod: string;
  setImportMethod: (method: any) => void;
  hasSavedLists?: boolean;
}

const ImportMethodSelector: React.FC<ImportMethodSelectorProps> = ({ 
  importMethod, 
  setImportMethod,
  hasSavedLists = false
}) => {
  return (
    <div className="mb-6">
      <Tabs
        value={importMethod}
        onValueChange={setImportMethod}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Manual Entry</span>
          </TabsTrigger>
          <TabsTrigger value="csv" className="flex items-center gap-2">
            <FileUp className="h-4 w-4" />
            <span>CSV Import</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2" disabled={!hasSavedLists}>
            <SaveAll className="h-4 w-4" />
            <span>Saved Lists</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ImportMethodSelector;
