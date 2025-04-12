
export interface CsvParseResult {
  headers: string[];
  preview: Record<string, string>[];
  initialMapping: Record<string, string>;
  data?: any[]; // Add data property to fix the errors
}

// Add additional type definitions as needed
export interface ImportStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
}
