export interface IDocsResponse<T> {
  status: number;
  docs: T[];
  totalDocs: number;
  limit?: number;
  skip?: number;
  message?: string;
  timestamp: string;
}
