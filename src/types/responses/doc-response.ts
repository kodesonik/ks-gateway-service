export interface IDocResponse<T> {
  doc: T | T[];
  status: number;
  message?: string;
  timestamp: string;
}
