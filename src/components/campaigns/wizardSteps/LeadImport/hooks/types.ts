
export interface CsvParseResult {
  headers: string[];
  preview: Record<string, string>[];
  initialMapping: Record<string, string>;
}
