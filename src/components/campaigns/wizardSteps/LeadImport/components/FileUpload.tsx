
import React, { useRef } from 'react';
import { Upload, FileCheck, X, Download } from 'lucide-react';

interface FileUploadProps {
  csvFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancelFile: () => void;
  downloadTemplate: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  csvFile,
  handleFileChange,
  handleCancelFile,
  downloadTemplate
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-green-500" />
            <span className="font-medium">{csvFile.name}</span>
            <span className="text-sm text-muted-foreground">
              ({(csvFile.size / 1024).toFixed(1)} KB)
            </span>
          </div>
          <button
            onClick={handleCancelFile}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default FileUpload;
